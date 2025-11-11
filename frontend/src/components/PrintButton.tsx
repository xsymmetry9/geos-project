import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { getStudentById } from "@/utils/functions";
import { Language } from "@/utils/common";
import { PrintContent } from "@/components/PrintStudentProgressReport";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import PrintControl from "./PrintControl";
import { Student } from "@/type/Student";

type PrintButtonProps = {
  className?: string;
  docID: string;
  language: Language;
  docType: "SPR" | "levelCheckReport";
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

const PrintButton: React.FC<PrintButtonProps> = ({
  className,
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

  // const handlePrint = useReactToPrint({
  //   content: () => contentRef.current,
  //   documentTitle: `${data?.name ?? "SPR"}-${docID}`,
  //   onBeforeGetContent: async () => {
      
  //     await new Promise<void>((r) => requestAnimationFrame(() => r()));

  //     await waitForGraphReady(5000);

  //     await new Promise<void>((r) => queueMicrotask(r));
  //   },
  //   onAfterPrint() {
  //     setSelectedId(null);
  //     setGraphReady(false);
  //     promiseResolveRef.current = null;
  //   },
  // });

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
        parsedData={data }
        language={language}
        onGraphReady={handleGraphReady}
      />;
    } else if(docType === "levelCheckReport"){
      return <PlotLevelCheck
        data={data}
        language={language} />;
    }  else {
      return <div>Unsupported document type</div>;
    }     
  };
  return (
    <>
    <PrintControl 
      contentRef={contentRef} 
      className={`${className} ${disabled ? "cursor-not-allowed opacity-50": ""}`} 
      layout= {docType ==="SPR" ? "portrait" : "landscape"}
      iconSize={18}/>

      <div ref={contentRef}>
        {data && (
          <div className="print-component">
            <Content docType= {docType} />
          </div>
        )}
      </div>
    </>
  );
};

export default PrintButton;
