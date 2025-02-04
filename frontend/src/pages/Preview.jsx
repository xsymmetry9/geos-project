import SPRContent from "../components/SPRContent";
import { useState, useEffect } from "react";
import ButtonPrint from "../components/ButtonPrint";

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
            <SPRContent parsedData={parsedData} />
            <ButtonPrint parsedData={parsedData} />
        </>
    );
};

export default Preview;
