import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {format} from "date-fns";
import { StudentProgressReportEntry } from "@/type/StudentProgressReportEntry";

type CreateInputProps = {
        title: string;
        type: string;
        name: keyof typeof initialForm;
        value: string;
        error: string;
        handle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
const initialForm = {name: "", nickname: "", email:""};

const CreateInput = ({title, type, name, value, error, handle} : CreateInputProps) => {
        return(
             <>
                <label htmlFor={name}>
                    <span>{title}</span>
                    <input 
                        className="form-input font-primary text-bases text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]"
                        type={type}
                        name={name}
                        value={value}
                        id={name}
                        onChange={handle}/>

                    </label>
        
                {error && <p className="text-red-600 text-sm">{error}</p>}
             </>
        )
    }
export const StudentPage = () => {
    const initialize = {
        id: "",
        name: "",
        nickname: "",
        email: "",
        createdAt: "",
        studentProgressReportEntry: [],
        levelCheckEntries: []
    }
    let {id} = useParams();
    const [studentData, setStudentData] = useState(initialize);
    let location = useLocation();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    console.log(location.state);

    // location.state
    //{
//     "studentData": {
//         "id": "c1f92dfd-2b13-459a-9188-5f91b59d2b12",
//         "email": "Shana@gmail.com",
//         "name": "Shana",
//         "nickname": "Shana",
//         "createdAt": "2025-07-27T07:42:10.393Z",
//         "studentProgressReportEntry": [
//             {
//                 "id": "be966b39-8429-4fcc-8172-3c18008982f8",
//                 "studentName": "Shana",
//                 "language": "english",
//                 "course": "",
//                 "textbook": "EF1",
//                 "attendance": 20,
//                 "totalLessons": 30,
//                 "feedback": "This is just a test.",
//                 "dateCreated": "2025-07-27T07:42:30.599Z",
//                 "vocabularyInitial": "1.5",
//                 "vocabularyTarget": "1.5",
//                 "vocabularyFinal": "1.5",
//                 "grammarInitial": "",
//                 "grammarTarget": "8",
//                 "grammarFinal": "9.5",
//                 "listeningInitial": "9",
//                 "listeningTarget": "9.5",
//                 "listeningFinal": "9.5",
//                 "speakingInitial": "9",
//                 "speakingTarget": "9.5",
//                 "speakingFinal": "7.5",
//                 "pronunciationInitial": "9",
//                 "pronunciationTarget": "8",
//                 "pronunciationFinal": "9",
//                 "teacherEmail": "xavvier@test.com",
//                 "studentId": "c1f92dfd-2b13-459a-9188-5f91b59d2b12"
//             }
//         ],
//         "levelCheckEntries": []
//     }
// }
     useEffect(() => {
            let token = localStorage.getItem("token");
            if(!token) {
                setErrorMessage("Not authenticated");
                return; //Navigate to login?
            }
            
            const fetchAPI = async () => {
                try {
                    const result = await axios.get(`http://localhost:8000/api/member/getStudentById/${id}`, {
                        headers: { Authorization: `Bearer ${token}`},
                    });
                    const loadData = result.data.data;
                    setStudentData({
                        id: loadData.id, 
                        name: loadData.name, 
                        email: loadData.email, 
                        nickname: loadData.nickname, 
                        createdAt: loadData.createdAt,
                        studentProgressReportEntry: loadData.studentProgressReportEntry,
                        levelCheckEntries: loadData.levelCheckEntries
                    });

                    console.log(result);

                } catch(err) {
                    console.log("Error:", err);
                } finally {
                    setLoading(false);
                }
            };
            if(location.state?.studentData)
            {
                const {id, name, email, nickname, createdAt, studentProgressReportEntry, levelCheckEntries} = location.state.studentData;
                setStudentData((prev) => ({
                    ...prev,
                    id: id,
                    email: email,
                    name: name,
                    nickname: nickname,
                    createdAt: createdAt,
                    studentProgressReportEntry: studentProgressReportEntry,
                    levelCheckEntries: levelCheckEntries
                }));
                return;
            }

            setLoading(true);
            fetchAPI();
      },[id]); 
    return(
        <div className="font-secondary w-full max-w-[1100px] m-auto relative">
            {errorMessage && <div className="w-[120px] h-[40px] z-1 bg-white absolute top-0 left-1/2 translate-x-1/2 translate-y-1/2 flex justify-center items-center border border-slate-500"><p className="text-center">Error Message</p></div>}
            <h1 className="font-secondary text-center text-2xl font-bold">Personal Information</h1>
            <div className="mt-3 max-w-[500px] w-full mx-auto  text-gray-700">
              <p>Name: {studentData.name}</p>
              <p>Email: {studentData.email}</p>
              <p>Date Created: {new Date(studentData.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-6 flex gap-3 justify-center" id="student-nav">
                <Link className= "btn btn-primary" to={`/profile/createSPR/${id}`}>Create a SPR</Link>
                <Link className= "btn btn-primary" to={`/profile/editStudent/${id}`}>Edit Student</Link>
            </div>

            <section className="h-70" id="level-check">
                <div className="mt-7 content">
                    {studentData.levelCheckEntries.length != 0 ? (
                        <>
                            <p className="text-center">There is a level check</p>
                        </> 
                    ) : (
                        <>
                            <Link className= "text-center mt-3 text-blue-600 underline" to={`/profile/viewLevelCheck/${id}`}>Create a Level Check</Link>                        
                        </>
                        )}
                </div>

            </section>
            <section className="mt-6" id="initial-level-table">
                {studentData.studentProgressReportEntry && (
                    <>
                        <h3 className="text-center font-bold">Student Progress Report</h3>
                        <table className="table border-t border-gray-300 mt-6 m-auto w-full max-w-[1100px]">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <td className="text-center p-2 font-bold">Textbook</td>
                                    <td className="text-center p-2 font-bold">Course</td>
                                    <td className ="text-center p-2 font-bold">Attendance</td> 
                                    <td className="text-center p-2 font-bold">Total Lessons</td>
                                    <td className="text-center p-2 font-bold"></td>
                                </tr>
                            </thead>
                            <tbody>
                                 {studentData.studentProgressReportEntry.map((item) => (
                                <tr key={item.id} className="border-b border-gray-300 relative hover:bg-gray-200">
                                    <td className="text-center p-2">{item.textbook}</td>
                                    <td className="text-center p-2">{item.course}</td>
                                    <td className="text-center p-2">{item.attendance}</td>
                                    <td className="text-center p-2">{item.totalLessons}</td>
                                    <td className="text-center p-2">
                                        <div className="w-[30px] h-[30px] flex justify-center items-center hover:bg-gray-300 hover:rounded-full">
                                            <button className="cursor-pointer bg-none text-slate-500 hover:underline">
                                              ...
                                            </button>
                                        </div>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </>
                )}
        </section>
    </div>
    )
    }
export const CreateStudent = () => {
    const [formData, setFormData] = useState({name: "", nickname: "", email: ""});
    const [error, setError] = useState({name: "Enter a name", nickname: "Enter a nickname", email: "Enter an email"});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        //Checks if there are any errors.
        const hasErrors = Object.values(error).some((val) => val !== "");

        if(hasErrors){
            setErrorMessage("Incomplete form");
            return;
        } else {
            setLoading(true);
            try{
                const token = localStorage.getItem("token");
                
                if(!token){
                    setErrorMessage("Not authenticated");
                    return;
                }
                const res = await axios.post("http://localhost:8000/api/member/addStudent", formData,
                    {
                        headers: {Authorization: `Bearer ${token}`}
                    }
                );
                return res;
            } catch (error: any)
            {
                if(error.response?.status === 404){
                   setErrorMessage("Failed to connect to the backend");
                } else {
                    setErrorMessage("Error");
                }
            } finally {
                setLoading(false);
            }
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;

        if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            // /^ ... $/ Starts in a string (/^) and ends in a string ($/)
            // [^\s@]+ 
            {
                setError((prev) => ({...prev, email: 'Invalid email format'}));
            } else {
                setError((prev) => ({
                    ...prev, 
                    [name]: value === "" ? `Enter a ${name}` : ""
                }));
            }

        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
        
    };

    useEffect(() => {
        if(errorMessage){
            const timer = setTimeout(() => {
                setErrorMessage("")
            }, 2000);

            return () => clearTimeout(timer);
        }
      }, [errorMessage])

    return(
        <div className="w-full static max-w-lg m-auto relative">
            {errorMessage && <div className="w-[120px] h-[40px] z-1 bg-white absolute top-0 left-1/2 translate-x-1/2 translate-y-1/2 flex justify-center items-center border border-slate-500"><p className="text-center">Error Message</p></div>}

            <h1 className="font-secondary text-center text-2xl font-bold">Create A student</h1>
            <div className="text-gray-700 capitalize">
                <form autoComplete ="off" onSubmit={handleSubmit}>
                    <CreateInput title={"Name"} type={"text"} name={"name"} value={formData.name} error = {error.name} handle={handleInput}/>
                    <CreateInput title={"Nickname"} type={"text"} name={"nickname"} value={formData.nickname} error= {error.nickname} handle={handleInput}/>
                    <CreateInput title={"Email"} type={"email"} name={"email"} value={formData.email} error= {error.email} handle={handleInput}/>
   
                    <div className="flex gap-2 justify-center mt-3" >
                        {!loading && <input 
                            className="btn btn-primary"
                            type="submit" 
                            value={"Save"} />}
                        {loading && <p>Loading ...</p>}
                    </div>
         
                </form>
            </div>
        </div>
    )
}

export const EditStudent = () => {
    let {id} = useParams();
    const [formData, setFormData] = useState({id: "", name: "", nickname: "", email: "", createdAt: ""});
    const [error, setError] = useState({id: "", name: "", nickname: "", email: "", createdAt: ""});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        //Checks if there are any errors.
        const hasErrors = Object.values(error).some((val) => val !== "");

        if(hasErrors){
            setErrorMessage("Incomplete form");
            return;
        } else {
            setLoading(true);
            try{
                const token = localStorage.getItem("token");
                
                if(!token){
                    setErrorMessage("Not authenticated");
                    return;
                }
                const res = await axios.put(`http://localhost:8000/api/member/updateStudent/${formData.id}`, formData,
                    {
                        headers: {Authorization: `Bearer ${token}`}
                    }
                );
                return res;
            } catch (error:any)
            {
                if(error.response?.status === 404){
                   setErrorMessage("Failed to connect to the backend");
                } else {
                    setErrorMessage("Error");
                }
            } finally {
                setLoading(false);
            }
        }
    }
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;

        if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            // /^ ... $/ Starts in a string (/^) and ends in a string ($/)
            // [^\s@]+ 
            {
                setError((prev) => ({...prev, email: 'Invalid email format'}));
            } else {
                setError((prev) => ({
                    ...prev, 
                    [name]: value === "" ? `Enter a ${name}` : ""
                }));
            }

        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    }

        
    useEffect(() => {
            setLoading(true);
            let token = localStorage.getItem("token");
            if(!token) {
                setErrorMessage("Not authenticated");
                return; //Navigate to login?
            }
            
            const fetchData = async () => {
                try {
                    const result = await axios.get(`http://localhost:8000/api/member/getStudentById/${id}`, {
                        headers: { Authorization: `Bearer ${token}`},
                    });
                    const loadData = result.data.data;
                    setFormData({
                        id: loadData.id, 
                        name: loadData.name, 
                        email: loadData.email, 
                        nickname: loadData.nickname, 
                        createdAt: loadData.createdAt
                    });

                } catch(err) {
                    setErrorMessage("Error");
                } finally {
                    setLoading(false);
                }
            };
        fetchData();
      },[id]); 

      useEffect(() => {
        if(errorMessage){
            const timer = setTimeout(() => {
                setErrorMessage("")
            }, 2000);

            return () => clearTimeout(timer);
        }
      }, [errorMessage])
      return(
         <div className="w-full static max-w-lg m-auto">
            {errorMessage && <div className="w-[120px] h-[40px] z-1 bg-white absolute top-0 left-1/2 translate-x-1/2 translate-y-1/2 flex justify-center items-center border border-slate-500"><p className="text-center">Error Message</p></div>}
            <h1 className="font-secondary text-center text-2xl font-bold">Edit student</h1>
            <div className="text-gray-700 capitalize">
                <form autoComplete ="off" onSubmit={handleSubmit}>
                    <CreateInput title={"Name"} type={"text"} name={"name"} value={formData.name} error = {error.name} handle={handleInput}/>
                    <CreateInput title={"Nickname"} type={"text"} name={"nickname"} value={formData.nickname} error= {error.nickname} handle={handleInput}/>
                    <CreateInput title={"Email"} type={"email"} name={"email"} value={formData.email} error= {error.email} handle={handleInput}/>
   
                    <div className="flex gap-2 justify-center mt-3" >
                        {!loading && (
                            <>
                               <input 
                                className="btn btn-primary"
                                type="submit" 
                                value={"Save"}/>
                                <Link to="/profile/viewStudents" className="btn btn-primary">Cancel</Link>
                            </>
                         )}
                        {loading && <p>Loading ...</p>}
                    </div>
         
                </form>
            </div>
        </div>
    );
};