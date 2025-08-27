import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import API_BASE_URL from "@/api/axiosInstance";

const TeacherPage = () =>{
    let params = useParams();
    const getEmail = params.email;
    const adminToken = localStorage.getItem("adminToken");
    
    // useEffect(() => {
    //     const fetchTeacher = async () => {
    //         try {
    //             if(!adminToken){
    //                 console.log("No token");
    //             }
    //             const res = await axios.get(`${API_BASE_URL}/api/getTeacherByEmail`, {
    //                 params: {email: getEmail},
    //                 headers: { Authorization: `Bearer ${adminToken}`},
    //             });
    //             console.log(res);

    //         } catch(err) {
    //             console.log(err);   
    //         }   

    //     } 
    //     // fetchTeacher();
    // },[])
    return (
        <>
            <h1>Teacher</h1>
            <p>{getEmail}</p>

        </>
    )
}

export default TeacherPage;