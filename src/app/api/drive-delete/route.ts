import { NextResponse } from "next/server";
import { deleteDriveFile } from "@/lib/google-drive";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { fileId } = await req.json();
    if (!fileId) return NextResponse.json({ error: "fileId requerido." }, { status: 400 });
    await deleteDriveFile(fileId);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Error eliminando archivo." }, { status: 500 });
  }
}
