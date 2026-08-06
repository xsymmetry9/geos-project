export type DocumentKind = "spr" | "levelCheck";

const FOLDER_BY_DOCUMENT: Record<DocumentKind, string> = {
  spr: "SPR",
  levelCheck: "level_check",
};

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  asset_folder?: string;
  url?: string;
  format?: string;
  bytes?: number;
};

export async function uploadPdfToCloudinary(
  pdfBlob: Blob,
  documentKind: DocumentKind,
  fileName: string
): Promise<CloudinaryUploadResult> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Missing VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET"
    );
  }

  const formData = new FormData();
  formData.append("file", pdfBlob, `${fileName}.pdf`);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", FOLDER_BY_DOCUMENT[documentKind]);
  formData.append("asset_folder", FOLDER_BY_DOCUMENT[documentKind]);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errText}`);
  }

  return response.json();
}
