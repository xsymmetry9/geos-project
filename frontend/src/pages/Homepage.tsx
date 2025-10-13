import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Archive, Pencil, PrinterIcon, Plus, SquareX, MoreHorizontal } from "lucide-react";
import User from "@/type/User";
import { getDataFromLocal } from "@/utils/functions";
import ExportToExcel from "@/components/ExportToExcel";
import ImportFromExcel from "@/components/ImportFromExcel";
import { CreateNewFormBtn, CloseBtn } from "@/components/CustomizedButtons";
import { LevelCheckEntry } from "@/type/LevelCheckForm";
import { Language } from "@/utils/common";
import { useUser } from "@/context/UserContext";

type PlotLevelCheckProps = {
  language: Language;
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
    <table className="max-w-[900px] w-full mx-auto">
      <colgroup>
        <col style={{width: '33.3333%'}} />
        <col style={{width: '33.3333%'}} />
        <col style={{width: '33.3333%'}} />
      </colgroup>
    <thead>
        <tr className="bg-teal-700 text-white font-semibold">
        <th className="p-3 text-center text-sm uppercase tracking-wide">Date</th>
          <th className="p-3 text-left text-sm uppercase tracking-wide">NAME</th>
        <th className="p-3 text-center w-[80px] text-sm uppercase tracking-wide">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item: any) => (
        <tr
          className="border-b border-gray-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100 transition-colors duration-150"
          key={`level-check${item.id}`}
        >
          <td className="p-3 text-center h-[40px] text-sm">{formattedDate(item.dateCreated)}</td> 
          <td className="p-3 text-left h-[40px] pl-6 font-medium text-sm">{item.student_name}</td>
          <td className="p-3 text-center h-[36px] relative">
            <div className="inline-block">
               <button
                onClick={() => toggleOption(item.id)}
                aria-expanded= {selectedId === item.id}
                aria-label="toggle menu"
                type="button"
                className="cursor-pointer bg-white text-slate-600 hover:bg-slate-100 rounded-full p-1 border border-transparent hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >             
                <MoreHorizontal size={16} strokeWidth={2} />
              </button>
              </div>
                {selectedId === item.id && (
                  <div
                    ref={dropDownRef} 
                    className="z-30 flex flex-col w-[150px] p-1 bg-white border border-gray-200 mt-2 rounded absolute top-10 right-0 shadow-md"
                   >
                    <Link className="flex items-center gap-2 p-2 hover:bg-slate-50" to={`/levelCheck/edit/${item.id}`}>
                      <Pencil size={18} />
                      <span className="text-sm">Edit</span>
                    </Link>
                    <Link className="flex items-center gap-2 p-2 hover:bg-slate-50" to={`/levelCheck/preview/${item.id}`}>
                      <PrinterIcon size={18} />
                      <span className="text-sm">View</span>
                    </Link>
                    <button
                      className="flex items-center gap-2 p-2 hover:bg-slate-50 text-left w-full"
                      onClick={() => handleDisplayDelete({ display: true, id: item.id, type: "levelCheck" })}
                    >
                      <Archive size={18} />
                      <span className="text-sm">Delete</span>
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
  const [page, setPage] = useState<"spr" | "levelCheck">("spr");
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User>(new User());
  const [addFormNav, setAddFormNav] = useState<boolean>(false);
  const [deletePage, setDeletePage] = useState<{ display: boolean; id: string | null; type: string }>({ display: false, id: null, type: "" });
  const {user} = useUser(); // Use usecontext

  useEffect(() => {
    const user = getDataFromLocal();
    setUserData(user);
    setLoading(false);
  },[]);

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
    if (!raw) return;

    const parsedData = JSON.parse(raw);
    const existing = Array.isArray(parsedData[deletePage.type]) ? parsedData[deletePage.type] : [];
    const result = existing.filter((item: any) => item.id !== deletePage.id);

    parsedData[deletePage.type] = result;

    localStorage.setItem("GEOS_app", JSON.stringify(parsedData));

    setUserData((prev) => {
      if (!prev) return prev;
      if (deletePage.type === "SPR") {
        return { ...prev, SPR: result } as User;
      }
      if (deletePage.type === "levelCheck") {
        return { ...prev, levelCheck: result } as User;
      }
      return prev;
    });

    closePage();
  };

  const closePage = () => setDeletePage({ display: false, id: null, type: "" });

  const toggleLevelCheckSPR = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.currentTarget as HTMLButtonElement).name;
    setPage(name as "spr" | "levelCheck");
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
    <table className="w-full max-w-[900px] mx-auto">
      <colgroup>
        <col style={{width: '33.3333%'}} />
        <col style={{width: '33.3333%'}} />
        <col style={{width: '33.3333%'}} />
      </colgroup>
      <thead>
        <tr className="bg-dark-green text-white font-semibold">
          <th className="p-3 text-center text-sm uppercase tracking-wide">date</th>
          <th className="p-3 text-left text-sm uppercase tracking-wide">name</th>
          <th className="p-3 text-center w-[80px] text-sm uppercase tracking-wide">actions</th>
        </tr>
      </thead>
      <tbody>
        {userData?.SPR.map((item, index) => (
          <tr
            key={`${item.id}-${index}`}
            className="border-b border-gray-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100 transition-colors duration-150"
          >
            <td className="p-3 text-center h-[40px] text-sm">{format(new Date(item.dateCreated), "MM/dd/yyyy")}</td>
            <td className="p-3 text-left h-[40px] pl-6 font-medium text-sm">{item.name}</td>
            <td className="p-3 text-center h-[40px] relative">
              <div className="inline-block">
                 <button
                    onClick={() => toggleOption(item.id)}
                    aria-expanded={selectedId === item.id}
                    aria-label="Toggle Menu"
                    type="button"
                    className="cursor-pointer bg-white text-slate-600 hover:bg-slate-100 rounded-full p-1 border border-transparent hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
                    >             
                    <MoreHorizontal size={16} strokeWidth={2} />
                  </button>
              </div>
                {selectedId === item.id && (
                  <div 
                    ref={dropDownRef}
                    className="z-40 flex flex-col w-[160px] p-1 bg-white border border-gray-200 mt-2 rounded absolute top-10 right-0 shadow-lg">
                    <Link className="flex items-center gap-2 p-2 hover:bg-slate-50" to={`/spr/edit/${item.id}`}>
                      <Pencil size={18} />
                      <span className="text-sm">Edit</span>
                    </Link>
                    <Link className="flex items-center gap-2 p-2 hover:bg-slate-50" to={`/spr/print/${item.id}`}>
                      <PrinterIcon size={18} />
                      <span className="text-sm">View</span>
                    </Link>
                    <button
                      className="flex items-center gap-2 p-2 hover:bg-slate-50 text-left w-full"
                      onClick={() => handleDisplayDelete({ display: true, id: item.id, type: "SPR" })}
                    >
                      <Archive size={18} />
                      <span className="text-sm">Delete</span>
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
          userData?.SPR.length ? <PlotSPRTable /> : <p className="text-center text-gray-500 mt-3">Click add SPR</p>
        ) : (
          userData?.levelCheck.length ? <PlotLevelCheck data={userData?.levelCheck} language={userData?.language} handleDisplayDelete={handleDisplayDelete} />:
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
              to={`/spr`}
            >
              <Plus size={18} />
              <span>SPR Form</span>
            </Link>
            <Link
              className="flex items-center gap-2 bg-teal-700 w-[250px] h-12 hover:bg-teal-500 text-white p-2 rounded"
              to={`/levelCheck`}
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
