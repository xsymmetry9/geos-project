import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link, useParams } from "react-router-dom";
import { getStudentById } from "../utils/functions";
import {PrintContent} from "../components/PrintStudentProgressReport";
import html2canvas from "html2canvas-pro";

const PrintPage = () => {
  const { id, language } = useParams(); //Gets id and language through link
  const parsedData = getStudentById(id); //Gets data from localstorage by id
  const componentRef = useRef(); //Save reference to print
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const reactToPrintContent = () => {
    return componentRef.current;
  };
  const handlePrint = useReactToPrint({
    documentTitle: "Student Progress Report",
    content: () => componentRef.current,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });
  const handleCapture = async() =>{

    if(componentRef.current) {
      const canvas = await html2canvas(componentRef.current, {
        allowTaint: true,
        scale: 2,
        useCORS: true,
        backgroundColor:"#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `student-report-${id}.png`;
      link.click();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center pb-3">
        <Link className="btn-primary" to={`/home/${language}`}>
          Dashboard
        </Link>
      </div>
      <div id={`print-${language}`} className="print-component" ref={componentRef}>
        <PrintContent parsedData={parsedData} />
      </div>
      <div className="flex justify-center pt-3 gap-3">
        <button className="btn btn-primary print w-[150px]" onClick={() => handlePrint(reactToPrintContent)}>
          Print
        </button>
        <button className="btn btn-primary print" onClick={handleCapture}>Save as Image</button>
        {/* Add a to pdf function */}
        {/* <button onClick={() => generagePDF(pdfRef, {filename: `student-report-${id}.pdf`})}
          className="btn btn-primary w-[150px] flex items-center justify-center gap-3">
          <FileDown />
          To PDF</button> */}
      </div>
    </>
  );
};

export default PrintPage;
