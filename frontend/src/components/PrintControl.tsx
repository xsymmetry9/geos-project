import { Printer } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import "@/styles/print.css";

type PrintControlProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  className: string;
  layout: "portrait" | "landscape";
};
const PrintControl = ({ contentRef, className, layout }: PrintControlProps) => {
  const handlePrint = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, {
      scale: 2,
      allowTaint: true,
      backgroundColor: "#fff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: `${layout}`, unit: "mm", format: "a4" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    const { width: imgW, height: imgH } = pdf.getImageProperties(imgData);
    const scale = Math.min(pageW / imgW, pageH / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const x = (pageW - renderW) / 2;
    const y = (pageH - renderH) / 2;

    pdf.addImage(imgData, "PNG", x, y, renderW, renderH);

    if ((pdf as any).autoPrint) pdf.autoPrint();

    const blob = pdf.output("blob");

    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank", "noopener,noreferrer");

    // const iframe = document.createElement("iframe");
    // iframe.style.position = "fixed";
    // iframe.style.right = "0";
    // iframe.style.bottom = "0";
    // iframe.style.width = "0";
    // iframe.style.height = "0";
    // iframe.src = blobUrl.toString();
    // document.body.appendChild(iframe);
    // iframe.onload = () => {
    //   iframe.contentWindow?.focus();
    //   iframe.contentWindow?.print();
    // };
  };
  return (
    <button className={`flex gap-2 items-center justify-center${className}`} onClick={handlePrint}>
      <Printer size={24} />
      <span>Print</span>
    </button>
  );
};

export default PrintControl;
