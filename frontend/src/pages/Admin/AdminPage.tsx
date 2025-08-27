import { useState, useEffect, createContext, useContext, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/api/axiosInstance";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/pages/Admin/Sidebar";

type Teacher = {
    id: string;
    name: string;
    email: string;
    language: string;
}

type TeacherContextType = {
    teachers: Teacher[];
    reload: () => void;
}

const TeacherContext = createContext<TeacherContextType | null>(null);

export function TeacherProvider({children}: {children: React.ReactNode}){
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const navigate = useNavigate();
    const language = "english"; 
    const token = localStorage.getItem("adminToken");

    const fetchTeachers = async () =>{
        try{
            if(!token){
                navigate("/admin/login");
            }
            const result = await axios.get(`${API_BASE_URL}/api/admin/teachers`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
                params: { language: language }
            });
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
            <div className="grid grid-cols-[500px_1fr] md:grid-cols-1">
                <aside className="md:block bg-white shadow-md">
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
type TeacherListProps = {   
    language: string;
}
function TeacherList({language}: TeacherListProps) {
    const { teachers, reload } = useTeachers();
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setSelectedStudentId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return() => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    return (
        <>
            <table className="border-t border-gray-300 bg-white mt-6 m-auto w-full max-w-[1000px]">
                <thead>
                    <tr className="bg-orange-700">
                        <th className="text-white p-2 text-left">Name</th>
                        <th className="text-white p-2 text-left">Email</th>
                        <th className="text-white p-2 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher: Teacher) => {
                        if(teacher.language === language || language === "all"){
                            return (
                                <tr key={teacher.id}>
                                    <td className="border-b border-gray-300 p-2">{teacher.name}</td>
                                    <td className="border-b border-gray-300 p-2">{teacher.email}</td>
                                    <td className="border-b border-gray-300 p-2">
                                        <div className="w-[30px] h-[30px] flex justify-center items-center hover:bg-gray-300 hover:rounded-full">
                                            <button onClick={() => setSelectedStudentId(selectedStudentId === teacher.id ? null : teacher.id)} className="cursor-pointer bg-none text-slate-500 hover:underline">
                                                ...
                                            </button>
                                        </div>
                                    </td>
                                {selectedStudentId === teacher.id && ( 
                                    <td colSpan={5} className="relative">
                                        <div
                                            ref={dropdownRef}    
                                            className="z-10 flex flex-col gap-2 w-[120px] p-2 bg-gray-100 border border-gray-300 mt-2 rounded gap-4 absolute top-0 right-[90px]">
                                            <Link 
                                                to={`/admin/teacher/${teacher.email}`} 
                                                className="cursor-pointer w-full text-sm text-left  hover:underline hover:text-blue-600">View</Link>
                                            <button onClick={() => { alert(`Edit for ${teacher.name}`); setSelectedStudentId(null); }} className="cursor-pointer w-full text-sm  text-left hover:underline hover:text-blue-600">Edit</button>
                                            <button onClick={() => { alert(`Delete teacher ${teacher.name}`); setSelectedStudentId(null); reload(); }} className="cursor-pointer w-full text-sm text-left  hover:underline hover:text-blue-600 text-red-600">Delete</button>
                                        </div>
                                    </td>
                                )}
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </>
    );
}

function AdminHomepage(){
    const [language, setLanguage] = useState<string>("english");
    return(
        <>
            <div className="font-secondary h-full max-w-[1100px] mx-auto bg-none">
                <h1 className="text-xl mt-6 font-semibold mb-4 text-center">GEOS English Teachers</h1>
                <ul className="w-full flex justify-center gap-5" id="language-selection">
                    <li><button onClick={() => setLanguage("english")} className={`cursor-pointer w-full text-sm text-left hover:underline ${language === "english" ? "text-active font-bold" : ""}`}>English</button></li>
                    <li><button onClick={() => setLanguage("chinese")} className={`cursor-pointer w-full text-sm text-left hover:underline ${language === "chinese" ? "text-active font-bold" : ""}`}>Chinese</button></li>
                    <li><button onClick={() => setLanguage("japanese")} className={`cursor-pointer w-full text-sm text-left hover:underline ${language === "japanese" ? "text-active font-bold" : ""}`}>Japanese</button></li>
                    <li><button onClick={() => setLanguage("korean")} className={`cursor-pointer w-full text-sm text-left hover:underline ${language === "korean" ? "text-active font-bold" : ""}`}>Korean</button></li>
                </ul>
                <TeacherList language={language} />
            </div>
        </>
    );
}


export { AdminHomepage, AdminLayout };