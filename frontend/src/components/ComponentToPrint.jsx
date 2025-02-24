import React from "react";
import PrintContent from "./PrintStudentProgressReport";
import "../styles/print.scss"

const ComponentToPrint = ((ref, {parsedData}) => {
    return (
        <div className="printContent" ref={ref}>
            <PrintContent parsedData = {parsedData}/>
        </div>
    );
});

export default ComponentToPrint;
