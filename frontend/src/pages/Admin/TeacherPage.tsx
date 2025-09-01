import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import API_BASE_URL from "@/api/axiosInstance";
import {format, parseISO} from "date-fns"
import DrawTable from "@/components/DrawTable"

type Teacher = {
    id: string,
    email: string,
    language: string,
    name: string,
    password: string,
    createdAt: string,
    students: [],
    levelCheckEntries: [],
    studentProgressReportEntries: []
}

const TeacherPage = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const [teacher, setTeacher] = useState<Teacher>();
    const [error, setError] = useState<string>("");
    const [category, setCategory] = useState<string>("students");
    const [selectedLevelCheckID, setSelectedLevelCheckID] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
    let params = useParams();
    const getEmail = params.email;
    
    useEffect(() => {
        setLoading(true);
        const fetchTeacher = async () => {
            try {

                const res = await axios.get(`${API_BASE_URL}/api/getTeacherByEmail`, {
                    params: {email: getEmail},
                });
                if(res.status === 200){
                    setTeacher(res.data.data)
                }

            } catch(err) {
                setTeacher(undefined);
                setError("Error: Couldn't load data.  Click reload to try again");
            } finally{
                setLoading(false);
            }

        } 
        fetchTeacher();
       
    },[])

    if (loading) return <p className="text-center text-lg">Loading ...</p>

    console.log(teacher);
    return (
        <div className="font-secondary mt-6 max-w-[1100px] mx-auto p-2">
            <h1 className="text-2xl font-bold underline pb-3">Teacher's Information</h1>
            {!loading && (
                <div className="flex flex-col gap" id="personal-information">
                    <p>Name: {teacher?.name}</p>
                    <p>Email: {teacher?.email}</p>
                    <p>Number of Students: {teacher?.levelCheckEntries.length}</p>
                    <p>Number of Student Progress Report: {teacher?.studentProgressReportEntries.length}</p>
                    <p>Number of Level Checks: {teacher?.levelCheckEntries.length}</p>
                </div>
            )}

            <div id="table-container">
                <h3 className="text-center font-bold text-xl mt-6">Level Check Entries</h3>
                {teacher?.levelCheckEntries.length == 0 && <p className="mt-6">{teacher.name} hasn't written any entries</p>}
                {teacher?.levelCheckEntries.length !== 0 && <DrawTable 
                    categoryArr = {["date", "name", "book recommendation"]}
                    entries = {teacher?.levelCheckEntries}
                    itemsDisplayed={["createdAt", "name", "bookRecommendation"]} />}

            </div>
            <div className="text-center font-bold text-xl mt-6" id="Student Progress Report Entries">Student Progress Report Entries</div>
            {teacher?.studentProgressReportEntries.length == 0 && <p className="mt-6">{teacher.name} hasn't written any entries</p>}
            {teacher?.studentProgressReportEntries.length != 0 && (
                <DrawTable 
                    categoryArr={["date", "name", "course"]}
                    entries ={teacher?.studentProgressReportEntries}
                    itemsDisplayed={["dateCreated", "studentName", "course"]} />
            )}
        </div>
    )
}

export default TeacherPage;