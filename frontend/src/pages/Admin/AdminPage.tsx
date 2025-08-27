import { useState, useEffect, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/api/axiosInstance";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

type Teacher = {
    id: string;
    name: string;
    email: string;
}

type TeacherContextType = {
    teachers: Teacher[];
    reload: () => void;
}

const TeacherContext = createContext<TeacherContextType | null>(null);

export function TeacherProvider({children}: {children: React.ReactNode}){
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const language = "english"; 

    const fetchTeachers = async () =>{
        try{
            const result = await axios.get(`${API_BASE_URL}/api/admin/teachers`, {withCredentials: true, params: {language: language} });
            setTeachers(result.data.data);
        } catch (err)
        {
            console.log("Error fetching data:" , err);
        }
    }

    useEffect(() =>{
        fetchTeachers();
    }, []);

    return(
        <TeacherContext.Provider value={{teachers, reload: fetchTeachers}}>
            {children}
        </TeacherContext.Provider>
    );
}

export function useTeachers(){
    const context = useContext(TeacherContext);
    if(!context){
        throw new Error("useTeachers must be used within a TeacherProvider");
    }
    return context;
} 


function AdminLayout(){
    return(
        <TeacherProvider>
             <div className="grid h-screen grid-rows-[70px_1fr_90px] grid-cols-1">
            <Header />
            <div className="grid grid-cols-[250px_1fr]">
                <aside className="bg-white border-r shadow-sm">
                    <Sidebar />
                </aside>
                <main className="bg-gray-100">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
        </TeacherProvider>
       
    )
}

function TeacherList() {
    const { teachers, reload } = useTeachers();
    return (
        <>
            <ul className="list-none p-4">
                {teachers.map((teacher: Teacher) => (
                    <li key={teacher.id} className="flex justify-between mb-2 border-b pb-1">
                        <div>{teacher.name}</div>
                        <div>{teacher.email}</div>
                        <a href={`./home/teacherPage/${teacher.email}`}>View more</a>
                    </li>
                ))}
            </ul>
        </>
    );
}

function AdminHomepage(){
    return(
        <>
            <div className="h-full max-w-[1100px] mx-auto bg-white shadow">
                <h1 className="text-3xl font-bold text-center p-6">Admin Homepage</h1>
                <h2 className="text-xl font-semibold mb-4">Teachers:</h2>
                <TeacherList />
            </div>
        </>
  );  
}

export { AdminHomepage, AdminLayout };