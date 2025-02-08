import React, {useRef} from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

const ButtonPrint = ({ parsedData }) => {
    const componentRef = useRef();
   
    const reactToPrintContent = () =>{
        return componentRef.current;
    }
    const handlePrint = useReactToPrint({
        documentTitle: "SPR",
        content: () => componentRef.current
    })

    return (
        <>
            <div className="print-component">
                <ComponentToPrint ref={componentRef} parsedData={parsedData} />
            </div>
            <div className="center">
                <button className="btn btn-primary print" onClick={() => handlePrint(reactToPrintContent)}>Print</button>
            </div>
        </>
    );
};

export default ButtonPrint;
