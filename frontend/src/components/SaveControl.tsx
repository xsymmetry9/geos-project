import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { format } from "date-fns";

type SaveControlProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  className: string;
}

const formattedDate = format(new Date(), "MM-dd-yyyy");

const SaveControl = ({contentRef, className}: SaveControlProps) => {
  const handleSaveControl = async () =>{
    if(!contentRef.current) return;
    const canvas = await html2canvas(contentRef.current, {
    allowTaint: true,
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Convert canvas to image scaled for A4
  const imgProps = pdf.getImageProperties(imgData);
  const imgRatio = imgProps.width / imgProps.height;
  const height = pdfWidth / imgRatio;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, height);
  pdf.save(`student-report-${formattedDate}.pdf`);
  }

  return(
    <button className={className} onClick={handleSaveControl}>Save</button>
  )
}

export default SaveControl