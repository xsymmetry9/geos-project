import React, { forwardRef } from "react";
import SPRContent from "./SPRContent";
import "../styles/print.scss"


const ComponentToPrint = forwardRef(({ parsedData }, ref) => {
    return (
        <div style={{display: "none"}} className="printContent" ref={ref}>
            <SPRContent parsedData={parsedData} />
        </div>
    );
});

export default ComponentToPrint;
