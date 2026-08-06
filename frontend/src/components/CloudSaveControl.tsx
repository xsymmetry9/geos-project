import { useState } from "react";
import { CloudUpload } from "lucide-react";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";
import CloudLinkDialog from "@/components/CloudLinkDialog";
import { buildDocumentPdf } from "@/utils/buildDocumentPdf";
import { uploadPdfToCloudinary, type DocumentKind } from "@/utils/cloudinaryUpload";
import { saveCloudUrlToRecord } from "@/utils/functions";

type CloudSaveControlProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  className: string;
  document: DocumentKind;
  /** Full file base name (without .pdf). Caller owns naming. */
  title: string;
  /** SPR / level-check record id used to store the returned Cloudinary URL */
  recordId: string;
  iconSize?: number;
  onUploaded?: (cloudUrl: string) => void;
};

const CloudSaveControl = ({
  contentRef,
  className,
  document: documentKind,
  title,
  recordId,
  iconSize = 24,
  onUploaded,
}: CloudSaveControlProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [cloudUrl, setCloudUrl] = useState<string | null>(null);
  const { user } = useUser();
  const language = user?.language ?? "english";
  const t = labelText[language];

  const handleCloudSave = async () => {
    if (!contentRef.current || isUploading || !recordId) return;

    setIsUploading(true);
    try {
      const pdf = await buildDocumentPdf(contentRef.current, documentKind);
      const uploaded = await uploadPdfToCloudinary(
        pdf.output("blob"),
        documentKind,
        title
      );

      const saved = saveCloudUrlToRecord(documentKind, recordId, uploaded.secure_url);
      if (!saved) {
        throw new Error("Upload succeeded but failed to save the link locally.");
      }

      setCloudUrl(uploaded.secure_url);
      onUploaded?.(uploaded.secure_url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`inline-flex cursor-pointer items-center justify-center gap-2 ${className}`}
        onClick={handleCloudSave}
        disabled={isUploading}
      >
        <CloudUpload size={iconSize} />
        <span>{isUploading ? t.saving_to_cloud : t.save_to_cloud}</span>
      </button>

      {cloudUrl && (
        <CloudLinkDialog cloudUrl={cloudUrl} onClose={() => setCloudUrl(null)} />
      )}
    </>
  );
};

export default CloudSaveControl;
