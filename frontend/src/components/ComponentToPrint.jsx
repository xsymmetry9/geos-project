import React from "react";
import PrintContent from "./PrintStudentProgressReport";
import "../styles/print.scss"

const ComponentToPrint = ((ref) => {
    return (
        <div className="printContent" ref={ref}>
            <PrintContent />
        </div>
    );
});

export default ComponentToPrint;
