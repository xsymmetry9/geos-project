import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Archive, Pencil, PrinterIcon, Plus } from "lucide-react";
import User from "../type/User";
import ExportToExcel from "../components/ExportToExcel";
import { getDataFromLocal, editDataFromLocal, deleteStudentById } from "../utils/functions";
import ImportFromExcel from "../components/ImportFromExcel";
import {CreateNewFormBtn, CloseBtn} from "../components/CustomizedButtons";

function Homepage() {
  const { language } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [addFormNav, setAddFormNav] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = getDataFromLocal();

        if (!savedData) {
          const newUser = new User();
          newUser.language = language;
          editDataFromLocal(savedData);
          setUserData(newUser);
        } else {
          const parsedData = JSON.parse(savedData);
          parsedData.language = language;
          setUserData(parsedData);
        }
      } catch (error) {
        console.error("Error fetching or updating user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const handleFormControl = () => {
    setAddFormNav((prev) => !prev);
  };

  if (loading) {
    return (
      <>
        <h1>Loading ...</h1>
      </>
    );
  }
  const handleDelete = (e) => {
    const { id } = e.currentTarget;
    deleteStudentById(id); // Delete single item from localStorage
    setUserData((prev) => ({
      ...prev,
      SPR: prev.SPR.filter((item) => item.id != id),
    }));
  };

  const PlotTable = () => {
    return (
      <>
        <table className="w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-orange-700 text-white font-bold">
                <th className="p-3 text-center" >Date</th>
                <th className="p-3 text-center" >Name</th>
                <th className="p-3 text-center" >Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.SPR.map((item, index) => {
              return (
                <tr key={`${item.id}-${index}`} className="border-b-3 border-orange-100 odd:bg-orange-50 even:bg-white hover:bg-gray-300">
                  <td key={`${item.id}-date`} className="p-3 text-center">
                    {format(new Date(), "MM/dd/yyyy")}
                  </td>
                  <td key={`${item.id}-name`} className="p-3 text-center">
                    {item.name}
                  </td>
                  <td
                    key={`${item.id}-edit`}
                    className="flex gap-3 justify-center mt-4"
                  >
                    <Link className="text-blue-500" to={`/spr/${language}/edit/${item.id}`}>
                      <Pencil size={20} />
                    </Link>

                    <button className="text-green-600 cursor-pointer" id={item.id} onClick={handleDelete}>
                      <Archive size={20} />
                    </button>

                    <Link className="text-red-600 cursor-pointer" to={`/spr/${language}/print/${item.id}`}>
                      <PrinterIcon size={20} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <div className="pb-12 w-full">
        <h2 className="font-secondary text-2xl text-center font-semibold mb-6">Student&rsquo;s Progress Report</h2>
        <div className="p-b-3 flex justify-center gap-3 mb-6">
          <CreateNewFormBtn handleControl = {handleFormControl}/>
          <ExportToExcel userData={userData} />
          <ImportFromExcel userData={userData} setUserData={setUserData} />
        </div>
        <div className="px-2">
          {userData.SPR.length != 0 && <PlotTable />}
          {userData.SPR.length === 0 && <p className="text-center text-gray-500">Click add SPR or Level Check</p>}
        </div>
        {addFormNav && (
          <div id="pop-up-navigation" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-1/2 grid grid-rows-[40px_1fr] max-w-[500px] w-full h-[300px] bg-white shadow-lg rounded-lg">
            <div id="pop-up-header" className="relative bg-gray-100 h-8 w-full">
              <CloseBtn handleControl={handleFormControl} />
            </div>
            <div id="pop-up-content" className="flex flex-col items-center justify-center gap-3">
              <Link className="cursor-pointer flex items-center w-[250px] h-12 gap-2 bg-teal-700 hover:bg-teal-500 text-white p-2 rounded hover:bg-blue-700" to={`/spr/${language}`}>
                  <Plus size={18} />
                  <span>SPR Form</span>
              </Link>
              <Link className="flex items-center gap-2 bg-teal-700 w-[250px] h-12 hover:bg-teal-500 text-white p-2 rounded hover:bg-blue-700" to={`/levelCheck/${language}`}>
                <Plus size={18} />
                <span>Level Check Form</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Homepage;
