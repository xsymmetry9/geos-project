import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PlotForm from "@/components/Form/PlotForm";
import { Student } from "@/type/Student";
import { getStudentById } from "@/utils/functions";

const SPRForm = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);

  const [inputData, setInputData] = useState<Student | null>(() => {
    if (!id) return new Student(uuidv4());
    return getStudentById(id);
  });

  if (isEditing && !inputData) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-[55rem] flex-col items-center justify-center gap-4 px-4 py-10 text-center">
        <p className="text-lg font-semibold text-ink">SPR not found</p>
        <p className="text-sm text-muted">This form may have been deleted.</p>
        <Link className="btn-primary" to="/home?view=spr">
          View SPR forms
        </Link>
      </div>
    );
  }

  if (!inputData) return null;

  return (
    <div className="mx-auto w-full max-w-[55rem] px-4 py-6">
      <PlotForm inputData={inputData} setInputData={setInputData} />
    </div>
  );
};

export default SPRForm;
