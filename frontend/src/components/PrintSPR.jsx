import React, {useRef} from "react";

import { useReactToPrint } from "react-to-print";
import { getStudentById } from "../utils/functions";
import { Link, useParams } from "react-router-dom";
import PrintStudentProgressiveReport from "../components/PrintStudentProgressReport";

const PrintPage = () => {
    const {id, language} = useParams(); //Gets id and language through link

    const parsedData = getStudentById(id); //Gets data from localstorage by id

    const componentRef = useRef(); //Save reference to print
   
    const reactToPrintContent = () =>{
        return componentRef.current;
    }
    const handlePrint = useReactToPrint({
        documentTitle: "Student Progress Report",
        content: () => componentRef.current
    })

    return (
        <>
            <div>
                <Link className="btn-primary" to={`/home/${language}`}>Dashboard</Link>
            </div>
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
