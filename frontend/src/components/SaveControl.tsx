import { useState } from "react";
import { Download } from "lucide-react";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";
import { buildDocumentPdf } from "@/utils/buildDocumentPdf";

type SaveControlProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  className: string;
  /** SPR is always portrait; Level Check is always landscape */
  document: "spr" | "levelCheck";
  /** Full file base name (without .pdf). Caller owns naming. */
  title: string;
  iconSize?: number;
};

const SaveControl = ({
  contentRef,
  className,
  document: documentKind,
  title,
  iconSize = 24,
}: SaveControlProps) => {
  const [isBundling, setIsBundling] = useState(false);
  const { user } = useUser();
  const language = user?.language ?? "english";

  const handleSaveControl = async () => {
    setIsBundling(true);
    try {
      if (!contentRef.current) return;

      const pdf = await buildDocumentPdf(contentRef.current, documentKind);
      pdf.save(`${title}.pdf`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsBundling(false);
    }
  };

  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 ${className}`}
      onClick={handleSaveControl}
      disabled={isBundling}
    >
      <Download size={iconSize} />
      <span>{labelText[language].extract}</span>
    </button>
  );
};

export default SaveControl;
