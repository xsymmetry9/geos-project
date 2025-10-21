import { useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { format } from "date-fns";

type SaveControlProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  className: string;
  layout: "p" | "portrait" | "landscape" | "l";
  title: string;
};

const formattedDate = format(new Date(), "MM-dd-yyyy");

const SaveControl = ({ contentRef, className, layout, title }: SaveControlProps) => {
  const [isBundling, setIsBundling] = useState<boolean>(false);

  //   const handleGeneratePDF = async () => {
  //   if(!contentRef.current) return;

  //   const canvas = await html2canvas(contentRef.current, {
  //     allowTaint: true,
  //     scale: 2,
  //     useCORS: true,
  //     backgroundColor: "#ffffff",
  //   });

  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("landscape","mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();

  //   const imgProps = pdf.getImageProperties(imgData);
  //   const imgRatio = imgProps.width / imgProps.height;
  //   let renderWidth = pdfWidth;
  //   let renderHeight = renderWidth / imgRatio;
  //   if(renderHeight > pdfHeight){
  //     renderHeight = pdfHeight
  //     renderWidth = renderHeight * imgRatio;
  //   }
  //   const offsetX = (pdfWidth - renderWidth) / 2;
  //   const offsetY = (pdfHeight - renderHeight) / 2;

  //   pdf.addImage(imgData, "PNG", offsetX, offsetY, renderWidth, renderHeight);
  //   pdf.save(`level-check-${data.student_name}.pdf`);
  // }
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

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF(`${layout}`, "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Convert canvas to image scaled for A4
      const imgProps = pdf.getImageProperties(imgData);
      const imgRatio = imgProps.width / imgProps.height;
      const height = pdfWidth / imgRatio;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, height);
      pdf.save(`${title}-${formattedDate}.pdf`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBundling(false);
    }
  };

  return (
    <button className={`${className}`} onClick={handleSaveControl} disabled={isBundling}>
      Save
    </button>
  );
};

export default SaveControl;
