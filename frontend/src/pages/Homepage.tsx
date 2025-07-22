import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Archive, Pencil, PrinterIcon, Plus, SquareX } from "lucide-react";

import User from "../type/User";
import { getDataFromLocal, deleteStudentById } from "../utils/functions";
import ExportToExcel from "../components/ExportToExcel";
import ImportFromExcel from "../components/ImportFromExcel";
import { CreateNewFormBtn, CloseBtn } from "../components/CustomizedButtons";

const PlotLevelCheck = ({ language, data, handleDisplayDelete }) => (
  <table className="w-full border-collapse shadow-md">
    <thead>
      <tr className="bg-orange-700 text-white font-bold">
        <td className="p-3 text-center">Date</td>
        <td className="p-3 text-center">Name</td>
        <td className="p-3 text-center">Functions</td>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr
          className="border-b-3 border-orange-100 odd:bg-orange-50 even:bg-white hover:bg-gray-300"
          key={`level-check${item.id}`}
        >
          <td className="p-3 text-center">{item.dateCreated}</td>
          <td className="p-3 text-center">{item.student_name}</td>
          <td className="flex gap-3 justify-center mt-4">
            <Link className="text-blue-500" to={`/levelCheck/${language}/edit/${item.id}`}>
              <Pencil size={20} />
            </Link>
            <Link className="text-green-600 cursor-pointer" to={`/levelCheck/${language}/print/${item.id}`}>
              <PrinterIcon size={20} />
            </Link>
            <button
              className="text-red-600 cursor-pointer"
              onClick={() => handleDisplayDelete({ display: true, id: item.id, type: "levelCheck" })}
            >
              <Archive size={20} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Homepage = () => {
  const { language } = useParams();
  const [page, setPage] = useState("spr");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [addFormNav, setAddFormNav] = useState(false);
  const [deletePage, setDeletePage] = useState({ display: false, id: null, type: "" });

  useEffect(() => {
    const user = getDataFromLocal();
    setUserData(user);
    setLoading(false);
  }, [language]);

  const handleFormControl = () => setAddFormNav((prev) => !prev);

  const handleDisplayDelete = ({ display, id, type }) => {
    setDeletePage({ display, id, type });
  };

  const handleDelete = () => {
    if (!deletePage.id || !userData) return;

    deleteStudentById(deletePage.id);
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

  const PlotSPRTable = () => (
    <table className="w-full border-collapse shadow-md">
      <thead>
        <tr className="bg-orange-700 text-white font-bold">
          <th className="p-3 text-center">Date</th>
          <th className="p-3 text-center">Name</th>
          <th className="p-3 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {userData?.SPR.map((item, index) => (
          <tr
            key={`${item.id}-${index}`}
            className="border-b-3 border-orange-100 odd:bg-orange-50 even:bg-white hover:bg-gray-300"
          >
            <td className="p-3 text-center">{format(new Date(item.dateCreated), "MM/dd/yyyy")}</td>
            <td className="p-3 text-center">{item.name}</td>
            <td className="flex gap-3 justify-center mt-4">
              <Link className="text-blue-500" to={`/spr/${language}/edit/${item.id}`}>
                <Pencil size={20} />
              </Link>
              <Link className="text-green-600 cursor-pointer" to={`/spr/${language}/print/${item.id}`}>
                <PrinterIcon size={20} />
              </Link>
              <button
                className="text-red-600 cursor-pointer"
                onClick={() => handleDisplayDelete({ display: true, id: item.id, type: "SPR" })}
              >
                <Archive size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="pb-12 w-full">
      <h2 className="font-secondary text-2xl text-center font-semibold mb-6">Student&rsquo;s Progress Report</h2>
      <div className="p-b-3 flex justify-center gap-3 mb-6">
        <CreateNewFormBtn handleControl={handleFormControl} />
        <ExportToExcel userData={userData} />
        <ImportFromExcel userData={userData} setUserData={setUserData} />
      </div>

      <div className="flex justify-center gap-5 p-2">
        <button
          className={`cursor-pointer font-secondary font-bold bg-dark-green p-2 rounded-md text-white w-[150px] ${
            page === "spr" ? "bg-white-600" : "bg-dark-blue"
          }`}
          onClick={toggleLevelCheckSPR}
          name="spr"
        >
          SPR
        </button>
        <button
          className="cursor-pointer font-secondary font-bold bg-dark-green p-2 rounded-md text-white w-[150px]"
          onClick={toggleLevelCheckSPR}
          name="levelCheck"
        >
          Level Check
        </button>
      </div>

      <div className="px-2">
        {page === "spr" ? (
          userData?.SPR.length ? <PlotSPRTable /> : <p className="text-center text-gray-500">Click add SPR</p>
        ) : (
          <PlotLevelCheck data={userData?.levelCheck} language={language} handleDisplayDelete={handleDisplayDelete} />
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
