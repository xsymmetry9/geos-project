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
                                {["Date", "Name", "", "", ""].map((item, index) => <th className="text-center" key={`${item}-${index}`}>{item}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                        {userData.SPR.map((item, index) => {
                            return(
                                <tr key={`${item.id}-${index}`}>
                                    <td key={`${item.id}-date`} className="text-center">{format(new Date(), "MM/dd/yyyy")}</td>
                                    <td key={`${item.id}-name`} className="text-center">{item.name}</td>
                                    <td key={`${item.id}-edit`} className="text-center"><Link className="link-style" to = {`/spr/${language}/edit/${item.id}`}>Edit</Link></td>
                                    <td key={`${item.id}-delete`} className="text-center"><button className="link-style" id={item.id} onClick={handleDelete}>Delete</button></td>
                                    <td key={`${item.id}-view`} className="text-center"><Link className="link-style" to={`/spr/${language}/print/${item.id}`}>View</Link></td>
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
            <div className="centered p-b-3">
                <button className="btn-primary">to PDF</button>
            </div>
                <div className="dashboard-container">
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
