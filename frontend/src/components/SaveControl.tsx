import { useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";

type SaveControlProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  className: string;
  /** SPR is always portrait; Level Check is always landscape */
  document: "spr" | "levelCheck";
  title: string;
  iconSize?: number;
};

const formattedDate = format(new Date(), "MM-dd-yyyy");

const orientationFor = (document: SaveControlProps["document"]): "portrait" | "landscape" =>
  document === "levelCheck" ? "landscape" : "portrait";

const SaveControl = ({
  contentRef,
  className,
  document: documentKind,
  title,
  iconSize = 24,
}: SaveControlProps) => {
  const [isBundling, setIsBundling] = useState<boolean>(false);
  const { user } = useUser();
  const language = user?.language ?? "english";
  const orientation = orientationFor(documentKind);

  const handleSaveControl = async () => {
    setIsBundling(true);
    try {
      if (!contentRef.current) return;

      const canvas = await html2canvas(contentRef.current, {
        allowTaint: true,
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgRatio = imgProps.width / imgProps.height;
      const height = pdfWidth / imgRatio;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, height);
      pdf.save(`${title}-${formattedDate}.pdf`);
    } catch (error) {
      console.log(error);
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
