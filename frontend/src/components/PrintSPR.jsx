import * as React from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

const ButtonPrint = ({ parsedData }) => {
    const componentRef = React.useRef();
   
    const reactToPrintContent = () =>{
        return componentRef.current;
    }
    const handlePrint = useReactToPrint({
        documentTitle: "SPR",
        content: () => componentRef.current
    })

    return (
        <>
            <ComponentToPrint ref={componentRef} parsedData={parsedData} />
            <button className="btn btn-primary print" onClick={() => handlePrint(reactToPrintContent)}>Print</button>
        </>
    );
};

export default ButtonPrint;
