import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Archive, Pencil, PrinterIcon, Plus, SquareX, MoreHorizontal, Search } from "lucide-react";
import User from "@/type/User";
import { getDataFromLocal } from "@/utils/functions";
import ExportToExcel from "@/components/ExportToExcel";
import ImportFromExcel from "@/components/ImportFromExcel";
import { CreateNewFormBtn, CloseBtn } from "@/components/CustomizedButtons";
import { LevelCheckEntry } from "@/type/LevelCheckForm";
import { Language } from "@/utils/common";
import { useUser } from "@/context/UserContext";
// import PrintButton from "@/components/PrintButton";

type PlotLevelCheckProps = {
  language: Language;
  data: LevelCheckEntry[];
  handleDisplayDelete: (opts: { display: boolean; id: string; type: "levelCheck" }) => void;
};
const formattedDate = (dateCreated: Date) => {
  return format(dateCreated, "MM/dd/yyyy");
};
const PlotLevelCheck = ({ language, data, handleDisplayDelete }: PlotLevelCheckProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const toggleOption = (id: string) => {
    setSelectedId(id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setSelectedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <table className="mx-auto w-full max-w-[900px]">
      <colgroup>
        <col style={{ width: "33.3333%" }} />
        <col style={{ width: "33.3333%" }} />
        <col style={{ width: "33.3333%" }} />
      </colgroup>
      <thead>
        <tr className="bg-teal-700 font-semibold text-white">
          <th className="p-3 text-center text-sm tracking-wide uppercase">Date</th>
          <th className="p-3 text-left text-sm tracking-wide uppercase">NAME</th>
          <th className="w-[80px] p-3 text-center text-sm tracking-wide uppercase">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr
            className="border-b border-gray-200 transition-colors duration-150 odd:bg-white even:bg-slate-50 hover:bg-slate-100"
            key={`level-check${item.id}`}
          >
            <td className="h-[40px] p-3 text-center text-sm">{formattedDate(item.dateCreated)}</td>
            <td className="h-[40px] p-3 pl-6 text-left text-sm font-medium">{item.student_name}</td>
            <td className="relative h-[36px] p-3 text-center">
              <div className="inline-block">
                <button
                  onClick={() => toggleOption(item.id)}
                  aria-expanded={selectedId === item.id}
                  aria-label="toggle menu"
                  type="button"
                  className="cursor-pointer rounded-full border border-transparent bg-white p-1 text-slate-600 hover:border-gray-200 hover:bg-slate-100 focus:ring-2 focus:ring-teal-300 focus:outline-none"
                >
                  <MoreHorizontal size={16} strokeWidth={2} />
                </button>
              </div>
              {selectedId === item.id && (
                <div
                  ref={dropDownRef}
                  className="absolute top-10 right-0 z-30 mt-2 flex w-[150px] flex-col rounded border border-gray-200 bg-white p-1 shadow-md"
                >
                  <Link
                    className="flex items-center gap-2 p-2 hover:bg-slate-50"
                    to={`/levelCheck/edit/${item.id}`}
                  >
                    <Pencil size={18} />
                    <span className="text-sm">Edit</span>
                  </Link>
                  <Link
                    className="flex items-center gap-2 p-2 hover:bg-slate-50"
                    to={`/levelCheck/preview/${item.id}`}
                  >
                    <Search size={18} />
                    <span className="text-sm">View</span>
                  </Link>
                  {/* <PrintButton className={"flex items-center gap-2 p-2 hover:bg-slate-50"} docType="levelCheckReport" docID={item.id} language={language} setSelectedId={setSelectedId} /> */}
                  <button
                    className="flex w-full items-center gap-2 p-2 text-left hover:bg-slate-50"
                    onClick={() =>
                      handleDisplayDelete({ display: true, id: item.id, type: "levelCheck" })
                    }
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
};

const Homepage = () => {
  const [page, setPage] = useState<"spr" | "levelCheck">("spr");
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User>(new User());
  const [addFormNav, setAddFormNav] = useState<boolean>(false);
  const [deletePage, setDeletePage] = useState<{
    display: boolean;
    id: string | null;
    type: string;
  }>({ display: false, id: null, type: "" });
  const { user } = useUser(); // Use usecontext

  useEffect(() => {
    const user = getDataFromLocal();
    setUserData(user);
    setLoading(false);
  }, []);

  const handleFormControl = () => setAddFormNav((prev) => !prev);

  type handleDisplayDeleteProps = {
    display: boolean;
    id: string;
    type: string;
  };
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
      setSelectedId(id);
    };

    useEffect(() => {
      const handleClickeOutside = (event: MouseEvent) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
          setSelectedId(null);
        }
      };
      document.addEventListener("mousedown", handleClickeOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickeOutside);
      };
    });

    return (
      <table className="mx-auto w-full max-w-[900px]">
        <colgroup>
          <col style={{ width: "33.3333%" }} />
          <col style={{ width: "33.3333%" }} />
          <col style={{ width: "33.3333%" }} />
        </colgroup>
        <thead>
          <tr className="bg-dark-green font-semibold text-white">
            <th className="p-3 text-center text-sm tracking-wide uppercase">date</th>
            <th className="p-3 text-center text-sm tracking-wide uppercase">name</th>
            <th className="w-[80px] p-3 text-center text-sm tracking-wide uppercase">actions</th>
          </tr>
        </thead>
        <tbody>
          {userData?.SPR.map((item, index) => (
            <tr
              key={`${item.id}-${index}`}
              className="border-b border-gray-200 transition-colors duration-150 odd:bg-white even:bg-slate-50 hover:bg-slate-100"
            >
              <td className="h-[40px] p-3 text-center text-sm">
                {format(new Date(item.dateCreated), "MM/dd/yyyy")}
              </td>
              <td className="h-[40px] p-3 pl-6 text-center text-sm font-medium">{item.name}</td>
              <td className="relative h-[40px] p-3 text-center">
                <div className="inline-block">
                  <button
                    onClick={() => toggleOption(item.id)}
                    aria-expanded={selectedId === item.id}
                    aria-label="Toggle Menu"
                    type="button"
                    className="cursor-pointer rounded-full border border-transparent bg-white p-1 text-slate-600 hover:border-gray-200 hover:bg-slate-100 focus:ring-2 focus:ring-teal-300 focus:outline-none"
                  >
                    <MoreHorizontal size={16} strokeWidth={2} />
                  </button>
                </div>
                {selectedId === item.id && (
                  <div
                    ref={dropDownRef}
                    className="absolute top-10 right-0 z-40 mt-2 flex w-[160px] flex-col rounded border border-gray-200 bg-white p-1 shadow-lg"
                  >
                    <Link
                      className="flex items-center gap-2 p-2 hover:bg-slate-50"
                      to={{
                        pathname: `/spr/edit/${item.id}`
                      }}
                    >
                      <Pencil size={18} />
                      <span className="text-sm">Edit</span>
                    </Link>
                    <Link
                      className="flex items-center gap-2 p-2 hover:bg-slate-50"
                      to={`/spr/view/${item.id}`}
                    >
                      <Search size={18} />
                      <span className="text-sm">View</span>
                    </Link>
                    {/* <PrintButton
                      className="flex w-full cursor-pointer items-center gap-2 p-2 text-left hover:bg-slate-50"
                      docID={item.id}
                      language={user?.language}
                      setSelectedId={setSelectedId}
                    /> */}
                    <button
                      className="flex w-full cursor-pointer items-center gap-2 p-2 text-left hover:bg-slate-50"
                      onClick={() =>
                        handleDisplayDelete({ display: true, id: item.id, type: "SPR" })
                      }
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
  };

  return (
    <div className="pb-12">
      <h2 className="font-secondary mt-6 mb-6 text-center text-2xl font-semibold">
        {page === "spr" ? "Student's Progress Report" : "Level Checks"}
      </h2>
      <div className="p-b-3 mb-6 flex justify-center gap-3">
        <CreateNewFormBtn handleControl={handleFormControl} />
        <ExportToExcel userData={userData} />
        <ImportFromExcel userData={userData} setUserData={setUserData} />
      </div>

      <div className="mx-auto w-full max-w-[800px]">
        <button
          className={`font-secondary w-[150px] cursor-pointer p-2 text-center font-bold ${page === "spr"
            ? "bg-stone-600 text-white"
            : "bg-white text-black outline outline-stone-600"
            }`}
          onClick={toggleLevelCheckSPR}
          name="spr"
        >
          SPR
        </button>
        <button
          className={`font-secondary w-[150px] cursor-pointer p-2 text-center font-bold ${page === "levelCheck"
            ? "bg-stone-600 text-white"
            : "bg-white text-black outline outline-stone-600"
            }`}
          onClick={toggleLevelCheckSPR}
          name="levelCheck"
        >
          Level Check
        </button>
      </div>

      <div className="">
        {page === "spr" ? (
          userData?.SPR.length ? (
            <PlotSPRTable />
          ) : (
            <p className="mt-3 text-center text-gray-500">Click add SPR</p>
          )
        ) : userData?.levelCheck.length ? (
          <PlotLevelCheck
            data={userData?.levelCheck}
            language={userData?.language}
            handleDisplayDelete={handleDisplayDelete}
          />
        ) : (
          <p className="mt-3 text-center text-gray-500">Click add Level Check</p>
        )}
      </div>

      {addFormNav && (
        <div className="absolute top-1/2 left-1/2 grid h-[300px] w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 grid-rows-[40px_1fr] rounded-lg bg-white shadow-lg">
          <div className="relative h-8 w-full bg-gray-100">
            <CloseBtn handleControl={handleFormControl} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <Link
              className="flex h-12 w-[250px] cursor-pointer items-center gap-2 rounded bg-teal-700 p-2 text-white hover:bg-teal-500"
              to={"/spr"}
            >
              <Plus size={18} />
              <span>SPR Form</span>
            </Link>
            <Link
              className="flex h-12 w-[250px] items-center gap-2 rounded bg-teal-700 p-2 text-white hover:bg-teal-500"
              to={"/levelCheck/create"}
            >
              <Plus size={18} />
              <span>Level Check Form</span>
            </Link>
          </div>
        </div>
      )}

      {deletePage.display && (
        <div className="font-secondary absolute top-1/2 left-1/2 grid h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform grid-rows-[40px_1fr] border border-slate-500 bg-slate-50">
          <div className="bg-dark-green flex w-full justify-end py-2">
            <button className="cursor-pointer" onClick={closePage}>
              <SquareX className="text-white" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="pb-3">Are you sure you want to delete this?</p>
            <div className="flex justify-center gap-3">
              <button
                className="btn bg-red-500 text-white transition-colors duration-300 hover:bg-white hover:text-red-500 hover:outline-2 hover:outline-red-500"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn rounded bg-white outline-1 outline-black transition-colors duration-300 hover:bg-black hover:text-white hover:outline-none"
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
