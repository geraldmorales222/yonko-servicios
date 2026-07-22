import { getDriveFile } from "@/lib/google-drive";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = await params;
  const { metadata, body } = await getDriveFile(fileId);

  return new Response(body, {
    headers: {
      "Content-Type": metadata.mimeType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Disposition": `inline; filename="${encodeURIComponent(metadata.name)}"`,
    },
  });
}
