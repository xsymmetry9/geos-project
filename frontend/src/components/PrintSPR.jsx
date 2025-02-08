import * as React from "react";
import { useReactToPrint } from "react-to-print";

const ButtonPrint = ({ parsedData }) => {
    const componentRef = React.useRef();
    const [ComponentToPrint, setComponentToPrint] = React.useState(null);

    React.useEffect(() => {
        import("./ComponentToPrint").then((module) => {
            setComponentToPrint(() => module.default);
        });
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "SPR",
        content: () => componentRef.current,
    });

    return (
        <>
            <div className="print-component">
                {ComponentToPrint ? (
                    <ComponentToPrint ref={componentRef} parsedData={parsedData} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="center">
                <button className="btn btn-primary print" onClick={handlePrint} disabled={!ComponentToPrint}>
                    Print
                </button>
            </div>
        </>
    );
};

export default ButtonPrint;
