import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import {format} from "date-fns";
import "../styles/components/dashboard.scss";
import User from "../type/User";
import { getDataFromLocal, editDataFromLocal, deleteStudentById } from "../utils/functions";

export default function Homepage (){
    const {language} = useParams();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

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
                                {["Name", "Date", "Edit", "Delete", "Download", "Print"].map((item) => <th key={item}>{item}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                        {userData.SPR.map((item, index) => {
                            return(
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{format(new Date(), "MM/dd/yyyy")}</td>
                                    <td><Link to = {`/spr/${language}/edit/${item.id}`}>Edit</Link></td>
                                    <td><button id={item.id} onClick={handleDelete}>Delete</button></td>
                                    <td><button>Download</button></td>
                                    <td><Link to={`/spr/${language}/print/${item.id}`}>View</Link></td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
            </>
        )
    }

    return(
        <>
            <div className="dashboard centered"> 
                <h1 className="text-2 p-1">Welcome {userData.name}</h1>
                <div className="dashboard-container">
                    <h2>Students Progress Report</h2>
                    {userData.SPR.length != 0 && <PlotTable />}
                    {userData.SPR.length === 0 && <p>Click add SPR or Level Check</p>}
                    
                </div>

                <div className="buttons-navigation-container">
                    <Link className="btn-primary" to={`/spr/${language}`}>+ SPR</Link>
                    <Link className="btn-primary" to={`/levelCheck/${language}`}>+ Level Check</Link>
                </div> 
            </div>
        </>

    )
}
