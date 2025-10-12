import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStudentById } from "@/utils/functions";
import {PrintContent} from "@/components/PrintStudentProgressReport";
import PrintControl from "@/components/PrintControl";
import SaveControl from "@/components/SaveControl";
import { useUser } from "@/context/UserContext";
import { Student } from "@/type/Student";

const PrintPage = () => {
  const params = useParams();
  const [parsedData, setParsedData] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (params.id) {
      const studentData = getStudentById(params.id);
      setParsedData(studentData);
    } else {
      setParsedData(null);
    }
    setLoading(false);
  }, [params.id]);

  const {user} = useUser();
  const language = user?.language || "english" ;
  const componentRef = useRef<HTMLDivElement>(null); //Save reference to print

  if(!parsedData) return <div>Loading ...</div>

  
  return (
    <>
      <div className="flex items-center justify-center pb-3">
        <Link className="btn-primary mt-6" to={`/home`}>
          Dashboard
        </Link>
      </div>
    <div className= "mx-auto overflow-auto">
      <div id={`print-${language}`} className="shadow-lg border print-component" ref={componentRef}>
        <PrintContent parsedData={parsedData} language = {language}/>
      </div>
    </div>
      <div className="flex justify-center pt-3 gap-3 pb-6">
        <PrintControl contentRef={componentRef} className="btn btn-primary print" />
        <SaveControl contentRef = {componentRef} className = "btn btn-primary print" layout="p" title="spr" />
      </div>
    </>
  );
};

export default PrintPage;
