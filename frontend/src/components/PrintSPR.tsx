<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
=======
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
import { useReactToPrint } from "react-to-print";
import { Link, useParams } from "react-router-dom";
import { getStudentById } from "../utils/functions";
import {PrintContent} from "./PrintStudentProgressReport";
import html2canvas from "html2canvas-pro";
<<<<<<< HEAD

const PrintPage = () => {
  const { id, language } = useParams(); //Gets id and language through link
  const parsedData = getStudentById(id); //Gets data from localstorage by id
  const componentRef = useRef(); //Save reference to print
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);
=======
import jsPDF from "jspdf";

const PrintPage = () => {
  const { id, language } = useParams<{id: string; language: string}>(); //Gets id and language through link
  const componentRef = useRef<HTMLDivElement>(null); //Save reference to print
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef<null | (()=> void)>(null);

  const parsedData = useMemo(()=> {
    if (!id) return null;
    return getStudentById(id); //Gets data from localstorage by id
  }, [id]);
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

<<<<<<< HEAD
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
=======
  const reactToPrintContent = useCallback(() => componentRef.current, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Student Progress Report",
    onBeforePrint: () => 
       new Promise<void>((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });
<<<<<<< HEAD
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
=======


  const handleGeneratePDF = async () => {
  if (!componentRef.current) return;

  const canvas = await html2canvas(componentRef.current, {
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
  pdf.save(`student-report-${id}.pdf`);
};

  if(!parsedData) return <div>Loading ...</div>
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c

  return (
    <>
      <div className="flex items-center justify-center pb-3">
        <Link className="btn-primary" to={`/home/${language}`}>
          Dashboard
        </Link>
      </div>
<<<<<<< HEAD
      <div id={`print-${language}`} className="print-component" ref={componentRef}>
        <PrintContent parsedData={parsedData} />
      </div>
=======
    <div className= "mx-auto overflow-auto">
      <div id={`print-${language}`} className="shadow-lg print-component" ref={componentRef}>
        <PrintContent parsedData={parsedData} />
      </div>
    </div>
    
  
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
      <div className="flex justify-center pt-3 gap-3">
        <button className="btn btn-primary print w-[150px]" onClick={() => handlePrint(reactToPrintContent)}>
          Print
        </button>
<<<<<<< HEAD
        <button className="btn btn-primary print" onClick={handleCapture}>Save as Image</button>
        {/* Add a to pdf function */}
        {/* <button onClick={() => generagePDF(pdfRef, {filename: `student-report-${id}.pdf`})}
          className="btn btn-primary w-[150px] flex items-center justify-center gap-3">
          <FileDown />
          To PDF</button> */}
=======
        <button className="btn btn-primary print" onClick={handleGeneratePDF}>Save as PDF</button>
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
      </div>
    </>
  );
};

export default PrintPage;
