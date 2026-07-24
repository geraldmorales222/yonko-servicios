const DRIVE_API = "https://www.googleapis.com/drive/v3";
const DRIVE_UPLOAD_API = "https://www.googleapis.com/upload/drive/v3";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  parents?: string[];
};

const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Falta variable de entorno ${key}`);
  return value;
};

export const getDriveRootFolderId = () => getEnv("GOOGLE_DRIVE_ROOT_FOLDER_ID");

async function getOAuthAccessToken() {
  const clientId = getEnv("GOOGLE_OAUTH_CLIENT_ID");
  const clientSecret = getEnv("GOOGLE_OAUTH_CLIENT_SECRET");
  const refreshToken = getEnv("GOOGLE_OAUTH_REFRESH_TOKEN");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) throw new Error(`No se pudo autenticar Google Drive con OAuth: ${await res.text()}`);
  const data = await res.json();
  return data.access_token as string;
}

async function getAccessToken() {
  return getOAuthAccessToken();
}

async function driveFetch(path: string, init: RequestInit = {}) {
  const token = await getAccessToken();
  const res = await fetch(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`Google Drive API error: ${res.status} ${await res.text()}`);
  return res;
}

export async function findOrCreateFolder(name: string, parentId: string) {
  const q = [
    `name='${name.replace(/'/g, "\\'")}'`,
    "mimeType='application/vnd.google-apps.folder'",
    `'${parentId}' in parents`,
    "trashed=false",
  ].join(" and ");

  const search = await driveFetch(`${DRIVE_API}/files?q=${encodeURIComponent(q)}&fields=files(id,name)`);
  const data = await search.json();
  if (data.files?.[0]?.id) return data.files[0].id as string;

  const create = await driveFetch(`${DRIVE_API}/files?fields=id,name`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    }),
  });
  const folder = await create.json();
  return folder.id as string;
}

export async function findFolder(name: string, parentId: string) {
  const q = [
    `name='${name.replace(/'/g, "\\'")}'`,
    "mimeType='application/vnd.google-apps.folder'",
    `'${parentId}' in parents`,
    "trashed=false",
  ].join(" and ");

  const search = await driveFetch(`${DRIVE_API}/files?q=${encodeURIComponent(q)}&fields=files(id,name)`);
  const data = await search.json();
  return data.files?.[0]?.id as string | undefined;
}

export async function uploadDriveFile(file: File, parentId: string) {
  const metadata = {
    name: file.name,
    parents: [parentId],
    mimeType: file.type || "application/octet-stream",
  };

  const bytes = Buffer.from(await file.arrayBuffer());

  const session = await driveFetch(`${DRIVE_UPLOAD_API}/files?uploadType=resumable&fields=id,name,mimeType,size,parents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "X-Upload-Content-Type": metadata.mimeType,
      "X-Upload-Content-Length": String(bytes.length),
    },
    body: JSON.stringify(metadata),
  });

  const uploadUrl = session.headers.get("location");
  if (!uploadUrl) throw new Error("Google Drive no entregó URL de subida resumable.");

  const upload = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": metadata.mimeType,
      "Content-Length": String(bytes.length),
    },
    body: bytes,
  });

  if (!upload.ok) throw new Error(`Google Drive upload error: ${upload.status} ${await upload.text()}`);
  return await upload.json() as DriveFile;
}

export async function uploadDriveBuffer(input: {
  name: string;
  contentType: string;
  bytes: Buffer;
  parentId: string;
}) {
  const session = await driveFetch(`${DRIVE_UPLOAD_API}/files?uploadType=resumable&fields=id,name,mimeType,size,parents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "X-Upload-Content-Type": input.contentType,
      "X-Upload-Content-Length": String(input.bytes.length),
    },
    body: JSON.stringify({
      name: input.name,
      parents: [input.parentId],
      mimeType: input.contentType,
    }),
  });

  const uploadUrl = session.headers.get("location");
  if (!uploadUrl) throw new Error("Google Drive no entregó URL de subida resumable.");

  const upload = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": input.contentType,
      "Content-Length": String(input.bytes.length),
    },
    body: new Uint8Array(input.bytes),
  });

  if (!upload.ok) throw new Error(`Google Drive upload error: ${upload.status} ${await upload.text()}`);
  return await upload.json() as DriveFile;
}

export async function deleteDriveFile(fileId: string) {
  await driveFetch(`${DRIVE_API}/files/${fileId}`, { method: "DELETE" });
}

export async function deleteDriveFolder(folderId: string) {
  await deleteDriveFile(folderId);
}

export async function getDriveFile(fileId: string) {
  const metaRes = await driveFetch(`${DRIVE_API}/files/${fileId}?fields=id,name,mimeType,size`);
  const metadata = await metaRes.json() as DriveFile;
  const mediaRes = await driveFetch(`${DRIVE_API}/files/${fileId}?alt=media`);
  return { metadata, body: mediaRes.body };
}
