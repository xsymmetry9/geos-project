import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import {format, parseISO} from "date-fns"

type DrawTableProps = {
    categoryArr: [],
    entries: [],
    itemsDisplayed: []
}

const DrawRow = ({...props}) => {
    const {itemsDisplayed, entry} = props;
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleOption = (id: string) => {
        setSelectedId(id);
    }

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                    setSelectedId(null);
                } 
            }
            document.addEventListener("mousedown", handleClickOutside);
    
            return() => {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        });
    return(
        <tr>
            {itemsDisplayed.map((item:string, idx: number) => 
                <td className="text-center p-2" key={`${item}-${idx}`}>
                    {item === "createdAt" || item === "dateCreated" ? format(parseISO(entry[item]), "MM/dd/yyyy") : entry[item]}
                </td>)}
                <td>
                    <button onClick = {() => toggleOption(entry.id)} className="cursor-pointer bg-none text-slate-500 hover:underline">
                        ...
                    </button>
                </td>
                
                    {selectedId == entry.id && (
                        <td colSpan={5} className="relative">
                           <div
                                ref={dropdownRef}
                                className="z-10 flex flex-col gap-2 w-[120px] p-2 bg-gray-100 border border-gray-300 mt-2 rounded absolute top-0 right-[90px]">
                                <Link to={`/levelCheck/${entry.name}/preview/${entry.id}`}>View</Link>
                                <Link to="#">Download</Link>
                                <Link to="#">Print</Link>
                            </div>
                        </td>
                    )}
                     
        </tr>
    )
}

const DrawTable = ({categoryArr, entries, itemsDisplayed}: DrawTableProps) => {
    return(
        <table className="border-collapse border-gray-300 mt-6 m-auto w-full max-w-[1100px]">
            <thead>
                <tr className="border-t border-b border-gray-300 bg-orange-700 capitalize">
                  {categoryArr.map((categoryItem: string) => <td className="text-center p-2 font-bold text-white">{categoryItem}</td>)}
                    <td className="text-center p-2 font-bold"></td>
                </tr>
            </thead>
            <tbody>
                {entries && entries.map((entry: any) => <DrawRow entry={entry} itemsDisplayed={itemsDisplayed}/> )}
            </tbody>
        </table>
    )

}

export default DrawTable

//    <table className="max-w-[1100px] w-full mx-auto">
//                     <thead>
//                         <tr className="border-t border-b border-gray-300 bg-orange-700">
//                             <td className="text-center p-2 font-bold text-white">Date</td>
//                             <td className="text-center p-2 font-bold text-white">Name</td>
//                             <td className="text-center p-2 font-bold text-white">Book Recommenation</td>    
//                             <td className=""></td>
//                             <td className="text-center p-2 font-bold"></td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {teacher?.levelCheckEntries.map((report) => (
//                             <tr>
//                                 <td className="text-center p-2">{format(parseISO(report.createdAt), "MM/dd/yyyy")}</td>
//                                 <td className="text-center p-2">{report.name}</td>
//                                 <td className="text-center p-2">{report.bookRecommendation}</td>
//                                 <td className="w-[30px] h-[30px] flex justify-center items-center hover:bg-gray-300 hover:rounded-full">
//                                     <button className="cursor-pointer bg-none text-slate-500 hover:underline"
//                                                  onClick={() => toggleOptions("levelCheck", item.id)}>
//                                                  ...
//                                     </button>
//                                 </td>
//                                   {selectedLevelCheckID === report.id && (
//                                         <td colSpan={5} className="relative">
//                                                 <div
//                                                     ref={dropdownRef}
//                                                     className="z-10 flex flex-col gap-2 w-[120px] p-2 bg-gray-100 border border-gray-300 mt-2 rounded absolute top-0 right-[90px]">
//                                                     <Link to={`/levelCheck/${report.name}/preview/${report.id}`}>View</Link>
//                                                     <Link to="#">Download</Link>
//                                                     {/* <CreateLevelCheckDeleteButton studentData = {studentData} setStudentData = {setStudentData} formId = {item.id} label="Delete" className="text-left"/> */}
//                                                 </div>
//                                             </td>
//                                         )}
//                             </tr> 
//                         ))}
//                     </tbody>
//                 </table>