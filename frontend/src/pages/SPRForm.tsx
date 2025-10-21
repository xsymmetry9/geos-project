import { useState, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PlotForm from "@/components/Form/PlotForm";
import { Student } from "@/type/Student";
import { getStudentById } from "@/utils/functions";
import { House } from "lucide-react";

const SPRForm = () => {
  const { id } = useParams<{ id?: string }>();

  const initialStudent = !id ? new Student(uuidv4()) : getStudentById(id);
  const [inputData, setInputData] = useState<Student>(initialStudent); //Creates an new or edit form
  return (
    <>
      <div className="font-secondary flex w-full justify-center p-2">
        <Link className="btn-primary flex justify-center gap-1" to={`/home`}>
          <House />
          Home
        </Link>
      </div>
      <PlotForm inputData={inputData} setInputData={setInputData} />
    </>
  );
};

export default SPRForm;
