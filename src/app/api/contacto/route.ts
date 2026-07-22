import { NextResponse } from 'next/server';
import { collection, getDocs, limit, query, serverTimestamp, where, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ipBuckets = new Map<string, { count: number; resetAt: number }>();
const emailBuckets = new Map<string, { count: number; resetAt: number }>();

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const clientIp = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  request.headers.get('x-real-ip') ||
  'unknown';

const consumeBucket = (bucket: Map<string, { count: number; resetAt: number }>, key: string, max: number, windowMs: number) => {
  const now = Date.now();
  const current = bucket.get(key);

  if (!current || current.resetAt <= now) {
    bucket.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (current.count >= max) {
    return { allowed: false, retryAfterMs: current.resetAt - now };
  }

  current.count += 1;
  bucket.set(key, current);
  return { allowed: true, retryAfterMs: 0 };
};

const verifyTurnstile = async (token: string, ip: string) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Captcha no configurado.');
    }
    return true;
  }

  if (!token) return false;

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    }),
  });

  if (!res.ok) return false;
  const data = await res.json();
  return Boolean(data.success);
};

const hasRecentEmailConsultation = async (email: string) => {
  const snap = await getDocs(query(collection(db, 'consultas'), where('email', '==', email), limit(10)));
  const now = Date.now();

  return snap.docs.some((item) => {
    const fecha = item.data().fecha;
    if (!fecha?.toDate) return false;
    return now - fecha.toDate().getTime() < DAY;
  });
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ip = clientIp(request);

    const nombre = String(body.nombre || '').trim();
    const email = normalizeEmail(String(body.email || ''));
    const telefono = String(body.telefono || '').trim();
    const area = String(body.area || '').trim();
    const descripcion = String(body.descripcion || '').trim();
    const captchaToken = String(body.captchaToken || '');
    const company = String(body.company || '').trim();

    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!nombre || !email || !area || !descripcion) {
      return NextResponse.json({ error: 'Faltan datos obligatorios.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'El correo no tiene un formato válido.' }, { status: 400 });
    }

    if (descripcion.length < 20) {
      return NextResponse.json({ error: 'Cuéntanos un poco más del proyecto para poder responder bien.' }, { status: 400 });
    }

    const ipLimit = consumeBucket(ipBuckets, ip, 5, HOUR);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiados intentos desde esta conexión. Intenta nuevamente en unos minutos.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(ipLimit.retryAfterMs / 1000)) } }
      );
    }

    const emailLimit = consumeBucket(emailBuckets, email, 2, DAY);
    if (!emailLimit.allowed || await hasRecentEmailConsultation(email)) {
      return NextResponse.json(
        { error: 'Ya recibimos una consulta con ese correo. Si es urgente, escríbenos por WhatsApp.' },
        { status: 429 }
      );
    }

    const captchaOk = await verifyTurnstile(captchaToken, ip);
    if (!captchaOk) {
      return NextResponse.json({ error: 'No pudimos validar el captcha. Intenta nuevamente.' }, { status: 400 });
    }

    await addDoc(collection(db, 'consultas'), {
      nombre,
      email,
      telefono,
      area,
      descripcion,
      fecha: serverTimestamp(),
      leido: false,
      origen: 'formulario-contacto',
      ipHash: ip === 'unknown' ? null : await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip)).then((hash) =>
        Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
      ),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error contacto:', error);
    return NextResponse.json({ error: 'No se pudo enviar el mensaje. Intenta más tarde.' }, { status: 500 });
  }
}
