import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import {format} from "date-fns";
import "../styles/components/dashboard.scss";
import User from "../type/User";
import ExportToExcel from "../components/ExportToExcel";
import { getDataFromLocal, editDataFromLocal, deleteStudentById } from "../utils/functions";
import ImportFromExcel from "../components/ImportFromExcel";
import {Archive, Pencil, PrinterIcon, CirclePlus, SquareX, Plus} from "lucide-react";

export default function Homepage (){
    const {language} = useParams();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [addFormNav, setAddFormNav] = useState(false);
        useEffect(() =>{
            const fetchData = async () => {
                try{
                    const savedData = getDataFromLocal();

                    if(!savedData) {
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

        const handleFormControl = () =>{
            setAddFormNav((prev)=> !prev);
        }

        if(loading){
            return(
                <><h1>Loading ...</h1></>
            )
        }
    const handleDelete = (e) =>{
        const {id} = e.currentTarget;
        deleteStudentById(id); // Delete single item from localStorage
        setUserData((prev) => ({...prev, SPR: prev.SPR.filter((item) => item.id != id)}));

    }

    const PlotTable = () =>{

        return(
            <>
                <table className="dashboard-table">
                        <thead>
                            <tr>
                                {["Date", "Name", ""].map((item, index) => <th className="text-center" key={`${item}-${index}`}>{item}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                        {userData.SPR.map((item, index) => {
                            return(
                                <tr key={`${item.id}-${index}`}>
                                    <td key={`${item.id}-date`} className="text-center">{format(new Date(), "MM/dd/yyyy")}</td>
                                    <td key={`${item.id}-name`} className="text-center">{item.name}</td>
                                    <td key={`${item.id}-edit`} className="text-center flex justify-space-around gap-1">
                                        <Link className="link-style" to = {`/spr/${language}/edit/${item.id}`}>
                                            <Pencil className="icon" size={16} />
                                            <span className="visually-hidden p-1">Edit</span>
                                        </Link>
                                  
                                        <button className="link-style" id={item.id} onClick={handleDelete}>
                                            <Archive className="icon" size={16} />
                                            <span className="visually-hidden p-1">Archive</span>
                                        </button>
                                   
                                        <Link className="link-style" to={`/spr/${language}/print/${item.id}`}>
                                            <PrinterIcon className="icon" size={16} />
                                            <span className="visually-hidden p-1">Preview</span>
                                        </Link></td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
            </>
        )
    }

    return(
        <>
            <div className="dashboard"> 
                <h2 className="centered p-b-7">Students Progress Report</h2>
                <div className="flex gap-3 justify-center p-b-3">
                    <ExportToExcel userData ={userData} />
                    <ImportFromExcel userData = {userData} setUserData={setUserData}/>
                </div>
                    <div className="dashboard-container">
                        {userData.SPR.length != 0 && <PlotTable />}
                        {userData.SPR.length === 0 && <p>Click add SPR or Level Check</p>}

                    </div>
                    {
                        !addFormNav ? (
                        <div className="btn-circle">
                            <button onClick= {handleFormControl}>
                                <CirclePlus size={48} />
                            </button>
                        </div>) : (
                        <div className="form-navigation-container">
                            <div className="nav-header">
                                <button onClick={handleFormControl}>
                                    <SquareX />
                                </button>
                            </div>
                            <div className="nav-body">
                                <Link className="btn-primary " to={`/spr/${language}`}>
                                    <div className="two-columns">
                                        <Plus size={18}/>                        
                                        <span>SPR</span>
                                    </div>
          
                                </Link>
                                <Link className="btn-primary two-columns" to={`/levelCheck/${language}`}>
                                    <Plus size={18} />
                                    <span >Level Check</span>
                                </Link>
                            </div>
                            
                         </div> 
                        )

                    }
     

               
            </div>
        </>

    )
}
