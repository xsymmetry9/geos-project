import { getAllLevelsInformationByAspect } from "../../../utils/functions";
import { useState } from "react"; 
import { X } from "lucide-react"; // ✅ Import Lucide icon

import labelText from "../../../assets/other/labelText.json";

const ITEMS_PER_PAGE = 5;

const DisplayHelp = ({language, setDisplayHelp}) =>{
    const DEFAULT_LEVEL = "vocabulary";
    const [levelInfo, setLevelInfo] = useState(DEFAULT_LEVEL);
    const [currentPage, setCurrentPage] = useState(1);

    const data = getAllLevelsInformationByAspect({name: levelInfo, lang: language});

    // Pagination Logic
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(data.length/ ITEMS_PER_PAGE);
    

    return(
        <div className="w-full bg-white absolute">
                <button className="absolute cursor-pointer top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-red-100 transition"
                    onClick={() => setDisplayHelp(false)}
                    aria-label="close">
                    <X className="w-5 h-5 text-red-600 hover:text-red-800" />

                </button>
            <h1 className="text-center p-2">{labelText[language].level} {labelText[language].description}</h1>
            <ul className="grid grid-cols-5 text-center">
                {["vocabulary", "grammar", "listening", "pronunciation", "conversation"].map((item, index) => {
                    return(
                        <>
                            <li key={item-index} className="border border-1">
                                <button 
                                    onClick={() => setLevelInfo(item)}
                                    className="cursor-pointer py-3 w-full font-secondary text-[10px text-white capitalize bg-dark-green hover:bg-green-100 hover:text-dark-green">
                                        {labelText[language].SPR[item]}
                                </button>
                            </li>
                        </>
                    )
                })}
            </ul>
            <ul className="">
                <li className="grid grid-cols-[100px_1fr] border-b-3 bg-white py-1">
                    <div className="text-center">
                        <span className="font-bold">{labelText[language].level}</span>
                    </div>
                    <div className="text-center"><span className="font-bold">{labelText[language].description}</span></div>
                </li>
                {currentItems.map((item, index) => {
                    return(
                        <li key={item.level-index} className="grid grid-cols-[100px_1fr] border-b odd:bg-red-100 even:bg-red-200 items-center p-1 h-[100px]">
                            <div className="ml-3">
                                <span>{item.level}</span>
                            </div>
                            <div className=""><span>{item.description}</span></div>
                </li>);
                })
                }
            </ul>
            <div className="flex gap-3 items-center justify-center py-3">
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev-1, 1))} disabled= {currentPage=== 1}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-blue-500 text-white rounded  disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )

}

export default DisplayHelp;