import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CreateLevelCheckFormButton } from "./StudentPage";
import {format} from "date-fns";

const ProfilePage = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const loadData = result.data;
        console.log(loadData);
        setUser(loadData.user);
        setStudents(loadData.data);
      } catch (err) {
        console.error(err);
        setError("There was an error loading the data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() =>{
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

  const toggleOptions = (id: string) => {
    setSelectedStudentId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (student: any) => {
    console.log("Editing student:", student);
    // Navigate to edit page or open modal
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      console.log(id);
      const result = await axios.delete(`http://localhost:8000/api/member/deleteStudent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents((prev) => prev.filter((student) => student.id !== id));
      console.log(result.data.message); 
    } catch (err) {
      setError("Failed to load the students data");
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p className="text-red">{error}</p>;

  return (
    <>
      <h1 className="text-center capitalize font-bold text-3xl">Hi, {user.name}.</h1>
      <table className="border-t border-gray-300 mt-6 m-auto w-full max-w-[1100px]">
        <thead>
          <tr className="border-b border-gray-300">
            <td className="p-2 font-bold">Name</td>
            <td className="p-2 font-bold">Joined</td>
            <td className="p-2 font-bold">Nickname</td>
            <td className ="p-2 font-bold"># of SPR Entries</td> 
            <td className="p-2 font-bold">Level Check</td>
            <td className="p-2 font-bold"></td>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => (
            <tr key={item.id} className="border-b border-gray-300 relative hover:bg-gray-200">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{item.nickname}</td>
              <td className="p-2">{item.studentProgressReportEntry.length}</td>
              <td className="p-2">{item.levelCheckEntries.length}</td>
              <td className="p-2">
                <div className="w-[30px] h-[30px] flex justify-center items-center hover:bg-gray-300 hover:rounded-full">
                <button onClick={() => toggleOptions(item.id)} className="cursor-pointer bg-none text-slate-500 hover:underline">
                  ...
                </button>

                </div>
          
              </td>

              {selectedStudentId === item.id && (
                <td colSpan={5} className="relative">
                  <div
                    ref={dropdownRef} 
                    className="z-10 flex flex-col gap-2 w-[120px] p-2 bg-gray-100 border border-gray-300 mt-2 rounded gap-4 absolute top-0 right-[90px]">
                    <Link to={`/profile/viewStudent/${item.id}`} state={{studentData: item}} className="cursor-pointer w-full text-center text-sm hover:underline hover:text-blue-600">View Student</Link>
                    <Link to={`/spr/${item.id}`} className="cursor-pointer w-full text-center text-sm hover:underline hover:text-blue-600">SPR</Link>
                    <CreateLevelCheckFormButton studentId={item.id}/>
                    <Link to={`/profile/editStudent/${item.id}`} className="cursor-pointer w-full text-center text-sm hover:text-blue-600 hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(item.id)} className="cursor-pointer text-sm text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProfilePage;
