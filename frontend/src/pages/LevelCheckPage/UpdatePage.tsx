import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LevelCheckForm from "@/pages/LevelCheckPage/LevelCheckForm";
import { CjkEntry, EnglishEntry } from "@/type/LevelCheckForm";
import { getLevelCheckById } from "./shared";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState<EnglishEntry | CjkEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (error !== null) return;
    if (inputData == undefined) return setError("Submit failed: inputData is undefined");

    const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
    if (!getUser) return;

    if (!Array.isArray(getUser.levelCheck)) {
      getUser.levelCheck = [];
    }

    const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

    if (index !== -1) {
      const existing = getUser.levelCheck[index];
      getUser.levelCheck[index] = {
        ...inputData,
        cloudUrl: (inputData as any).cloudUrl || existing.cloudUrl || "",
      };
    } else {
      getUser.levelCheck.push(inputData);
    }

    localStorage.setItem("GEOS_app", JSON.stringify(getUser));
    navigate(`/levelCheck/preview/${inputData.id}`, { replace: true, state: { data: inputData } });
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    try {
      const entry = getLevelCheckById(id);
      if (!cancelled) {
        setInputData(entry);
        setError(null);
      }
    } catch (e: any) {
      if (!cancelled) {
        setError(e?.message ?? "Unexpected error while loading data.");
        setInputData(null);
      }
    } finally {
      if (!cancelled) setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="text-center text-2xl">Loading ...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!inputData) {
    return <p className="text-center text-amber-600">No data found for this record.</p>;
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-6">
      <LevelCheckForm
        inputData={inputData}
        setInputData={setInputData}
        handleSave={handleSave}
      />
    </div>
  );
};

export default EditPage;
