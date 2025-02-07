import SPRContent from "../components/SPRContent";
import { useState, useEffect } from "react";
import PrintSPR from "../components/PrintSPR";

const Preview = () => {
    const [parsedData, setParsedData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("SPR_Form");
        if (storedData) {
            setParsedData(JSON.parse(storedData));
        }
    }, []);

    if (!parsedData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="printPreview"> 
                <PrintSPR parsedData={parsedData} />
            </div>
        </>
    );
};

export default Preview;
