import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "lucide-react";
import { getStudentById } from "@/utils/functions";
import { Language } from "@/utils/common";
import { PrintContent } from "@/components/PrintStudentProgressReport";
import { Student } from "@/type/Student";
import { set } from "date-fns";

type PrintButtonProps = {
  className?: string;
  docID: string;
  language: Language;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

const pageStyle = `
  @page { size: A4 portrait; margin: 0; }

  @media print {
    html, body { height: auto !important; overflow: visible !important; }

    /* Make ONLY the print sandbox visible during print */
    body > *:not(.print-sandbox) { display: none !important; }

    /* Bring sandbox on-screen for printing */
    .print-sandbox {
      position: static !important;
      left: auto !important;
      top: auto !important;
      width: auto !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      z-index: auto !important;
    }

    /* Portrait page box (A4) */
    .print-root {
      width: 210mm !important;
      min-height: 297mm !important;
      margin: 0 auto !important;
      padding: 8mm !important;
      box-sizing: border-box !important;
      background: #fff !important;
      border: none !important;
      box-shadow: none !important;
      page-break-inside: avoid !important;
    }

    /* Keep charts/images inside page width */
    .print-root img,
    .print-root canvas,
    .print-root svg {
      max-width: 100% !important;
      height: auto !important;
    }
  }
`;

const PrintButton: React.FC<PrintButtonProps> = ({
  className = "",
  docID,
  language,
  setSelectedId,
}) => {
  const [student, setStudent] = useState<Student | null>();
  const [mounted, setMounted] = useState(false); // off-screen mount
  const [graphReady, setGraphReady] = useState(false); // signaled graph is ready
  const contentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<() => void | null>(null);

  // Load data when docID changes
  useEffect(() => {
    const s = getStudentById(docID) || null;
    setStudent(s);
    setGraphReady(false);
  }, [docID]);

  const waitForGraphReady = useCallback(
    (timeoutMs = 5000) => {
      if (graphReady) return Promise.resolve();

      return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graph readiness wait timed out after 5 seconds.");
          resolve();
        }, timeoutMs);
        promiseResolveRef.current = resolve;
        clearTimeout(timeout);
        resolve();
      });
    },
    [graphReady]
  );

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `${student?.name ?? "SPR"}-${docID}`,
    onBeforeGetContent: async () => {
      setMounted(true);
      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      await waitForGraphReady(5000);

      await new Promise<void>((r) => queueMicrotask(r));
    },
    onAfterPrint() {
      setSelectedId(null);
      setMounted(false);
      setGraphReady(false);
      promiseResolveRef.current = null;
    },
  });

  const handleGraphReady = React.useCallback(() => {
    if (!graphReady) {
      setGraphReady(true);
      promiseResolveRef.current?.();
      promiseResolveRef.current = null;
    }
  }, [graphReady]);

  const disabled = !student;

  return (
    <>
      <button
        type="button"
        className={`${className} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={handlePrint}
        disabled={disabled}
      >
        <PrinterIcon size={18} />
        <span className="text-sm">Print</span>
      </button>

      <div ref={contentRef} className="print-sandbox">
        {student && (
          <div className="print-component">
            <PrintContent
              parsedData={student}
              language={language}
              onGraphReady={handleGraphReady}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PrintButton;
