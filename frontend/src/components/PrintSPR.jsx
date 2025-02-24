import React, {useState, useEffect, useRef} from "react";
import { useReactToPrint } from "react-to-print";
import { getStudentById } from "../utils/functions";
import { useParams } from "react-router-dom";
import PrintStudentProgressiveReport from "../components/PrintStudentProgressReport";

const PrintPage = () => {
    const {id} = useParams();

    const parsedData = getStudentById(id);
    console.log(parsedData);
    const componentRef = useRef();
   
    const reactToPrintContent = () =>{
        return componentRef.current;
    }
    const handlePrint = useReactToPrint({
        documentTitle: "Student Progress Report",
        content: () => componentRef.current
    })

    return (
        <>
            <div className="print-component papersize-A4" ref={componentRef}>
                <PrintStudentProgressiveReport parsedData = {parsedData}/>
            </div>
            <div className="center">
                <button className="btn btn-primary print" onClick={() => handlePrint(reactToPrintContent)}>Print</button>
            </div>
        </>
    );
};

export default PrintPage;
