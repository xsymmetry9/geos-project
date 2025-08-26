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
                <main className="p-6 bg-gray-100 overflow-y-auto">
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
        <div>
            <h2 className="text-xl font-semibold mb-4">Teachers:</h2>
            <ul>
                {teachers.map((teacher: Teacher) => (
                    <li key={teacher.id} className="flex justify-between mb-2 border-b pb-1">
                        <div>{teacher.name}</div>
                        <div>{teacher.email}</div>
                        <a href={`./home/teacherPage/${teacher.email}`}>View more</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function AdminHomepage(){
      const [data, setData] = useState([]);
      const language = "english";
        useEffect(() =>{ 
            const fetchTeachers = async () =>{
                try{
                    //Gets all teacher from aws data
                    const result = await axios.get(`${API_BASE_URL}/api/admin/teachers`, {withCredentials: true, params: {language: language} });
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
            <TeacherList />
            {/* <ul>{data.map((teacher: Teacher) => {
                return (
                    <>
                        <li key={teacher.id} className="flex justify-between mb-2 border-b pb-1">
                            <div>{teacher.name}</div>
                            <div>{teacher.email}</div>
                            <a href={`./home/teacherPage/${teacher.email}`}>View more</a>
                        </li>
                    </>
                )
            })}

            </ul>
             */}
      </div>
    </>
  );  
}

export { AdminHomepage, AdminLayout };