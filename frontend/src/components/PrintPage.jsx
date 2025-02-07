import React, { useRef, forwardRef } from "react";
import PlotPage from "./PlotLevelCards";
import ReactToPrint from 'react-to-print';
import "../styles/print.scss"

const ComponentToPrint = forwardRef((props, ref) => {
    return (
        <div className="papersize" ref={ref}>
            <PlotPage {...props} />
        </div>
    );
});

const Print = (props) => {
    const contentRef = useRef();
    return (

        <>
            <ComponentToPrint ref={contentRef} {...props} />
            <div className="btns-container"> 
                <ReactToPrint
                    trigger={() => <button id="print" className="btn btn-primary">Click here to print</button>}
                    content={() => contentRef.current}
                    documentTitle="Student Progress Report"
                    onBeforePrint={() => console.log("Printing...")}
                    onAfterPrint={() => console.log("Printing is complete")}
                />            
            </div>
        </>

    );
}

export default Print;
