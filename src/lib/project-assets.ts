export type ProjectAsset = {
  id?: string;
  name: string;
  path: string;
  url: string;
  contentType: string;
  size: number;
  kind: "image" | "video" | "model" | "file";
  provider?: "drive" | "firebase";
};

export const slugifyProjectName = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "proyecto-sin-nombre";

export const getAssetKind = (contentType = "", fileName = ""): ProjectAsset["kind"] => {
  const lowerName = fileName.toLowerCase();
  if (contentType.startsWith("image/")) return "image";
  if (contentType.startsWith("video/")) return "video";
  if (contentType.includes("model") || lowerName.endsWith(".glb") || lowerName.endsWith(".gltf")) return "model";
  return "file";
};

export const assetUrl = (asset: ProjectAsset | string | undefined | null, width = 800) => {
  if (!asset) return "";
  if (typeof asset === "string") {
    // Only keep full URLs as a temporary safety net for old external records.
    if (asset.startsWith("http")) return asset;
    return "";
  }
  if (asset.provider === "drive" && asset.id) return `/api/drive-file/${asset.id}`;
  return asset.url;
};

export const assetKind = (asset: ProjectAsset | string | undefined | null): ProjectAsset["kind"] => {
  if (!asset || typeof asset === "string") return "image";
  return asset.kind;
};
