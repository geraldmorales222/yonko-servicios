import { NextResponse } from "next/server";
import { deleteDriveFile, deleteDriveFolder, findFolder, getDriveRootFolderId } from "@/lib/google-drive";
import { slugifyProjectName } from "@/lib/project-assets";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { fileId, folderId, projectName, driveFolder } = await req.json();

    if (folderId) {
      await deleteDriveFolder(folderId);
      return NextResponse.json({ ok: true });
    }

    if (projectName || driveFolder) {
      const rootId = getDriveRootFolderId();
      const folderName = projectName
        ? slugifyProjectName(String(projectName))
        : String(driveFolder).split("/").filter(Boolean).pop();

      if (!folderName) {
        return NextResponse.json({ error: "Nombre de carpeta requerido." }, { status: 400 });
      }

      const existingFolderId = await findFolder(folderName, rootId);
      if (existingFolderId) await deleteDriveFolder(existingFolderId);
      return NextResponse.json({ ok: true, deleted: Boolean(existingFolderId) });
    }

    if (!fileId) return NextResponse.json({ error: "fileId, folderId o projectName requerido." }, { status: 400 });
    await deleteDriveFile(fileId);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Error eliminando archivo." }, { status: 500 });
  }
}
