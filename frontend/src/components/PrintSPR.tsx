import { useRef, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getStudentById } from "../utils/functions";
import {PrintContent} from "./PrintStudentProgressReport";
import PrintControl from "./PrintControl";
import SaveControl from "./SaveControl";

const PrintPage = () => {
  const { id, language } = useParams<{id: string; language: string}>(); //Gets id and language through link
  const componentRef = useRef<HTMLDivElement>(null); //Save reference to print
  const parsedData = useMemo(()=> {
    if (!id) return null;
    return getStudentById(id); //Gets data from localstorage by id
  }, [id]);

  if(!parsedData) return <div>Loading ...</div>

  return (
    <>
      <div className="flex items-center justify-center pb-3">
        <Link className="btn-primary mt-6" to={`/home/${language}`}>
          Dashboard
        </Link>
      </div>
    <div className= "mx-auto overflow-auto">
      <div id={`print-${language}`} className="shadow-lg border print-component" ref={componentRef}>
        <PrintContent parsedData={parsedData} />
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
