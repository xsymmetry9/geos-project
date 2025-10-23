import { useState } from "react";
import {LevelCheckForm} from "./LevelCheck";   
import { LevelCheckEntry } from "@/type/LevelCheckForm";

const LevelCheckPage = () => {
    const initiateForm = new LevelCheckEntry();
    const [inputData, setInputData] = useState<LevelCheckEntry>(initiateForm);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value, name}= e.target;
        setInputData((prev : any) => ({
            ...prev,
            [name]: value,
        })
    )};
    return(
    <>
        <div className="flex flex-col gap-2 p-4">
            {/* <label htmlFor="language">Set Language</label> */}
                <select className="border-2 border-slate-600" name="language" onChange={handleLanguageChange} id="language">
                    <option value={""}>Select Language</option>
                    <option value="english">English</option>
                    <option value="chinese">Chinese</option>
                    <option value="korean">Korean</option>
                    <option value="japanese">Japanese</option>
                </select>
        </div>

        {inputData.language != "" && <LevelCheckForm inputData={inputData} setInputData={setInputData}/>}
    </>
    )
    // Create a dropdown to select Language.
    
    // Pass the seletected language to language.

    // Creates a button to set the language state.

    // Once sumbmitted, navigates to /levelCheck page with the selected language as a query parameter.

}

export default LevelCheckPage;