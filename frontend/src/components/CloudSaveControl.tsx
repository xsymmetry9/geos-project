import { useState } from "react";
import { CloudUpload } from "lucide-react";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";
import { buildDocumentPdf } from "@/utils/buildDocumentPdf";
import { uploadPdfToCloudinary, type DocumentKind } from "@/utils/cloudinaryUpload";

type CloudSaveControlProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  className: string;
  document: DocumentKind;
  /** Full file base name (without .pdf). Caller owns naming. */
  title: string;
  iconSize?: number;
};

const CloudSaveControl = ({
  contentRef,
  className,
  document: documentKind,
  title,
  iconSize = 24,
}: CloudSaveControlProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUser();
  const language = user?.language ?? "english";
  const t = labelText[language];

  const handleCloudSave = async () => {
    if (!contentRef.current || isUploading) return;

    setIsUploading(true);
    try {
      const pdf = await buildDocumentPdf(contentRef.current, documentKind);
      const uploaded = await uploadPdfToCloudinary(
        pdf.output("blob"),
        documentKind,
        title
      );
      console.log("Uploaded to Cloudinary:", uploaded.secure_url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 ${className}`}
      onClick={handleCloudSave}
      disabled={isUploading}
    >
      <CloudUpload size={iconSize} />
      <span>{isUploading ? t.saving_to_cloud : t.save_to_cloud}</span>
    </button>
  );
};

export default CloudSaveControl;
