import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "lucide-react";
import { getStudentById } from "@/utils/functions";
import { Language } from "@/utils/common";
import { PrintContent } from "@/components/PrintStudentProgressReport";
import {LevelCheckPreview} from "@/pages/LevelCheck"
import { Student } from "@/type/Student";

type PrintButtonProps = {
  className?: string;
  docID: string;
  language: Language;
  docType: "SPR" | "levelCheckReport";
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

const PrintButton: React.FC<PrintButtonProps> = ({
  className = "",
  docID,
  language,
  docType,
  setSelectedId,
}) => {
  const [data, setData] = useState(null);
  const [graphReady, setGraphReady] = useState(false); // signaled graph is ready
  const contentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<() => void | null>(null);

  // Load data when docID changes
  useEffect(() => {
    const s = getStudentById(docID) || null;
    setData(s);
    setGraphReady(false);
  }, [docID]);

  const waitForGraphReady = useCallback(
    (timeoutMs = 5000) => {
      if (graphReady) return Promise.resolve();
      console.log("Waiting for graph readiness...");

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
    content: () => contentRef.current,
    documentTitle: `${data?.name ?? "SPR"}-${docID}`,
    onBeforeGetContent: async () => {
      
      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      await waitForGraphReady(5000);

      await new Promise<void>((r) => queueMicrotask(r));
    },
    onAfterPrint() {
      setSelectedId(null);
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

  const disabled = !data;

  const Content = ({docType}) => {
    if(docType === "SPR"){
      return <PrintContent
              parsedData={data}
              language={language}
              onGraphReady={handleGraphReady}
            />
    } else if(docType === "levelCheckReport"){
      return <LevelCheckPreview
              data={data}
              language={language} />
    }  else {
      return <div>Unsupported document type</div>
    }     
  };
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
        {data && (
          <div className="">
            <Content docType="SPR" />
          </div>
        )}
      </div>
    </>
  );
};

export default PrintButton;
