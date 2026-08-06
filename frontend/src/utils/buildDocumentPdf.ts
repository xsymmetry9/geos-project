import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import type { DocumentKind } from "@/utils/cloudinaryUpload";

const orientationFor = (documentKind: DocumentKind): "portrait" | "landscape" =>
  documentKind === "levelCheck" ? "landscape" : "portrait";

export async function buildDocumentPdf(
  element: HTMLElement,
  documentKind: DocumentKind
): Promise<jsPDF> {
  const canvas = await html2canvas(element, {
    allowTaint: true,
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF({
    orientation: orientationFor(documentKind),
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgProps = pdf.getImageProperties(imgData);
  const imgRatio = imgProps.width / imgProps.height;
  const height = pdfWidth / imgRatio;

  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, height);
  return pdf;
}
