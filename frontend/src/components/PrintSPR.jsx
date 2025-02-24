import React, {useRef} from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

const PrintPage = () => {
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
            <div className="print-component">
                <ComponentToPrint ref={componentRef}/>
            </div>
            <div className="center">
                <button className="btn btn-primary print" onClick={() => handlePrint(reactToPrintContent)}>Print</button>
            </div>
        </>
    );
};

export default PrintPage;
