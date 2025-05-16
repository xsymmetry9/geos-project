import { useState, useEffect } from "react";
import axios from "axios";

function AdminHomepage(){
      const [data, setData] = useState([]);
      const language = "english";
        useEffect(() =>{ 
            const fetchTeachers = async () =>{
                try{
                    //Gets all teacher from aws data
                    const result = await axios.get(`http://localhost:8000/api/admin/teachers`, {withCredentials: true, params: {language: language} });
                    setData(result.data.data);

                } catch (err)
                {
                    console.log("Error fetching data:" , err);
                }
            }
            fetchTeachers();
            console.log(data);
        }, []);
    return(
        <>
        <h1 className="text-3xl font-bold text-center my-4">Admin Homepage</h1>
        <div className="p-4 max-w-2xl mx-auto bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Teachers:</h2>
            <ul>{data.map((teacher) => {
                return (
                    <>
                        <li key={teacher.id} className="flex justify-between mb-2 border-b pb-1">
                            <div>{teacher.name}</div>
                            <div>{teacher.email}</div>
                            <a href="">View more</a>
                        </li>
                    </>
                )
            })}

            </ul>
            
      </div>
    </>
  );  
}

export default AdminHomepage;