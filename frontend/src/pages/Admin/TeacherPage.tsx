import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import API_BASE_URL from "@/api/axiosInstance";

const Loading = () =>{
    return (
        <><p>Loading ...</p></>
    )
}
const TeacherPage = () =>{
    const {email} = useParams()
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {

        const fetchTeacher = async ()=> {
            try{
                const result = await axios.get(`${API_BASE_URL}/api/admin/getTeacherByEmail`, {withCredentials: true, params: {email: email} });
                setData(result.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }

        }

        fetchTeacher();

    },[])

    return (
        <>
            <a href="/admin/home">Go back</a>
            {loading ? <Loading /> : (
                <>
                    <h1>{data.name}</h1>
                    <p>Email: {data.email}</p>
                    <p>Entries: </p>
                </>
            )}
     
            
        </>
    )
}

export default TeacherPage;