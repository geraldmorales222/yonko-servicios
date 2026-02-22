import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// ─── CONFIGURACIÓN DE CLOUDINARY ──────────────────────────────────────────────
// Asegúrate de que estos nombres coincidan con tu .env.local
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json({ success: false, error: "No public_id provided" }, { status: 400 });
    }

    // Ejecuta el borrado físico
    const result = await cloudinary.uploader.destroy(public_id);
    
    console.log("Resultado de borrado en Cloudinary:", result);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Error al borrar en Cloudinary:", error.message || error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}