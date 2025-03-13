import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link, useParams } from "react-router-dom";
import { getStudentById } from "../utils/functions";
import PrintStudentProgressiveReport from "../components/PrintStudentProgressReport";
import { FileDown } from "lucide-react";

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

  return (
    <>
      <div className="flex items-center justify-center pb-3">
        <Link className="btn-primary" to={`/home/${language}`}>
          Dashboard
        </Link>
      </div>
      <div id={`print-${language}`} className="print-component" ref={componentRef}>
        <PrintStudentProgressiveReport parsedData={parsedData} />
      </div>
      <div className="flex items-center justify-center pt-3 gap-3">
        <button className="btn btn-primary print w-[150px]" onClick={() => handlePrint(reactToPrintContent)}>
          Print
        </button>
        <button className="btn btn-primary w-[150px] flex items-center justify-center gap-3">
          <FileDown />
          To PDF</button>
      </div>
    </>
  );
};

export default PrintPage;
