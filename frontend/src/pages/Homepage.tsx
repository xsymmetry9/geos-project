import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Archive, Pencil, PrinterIcon, Plus, SquareX, MoreHorizontal } from "lucide-react";
import User from "../type/User";
import { getDataFromLocal, deleteStudentById } from "../utils/functions";
import ExportToExcel from "../components/ExportToExcel";
import ImportFromExcel from "../components/ImportFromExcel";
import { CreateNewFormBtn, CloseBtn } from "../components/CustomizedButtons";
import { LevelCheckEntry } from "@/type/LevelCheckForm";

type PlotLevelCheckProps = {
  language: "english" | "korean" | "japanese" |"chinese";
  data: LevelCheckEntry[];
  handleDisplayDelete: (opts: { display: boolean; id: string; type: "levelCheck" }) => void;

}
const formattedDate = (dateCreated: Date) => {
  return format(dateCreated, 'MM/dd/yyyy');
}
const PlotLevelCheck = ({ language, data, handleDisplayDelete }: PlotLevelCheckProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const toggleOption = (id: string) => {
    setSelectedId(id)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
        setSelectedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return() => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  });
  return (
  <table className="max-w-[800px] w-full mx-auto">
    <thead>
      <tr className="bg-stone-600 text-white font-bold">
        <td className="p-3 text-center">Date</td>
        <td className="p-3 text-center">Name</td>
        <td className="p-3 text-center w-[100px]"></td>
      </tr>
    </thead>
    <tbody>
      {data.map((item: any) => (
        <tr
          className="border-b-3 border-stone-300 odd:bg-stone-100 even:bg-white hover:bg-gray-300"
          key={`level-check${item.id}`}
        >
          <td className="p-3 text-center h-[30px]">{formattedDate(item.dateCreated)}</td> 
          <td className="p-3 text-center h-[30px]">{item.student_name}</td>
          <td className="p-3 text-center h-[30px] relative">
            <div

              className="w-[30px] h-[30px] flex justify-center items-center hover:bg-gray-100 hover:rounded-full">
               <button
                onClick={() => toggleOption(item.id)}
                aria-expanded= {selectedId === item.id}
                aria-label="toggle menu"
                type="button"
                className="cursor-pointer bg-none text-slate-500 hover:underline"
                >             
                <MoreHorizontal size={16} strokeWidth={2} />
              </button>
              </div>
                {selectedId === item.id && (
                  <div
                    ref={dropDownRef} 
                    className="z-10 flex flex-col gap-2 w-[120px] p-2 bg-gray-100 border border-gray-300 mt-2 rounded gap-4 absolute top-0 right-[90px]"
                   >
                    <Link className="pointer-cursor flex p-2 gap-2 items-center hover:bg-gray-200" to={`/levelCheck/${language}/edit/${item.id}`}>
                      <Pencil size={20} />
                           <span>Edit</span>
                    </Link>
                    <Link className="pointer-cursor flex p-2 gap-2 items-center hover:bg-gray-200" to={`/levelCheck/${language}/preview/${item.id}`}>
                      <PrinterIcon size={20} />
                      <span>View</span>
                    </Link>
                    <button
                      className="pointer-cursor flex p-2 gap-2 items-center hover:bg-gray-200"
                      onClick={() => handleDisplayDelete({ display: true, id: item.id, type: "levelCheck" })}
                    >
                      <Archive size={20} />
                      <span>Delete</span>
                    </button>
                    </div>
                )}            
              </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
};

const Homepage = () => {
  const { language } = useParams();
  const [page, setPage] = useState<"spr" | "levelCheck">("spr");
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [addFormNav, setAddFormNav] = useState<boolean>(false);
  const [deletePage, setDeletePage] = useState({ display: false, id: null, type: "" });

  useEffect(() => {
    const user = getDataFromLocal();
    setUserData(user);
    setLoading(false);
  }, [language]);

  const handleFormControl = () => setAddFormNav((prev) => !prev);

  type handleDisplayDeleteProps = {
    display: boolean,
    id: string,
    type: string
  }
  const handleDisplayDelete = ({ display, id, type }: handleDisplayDeleteProps) => {
    setDeletePage({ display, id, type });
  };

  const handleDelete = () => {
    if (!deletePage.id || !userData) return;

    const raw = localStorage.getItem("GEOS_app");
    if(!raw) return;

    const parsedData = JSON.parse(raw);
    const result = parsedData[deletePage.type].filter(item => item.id !== deletePage.id);

    parsedData[deletePage.type] = result;

    localStorage.setItem("GEOS_app", JSON.stringify(parsedData));

    setUserData((prev) =>
      prev ? { ...prev, [deletePage.type]: prev[deletePage.type].filter((item) => item.id !== deletePage.id) } : prev
    );
   
    closePage();
  };

  const closePage = () => setDeletePage({ display: false, id: null, type: "" });

  const toggleLevelCheckSPR = (e) => {
    const { name } = e.currentTarget;
    setPage(name);
  };

  if (loading) return <h1>Loading ...</h1>;

  const PlotSPRTable = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

    const dropDownRef = useRef<HTMLDivElement | null>(null);

  const toggleOption = (id: string) => {
    setSelectedId(id)
  }

  useEffect(() => {
    const handleClickeOutside = (event: MouseEvent) => {
      if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setSelectedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickeOutside);
    return() => {
      document.removeEventListener("mousedown", handleClickeOutside);
    }
  });

    return (
    <table className="w-full max-w-[800px] mx-auto">
      <thead>
        <tr className="bg-stone-600 text-white font-bold">
          <th className="p-3 text-center">Date</th>
          <th className="p-3 text-center">Name</th>
          <th className="p-3 text-center w-[100px]"></th>
        </tr>
      </thead>
      <tbody>
        {userData?.SPR.map((item, index) => (
          <tr
            key={`${item.id}-${index}`}
            className="border-b-3 border-stone-300 odd:bg-stone-100 even:bg-white hover:bg-gray-300"
          >
            <td className="p-3 text-center h-[30px]">{format(new Date(item.dateCreated), "MM/dd/yyyy")}</td>
            <td className="p-3 text-center h-[30px]">{item.name}</td>
            <td className="p-3 text-center h-[30px] relative">
              <div className="w-[30px] h-[30px] flex justify-center items-center hover:bg-gray-100 hover:rounded-full">
                 <button
                    onClick={() => toggleOption(item.id)}
                    aria-expanded={selectedId === item.id}
                    aria-label="Toggle Menu"
                    type="button"
                    className="cursor-pointer bg-none text-slate-500 hover:underline"
                    >             
                    <MoreHorizontal size={16} strokeWidth={2} />
                  </button>
              </div>
                {selectedId === item.id && (
                  <div 
                    ref={dropDownRef}
                    className="z-10 flex flex-col gap-2 w-[120px] p-2 bg-gray-100 border border-gray-300 mt-2 rounded gap-4 absolute top-0 right-[90px]">
                    <Link className="pointer-cursor flex p-2 gap-2 items-center hover:bg-gray-200" to={`/spr/${language}/edit/${item.id}`}>
                      <Pencil size={20} />
                      <span>Edit</span>
                    </Link>
                    <Link className="pointer-cursor flex p-2 gap-2 items-center hover:bg-gray-200" to={`/spr/${language}/print/${item.id}`}>
                      <PrinterIcon size={20} />
                      <span>View</span>
                    </Link>
                    <button
                      className="pointer-cursor flex p-2 gap-2 items-center hover:bg-gray-200"
                      onClick={() => handleDisplayDelete({ display: true, id: item.id, type: "SPR" })}
                    >
                      <Archive size={20} />
                      <span>Delete</span>
                    </button>
                  </div>
                  )}
            </td>
        
          </tr>
        ))}
      </tbody>
    </table>
  );
}

  return (
    <div className="pb-12">
      <h2 className="font-secondary text-2xl text-center font-semibold mt-6 mb-6">
        {page === "spr" ? `Student's Progress Report` : "Level Checks"}
        </h2>
      <div className="p-b-3 flex justify-center gap-3 mb-6">
        <CreateNewFormBtn handleControl={handleFormControl} />
        <ExportToExcel userData={userData} />
        <ImportFromExcel userData={userData} setUserData={setUserData} />
      </div>

      <div className="w-full max-w-[800px] mx-auto">
        <button
          className={`cursor-pointer font-secondary font-bold p-2 w-[150px] text-center ${
            page === "spr" ? "bg-stone-600 text-white" : "text-black bg-white outline outline-stone-600"
          }`}
          onClick={toggleLevelCheckSPR}
          name="spr"
        >
          SPR
        </button>
        <button
          className={`cursor-pointer font-secondary font-bold p-2 w-[150px] text-center ${
            page === "levelCheck" ? "bg-stone-600 text-white" : "text-black bg-white outline outline-stone-600"
          }`}
          onClick={toggleLevelCheckSPR}
          name="levelCheck"
        >
          Level Check
        </button>
      </div>

      <div className="">
        {page === "spr" ? (
          userData?.SPR.length ? <PlotSPRTable page = {page}/> : <p className="text-center text-gray-500 mt-3">Click add SPR</p>
        ) : (
          userData?.levelCheck.length ? <PlotLevelCheck data={userData?.levelCheck} language={language} handleDisplayDelete={handleDisplayDelete} />:
          <p className= "text-center text-gray-500 mt-3">Click add Level Check</p>
        )}
      </div>

      {addFormNav && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-rows-[40px_1fr] max-w-[500px] w-full h-[300px] bg-white shadow-lg rounded-lg">
          <div className="relative bg-gray-100 h-8 w-full">
            <CloseBtn handleControl={handleFormControl} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <Link
              className="cursor-pointer flex items-center w-[250px] h-12 gap-2 bg-teal-700 hover:bg-teal-500 text-white p-2 rounded"
              to={`/spr/${language}`}
            >
              <Plus size={18} />
              <span>SPR Form</span>
            </Link>
            <Link
              className="flex items-center gap-2 bg-teal-700 w-[250px] h-12 hover:bg-teal-500 text-white p-2 rounded"
              to={`/levelCheck/${language}`}
            >
              <Plus size={18} />
              <span>Level Check Form</span>
            </Link>
          </div>
        </div>
      )}

      {deletePage.display && (
        <div className="font-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 w-[500px] h-[300px] border border-slate-500 grid grid-rows-[40px_1fr]">
          <div className="bg-dark-green w-full flex justify-end py-2">
            <button className="cursor-pointer" onClick={closePage}>
              <SquareX className="text-white" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="pb-3">Are you sure you want to delete this?</p>
            <div className="flex gap-3 justify-center">
              <button
                className="btn bg-red-500 text-white hover:bg-white hover:text-red-500 hover:outline-2 hover:outline-red-500 transition-colors duration-300"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn bg-white outline-1 outline-black rounded hover:bg-black hover:text-white hover:outline-none transition-colors duration-300"
                onClick={closePage}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
