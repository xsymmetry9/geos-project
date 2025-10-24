import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LevelCheckSelect, LevelCheckOverall } from "@/components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "@/type/LevelCheckForm";
import "@/styles/printLevelCheck.css";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { format } from "date-fns";
import SaveControl from "@/components/SaveControl";
import { useUser } from "@/context/UserContext";

interface FormProps {
  inputData: LevelCheckEntry;
  setInputData: React.Dispatch<React.SetStateAction<LevelCheckEntry>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface CommentProps {
  setInputData: React.Dispatch<React.SetStateAction<LevelCheckEntry>>;
  className: string;
  name: string;
  id: string;
  value: string;
}

interface PlotProps {
  data: LevelCheckEntry;
}

const Comment: React.FC<CommentProps> = ({ className, name, setInputData, id, value }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    if (value.length > 715) {
      setMessage("You have reached the max.  Text will overflow");
    } else {
      setMessage("");
      setInputData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <>
      <textarea className={className} name={name} onChange={handleChange} id={id} value={value} />
      <p className="text-sm text-red-600">{message}</p>
    </>
  );
};
const Form: React.FC<FormProps> = ({ inputData, setInputData, handleChange, handleSubmit }) => {
  const { user } = useUser();
  const language = user?.language;
  return (
    <div className="font-secondary mx-auto h-full w-full max-w-[50em] px-3 py-6 shadow-2xl">
      <div className="mt-6 flex flex-col items-center justify-center">
        <h1 className="py-3 text-2xl font-bold">Oral Assessment Form</h1>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <section className="px-3 py-6">
          <div className="p-1">
            <label htmlFor="student_name">
              <span className="text-md font-bold">Student Name:</span>
              <input
                className="form-input font-primary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
                name="student_name"
                id="input-student_name"
                onChange={handleChange}
                value={inputData.student_name}
                type="text"
              />
            </label>
          </div>
          <div className="p-1">
            <label htmlFor="dateCreated">
              <span className="text-md font-bold">Date</span>
              <input
                type="date"
                className="form-input font-primary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
                name="dateCreated"
                id="input-dateCreated"
                value={format(inputData.dateCreated, "yyyy-MM-dd")}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>
        <section className="px-3 py-6">
          <h2 className="w-full bg-orange-500 py-2 text-center text-lg font-bold text-white">
            Level Assessment
          </h2>
          <LevelCheckSelect item="speaking" inputData={inputData} setInputData={setInputData} />
          <LevelCheckSelect item="confidence" inputData={inputData} setInputData={setInputData} />
          <LevelCheckSelect item="grammar" inputData={inputData} setInputData={setInputData} />
          <LevelCheckSelect item="vocabulary" inputData={inputData} setInputData={setInputData} />
          <LevelCheckSelect
            item="pronunciation"
            inputData={inputData}
            setInputData={setInputData}
          />
          <LevelCheckSelect item="listening" inputData={inputData} setInputData={setInputData} />
        </section>
        <section className="px-3 py-6" id="input-feedback">
          <h2 className="w-full bg-orange-500 py-2 text-center text-lg font-bold text-white">
            Final Notes
          </h2>
          <div className="mt-6">
            <label className="text-md font-bold" htmlFor="bookRecommendation">
              Book Recommendation:
              <input
                type="text"
                name="bookRecommendation"
                id="bookRecommendation"
                value={inputData.bookRecommendation}
                onChange={handleChange}
                className="form-input font-primary mt-1 mb-2 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base font-normal text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
              />
            </label>
            <LevelCheckOverall
              name="overall level"
              item="overallLevel"
              data={inputData.overallCEFR}
              handleChange={handleChange}
            />
            <label htmlFor="feedback">
              <span className="text-md font-bold">Note:</span>
              <Comment
                className="mt-1 block h-[200px] w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6"
                name="feedback"
                setInputData={setInputData}
                id="input-feedback"
                value={inputData.feedback}
              />
            </label>
          </div>
        </section>
        <div className="flex w-full justify-center gap-3 pt-3">
          <input type="submit" className="btn-primary" value="submit" />
          <Link to="/" className="btn-primary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
const LevelCheckForm = () => {
  const initiateForm = new LevelCheckEntry();
  const [inputData, setInputData] = useState<LevelCheckEntry>(initiateForm);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const getUser = () => {
      const raw = localStorage.getItem("GEOS_app");
      const result = raw ? JSON.parse(raw) : null;

      if (result === null) return;
      return result;
    };
    const user = getUser();
    if (user !== null) {
      user.levelCheck.push(inputData); // Adds new form
      setLoading(false);
      // Creates new user
    } else {
      console.log("It' wasn't loaded well");
    }
  }, []);

  !loading && <p>Loading ...</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "dateCreated") {
      setInputData((prev) => ({
        ...prev,
        dateCreated: new Date(value),
      }));

      return;
    }

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
    if (!getUser) return;

    const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

    if (index !== -1) {
      getUser.levelCheck[index] = inputData;
    } else {
      getUser.levelCheck.push(inputData);
    }

    localStorage.setItem("GEOS_app", JSON.stringify(getUser));
    navigate(`preview/${inputData.id}`, { replace: true, state: { data: inputData } });
  };

  return (
    <>
      <Form
        inputData={inputData}
        setInputData={setInputData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

const LevelCheckEdit = () => {
  const initForm = new LevelCheckEntry();
  let { id } = useParams();
  let [inputData, setInputData] = useState<LevelCheckEntry>(initForm);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
    if (!getUser) return;

    const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

    if (index !== -1) {
      getUser.levelCheck[index] = inputData;
    } else {
      getUser.levelCheck.push(inputData);
    }

    localStorage.setItem("GEOS_app", JSON.stringify(getUser));

    navigate(`/levelCheck/preview/${inputData.id}`, { replace: true, state: { data: inputData } });
  };

  useEffect(() => {
    setLoading(true);
    try {
      const raw = localStorage.getItem("GEOS_app");
      const data = raw ? JSON.parse(raw) : null;
      if (!data) {
        console.log("Couldn't find the data on localstorage");
        return;
      }
      const levelCheck = data.levelCheck;
      const filtered = levelCheck.filter((item: any) => item.id === id);
      if (filtered.length === 0) {
        console.log("Couldn't find the file");
        return;
      }
      const result = filtered[0];
      console.log("result:", result);

      setInputData((prev) => ({
        ...prev,
        id: result.id,
        dateCreated: result.dateCreated,
        student_name: result.student_name,
        feedback: result.feedback,
        bookRecommendation: result.bookRecommendation,
        overallCEFR: result.overallCEFR,
        speaking: result.speaking,
        confidence: result.confidence,
        grammar: result.grammar,
        vocabulary: result.vocabulary,
        listening: result.listening,
        pronunciation: result.pronunciation,
      }));
    } catch (error) {
      console.log("Error", error);
      return;
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading || inputData === null) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {!loading && (
        <Form
          inputData={inputData}
          setInputData={setInputData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

const LevelCheckPreview = () => {
  let params = useParams();
  const [data, setData] = useState<LevelCheckEntry>();
  const componentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<null | (() => void)>(null);
  const [isPreparing, setIsPreparing] = useState<boolean>(false);
  const [language, setLanguage] = useState(""); //Future use

  useEffect(() => {
    try {
      setIsPreparing(true);
      const raw = localStorage.getItem("GEOS_app");
      const app = JSON.parse(raw ?? "{}");

      setLanguage(app.language); // Future Use
      const levelCheckData: any[] = Array.isArray(app?.levelCheck) ? app.levelCheck : [];

      const index = levelCheckData.findIndex((item) => item.id === params.id);
      if (index !== -1) {
        setData(levelCheckData[index]);
        setIsPreparing(false);
      } else {
        console.log("Data not found");
        setIsPreparing(false);
        setData(undefined);
      }
    } catch (e) {
      console.error("Failed to read GEOS_app:", e);
      setData(undefined);
    }
  }, [params.id]);

  const printFromPdf = async () => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current, {
      scale: 2,
      backgroundColor: "#fff",
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    // Landscape page — this controls print orientation in the PDF
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    // Use img props ONLY for sizing inside the PDF
    const { width: imgW, height: imgH } = pdf.getImageProperties(imgData);
    const scale = Math.min(pageW / imgW, pageH / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const x = (pageW - renderW) / 2;
    const y = (pageH - renderH) / 2;

    pdf.addImage(imgData, "PNG", x, y, renderW, renderH);

    // Ask PDF viewers to open the print dialog
    if ((pdf as any).autoPrint) pdf.autoPrint();

    // Open in hidden iframe and trigger print
    const blobUrl = pdf.output("bloburl");
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.src = blobUrl;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };
  };

  useEffect(() => {
    if (isPreparing && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPreparing]);

  return (
    <>
      {data ? (
        <>
          <div className="container mt-12 mb-3 flex justify-center" id="navigation">
            <Link className="btn btn-primary" to={`/home`}>
              Home
            </Link>
          </div>
          <div className="print-component-landscape" ref={componentRef}>
            <LevelCheckPlot data={data} />
          </div>
          <div className="mt-9 flex w-full justify-center gap-2 pb-12">
            <Link to={`/levelCheck/edit/${params.id}`} className="btn btn-primary">
              Edit
            </Link>
            <SaveControl
              contentRef={componentRef}
              className="btn-primary"
              layout="landscape"
              title={"level-check"}
            />
            <button className="btn-primary" onClick={printFromPdf}>
              Print
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Data not found</p>
        </>
      )}
    </>
  );
};
const LevelCheckPlot: React.FC<PlotProps> = ({ data }) => {
  return (
    <div className="w-full px-12" id="print-preview">
      <div className="font-primary container" id="level-check-content">
        <div className="flex w-full justify-between pt-4">
          <div className="mt-3">
            <p className="ml-3 text-[14px]">
              <span className="font-bold">Name: </span>
              {data.student_name}
            </p>
            <p className="ml-3 text-[14px]">
              <span className="font-bold">Date: </span>
              {format(data.dateCreated, "MM/dd/yyyy")}
            </p>
          </div>
          <h1 className="mt-6 text-center text-lg font-bold">Oral Assessment Guidelines</h1>
          <img className="" width={120} height={60} src={"/logo.jpg"} alt={"Company Logo"} />
        </div>
        <div id="table-container">
          <table
            className="mt-1 h-[420px] w-[1026px] table-auto border-collapse border border-slate-600"
            id="table-content"
          >
            <colgroup>
              <col className="w-[100px]" />
              <col className="w-[400px]" />
              <col className="w-[400px]" />
              <col className="w-[56px]" />
              <col className="w-[70px]" />
            </colgroup>
            <thead className="text-[15px]">
              <tr className="h-[30px] bg-teal-600 text-center font-bold text-white">
                <td className="border-r border-b border-slate-600">Category</td>
                <td className="border-r border-b border-slate-600">Strength</td>
                <td className="border-r border-b border-slate-600">Weakness</td>
                <td className="border-r border-b border-slate-600 bg-orange-300 text-black">
                  Score
                </td>
                <td className="border-b border-slate-600 bg-orange-300 text-black">CEFR</td>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {[
                "speaking",
                "confidence",
                "grammar",
                "vocabulary",
                "pronunciation",
                "listening",
              ].map((item) => {
                return (
                  <tr key={item} className="h-[72px]">
                    <td className="w-[100px] border-r border-b border-black bg-teal-50 px-1 text-center font-bold capitalize">
                      {item}
                    </td>
                    <td className="border-r border-b border-black bg-white px-1">
                      <ul className="">
                        {data[item].strength.map((list: any, idx: number) => (
                          <li className="print-list" key={idx}>
                            {list}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-r border-b border-black bg-white px-1">
                      <ul className="">
                        {data[item].weakness.map((list: any, idx: number) => (
                          <li className="print-list" key={idx}>
                            {list}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-r border-b border-black bg-orange-50 px-1 text-center text-[15px]">
                      {data[item].score}
                    </td>
                    <td className="border-b border-black bg-orange-50 px-1 text-center text-[15px]">
                      {data[item].level_name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table className="mt-3 w-[1026px] table-auto border-collapse border border-black">
            <thead className="w-full text-[15px] font-bold text-white">
              <tr className="grid w-full grid-cols-[100px_1fr_125px] justify-self-center">
                <td className="border-r border-black bg-teal-600 p-1 text-center">Note</td>
                <td className="border-r border-black bg-teal-600 p-1"></td>
                <td className="bg-orange-300 p-1 text-center text-black">Level</td>
              </tr>
            </thead>
            <tbody className="bg-white text-[15px]">
              <tr className="grid h-[155px] grid-cols-[1fr_125px] border-black">
                <td className="flex border-t border-black p-2 text-[15px]">{data.feedback}</td>
                <td className="grid grid-rows-[1fr_60px_1fr] border-t border-l border-black">
                  <p className="items-center bg-orange-50 pt-3 text-center text-[15px]">
                    {data.overallCEFR}
                  </p>
                  <p className="items-center border-t border-black bg-orange-300 p-2 text-center text-[13px] font-bold">
                    Book Suggestion
                  </p>
                  <p
                    className={`border-t bg-orange-50 text-center ${data.bookRecommendation.length < 10 ? "pt-4 text-[15px]" : "pt-2 text-[11px]"} items-center`}
                  >
                    {data.bookRecommendation}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export { LevelCheckEdit, LevelCheckForm, LevelCheckPreview, LevelCheckPlot };
