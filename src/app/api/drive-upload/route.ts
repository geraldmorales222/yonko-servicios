import { NextResponse } from "next/server";
import { findOrCreateFolder, getDriveRootFolderId, uploadDriveFile } from "@/lib/google-drive";
import { getAssetKind, slugifyProjectName } from "@/lib/project-assets";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const projectName = String(form.get("projectName") || "");
    const area = String(form.get("area") || "archivos");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Archivo no recibido." }, { status: 400 });
    }
    if (!projectName.trim()) {
      return NextResponse.json({ error: "Nombre de proyecto requerido." }, { status: 400 });
    }

    const rootId = getDriveRootFolderId();
    const projectFolderName = slugifyProjectName(projectName);
    const projectFolderId = await findOrCreateFolder(projectFolderName, rootId);
    const areaFolderId = await findOrCreateFolder(area === "portada" ? "portada" : "archivos", projectFolderId);
    const uploaded = await uploadDriveFile(file, areaFolderId);

    return NextResponse.json({
      id: uploaded.id,
      projectFolderId,
      name: uploaded.name,
      path: `proyectos/${projectFolderName}/${area}/${uploaded.name}`,
      url: `/api/drive-file/${uploaded.id}`,
      contentType: uploaded.mimeType,
      size: Number(uploaded.size || file.size || 0),
      kind: getAssetKind(uploaded.mimeType, uploaded.name),
      provider: "drive",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Error subiendo archivo a Drive." }, { status: 500 });
  }
}
