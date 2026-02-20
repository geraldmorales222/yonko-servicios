// src/app/api/auth/check/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL; // Se lee solo en el servidor

  if (email === adminEmail) {
    return NextResponse.json({ isAdmin: true });
  }

  return NextResponse.json({ isAdmin: false }, { status: 403 });
}