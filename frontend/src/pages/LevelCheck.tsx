import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {LevelCheckSelect, LevelCheckOverall} from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";
import "../styles/printLevelCheck.css"
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { safeFormatISO } from "@/utils/functions";
import API_BASE_URL from "@/api/axiosInstance";

const createForm = async (studentId: string) => {
  try{
    const token = localStorage.getItem("token");
    if(!token){
      console.log("token not found, you need to login again.");
      return;
    }
    const res = await axios.post(`${API_BASE_URL}/api/member/createLevelCheck/${studentId}`,
      {studentId: studentId},
      {headers: { Authorization: `Bearer ${token}`},
    })
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log("Error in the backend.  Check log: ", error);
    return;
  } 
    
}

const getForm = async(formId: string) => {
  try {
    const token = localStorage.getItem("token");
    if(!token){
      console.log("token not found, you need to login again");
      return;
    }

    const res = await axios.get(`${API_BASE_URL}/api/member/getLevelCheck/${formId}`,
      {headers: { Authorization: `Bearer ${token}`},
    });

    return res;

  } catch(error) {
    console.log(error);

  }
}

const deleteForm = async (formId: string) => {
  try{
    const token = localStorage.getItem("token");
    if(!token){
      console.log("Can't delete because token wasn't found");
      return;
    }
    const deleted = await axios.delete(`${API_BASE_URL}/api/member/deleteLevelCheck/${formId}`, 
    {headers: {Authorization: `Bearer ${token}`},
    });

      return deleted;


  // console.log(deleted);
  } catch (error){
    return error;
  }
  
}

interface FormProps {
  inputData: LevelCheckEntry,
  setInputData: React.Dispatch<React.SetStateAction<LevelCheckEntry>>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
interface CommentProps {
  setInputData: React.Dispatch<React.SetStateAction<LevelCheckEntry>>,
  className: string,
  name: string,
  id: string,
  value: string
}

const Comment: React.FC<CommentProps> = ({className, name, setInputData, id, value}) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;

    if(value.length > 715)
    {
      setMessage("You have reached the max.  Text will overflow");
    } else {
      setMessage("");
      setInputData((prev: any) => ({
        ...prev,
          [name]: value,
    }));
    }
  }
  return(
    <>
      <textarea 
           className= {className} 
           name={name} 
           onChange={handleChange} 
           id={id} 
           value= {value}/>
      <p className="text-red-600 text-sm">{message}</p>
    </>

  )
}
const Form: React.FC<FormProps> = ({inputData, setInputData, handleChange, handleSubmit}) => {
  return(
     <div className="font-secondary w-full h-full max-w-[50em] mx-auto shadow-2xl px-3 py-6">
      <div className="mt-6 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold py-3">Oral Assessment Form</h1>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <section className="px-3 py-6">
          <div className="p-1">
            <label htmlFor="student_name"><span className="font-bold text-md">Student Name:</span> 
              <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" 
                name="student_name" 
                id="input-student_name" 
                onChange={handleChange} 
                value={inputData.student_name}
                type="text" />
            </label>
          </div>
          <div className="p-1">
            <label htmlFor="dateCreated"><span className="font-bold text-md">Date</span> 
              <input 
                type="date" 
                className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" 
                name="dateCreated" 
                id="input-dateCreated"
                value={safeFormatISO(inputData.dateCreated, "yyyy-MM-dd")} 
                onChange={handleChange}/>
            </label>
          </div>
        </section>
        <section className="px-3 py-6">
          <h2 className="text-lg py-2 bg-orange-500 text-white w-full text-center font-bold">Level Assessment</h2>
        <LevelCheckSelect item="speaking" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="confidence" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="grammar" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="vocabulary" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="pronunciation" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="listening" inputData ={inputData} setInputData={setInputData} />
        </section>
        <section className="px-3 py-6" id="input-feedback">
          <h2 className="text-lg py-2 bg-orange-500 text-white w-full text-center font-bold">Final Notes</h2>
          <div className="mt-6">
            <label className="font-bold text-md" htmlFor ="bookRecommendation">Book Recommendation:
              <input 
                type="text" 
                name="bookRecommendation" 
                id="bookRecommendation"
                value={inputData.bookRecommendation}
                onChange={handleChange}
                className="font-normal form-input font-primary text-base text-black mt-1 mb-2 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" />
            </label>
            <LevelCheckOverall name="overall level" item="overallLevel" data={inputData.overallCEFR} handleChange={handleChange}/>
             <label htmlFor="feedback"><span className="font-bold text-md">Comment:</span> 
             <Comment 
                className= "block w-full h-[200px] rounded-md bg-white mt-1 px-3 py-1.5 text-base text-gray-900 outline-2 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6" 
                name ="feedback" 
                setInputData = {setInputData} 
                id = "input-feedback" 
                value= {inputData.feedback}/>
            </label>
          </div>
  
        </section>
        <div className="w-full flex justify-center pt-3">
         <input type="submit" className="btn-primary" value="submit"/>
        </div>
      </form>
    </div>
  )
}

const LevelCheckForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const initiateForm = new LevelCheckEntry();
  let params = useParams();
  let navigate = useNavigate();
  const [inputData, setInputData] = useState<LevelCheckEntry>(initiateForm);
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const userData = location.state;

  if(!userData) return (
      <>
        <p className="text-red-500">Link not found</p>
        <Link className="underline text-blue-500" to={`/profile/viewStudents`}>Go back to Student Profile</Link>
      </>

  )
  const studentId = params.id;

   useEffect(() =>{
    setLoading(true);

    const fetchForm = async () => {
      try{
        const token = localStorage.getItem("token");
        if(!token){
          console.log("token not found, you need to login again.");
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/api/member/getLevelCheckForm/${formId}`,
          {headers: { Authorization: `Bearer ${token}`}});

        const data = res.data.data;
        console.log(data);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    }

    if(!userData) {
      fetchForm();
      setLoading(false);
      return;
    } else {

      console.log(inputData);
      setInputData((prev) => ({
        ...prev,
        id: userData.id,
        student_name: userData.name,
        overallCEFR: userData.overallCEFR,
        bookRecommendation: userData.bookRecommendation,
        feedback: userData.feedback,
        dateCreated: userData.createdAt
      }));

      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement >) => {
    const {name, value} = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
        [name]: value
    }));
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updateForm = async () => {
      try{
      const token = localStorage.getItem("token");
        if(!token){
          console.log("token not found, you need to login again.");
          return;
        }

      const result = await axios.put(`${API_BASE_URL}/api/member/updateLevelCheck`, 
        { data: inputData},
        { headers: {Authorization: `Bearer ${token}`},
      });
      if(result.status === 200)
      {
        navigate(`/levelCheck/${studentId}/preview/${inputData.id}`, {replace: true, state: {data: inputData}});

      }
    } catch (error) {
      console.log(error);
      return;
      }

    }
    updateForm();

  }

  if(loading) return <p>Loading...</p>;
  return (
    <>
      <Form inputData={inputData} setInputData={setInputData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>)

};


const LevelCheckEdit = () => {

  const initForm = new LevelCheckEntry();
  let {studentId, formId} = useParams();
  let [inputData, setInputData] = useState<LevelCheckEntry>(initForm);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
        [name]: value
    }));
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateForm = async () => {
      try{
        console.log(inputData);
      const token = localStorage.getItem("token");
        if(!token){
          console.log("token not found, you need to login again.");
          return;
        }

      const result = await axios.put(`${API_BASE_URL}/api/member/updateLevelCheck`, 
        { data: inputData},
        { headers: {Authorization: `Bearer ${token}`},
      });
      console.log(result);

      if(result.status === 200)
      {
        navigate(`/levelCheck/${studentId}/preview/${inputData.id}`, {replace: true, state: {data: inputData}});
        console.log("success!");

      }
    } catch (error) {
      console.log(error);
      return;
      }

    }
    updateForm();

    // navigate(`/levelCheck/${studentId}/preview/${inputData.id}`, {replace: true, state: {data: inputData}});
    }
 
  useEffect(() => {
    setLoading(true);
    const fetchData = async () =>{
      try{

        const token = localStorage.getItem("token");
        if(!token) {
          console.log("Need to login again");
          return;
        }
        
        const result = await axios.get(`http://localhost:8000/api/member/getLevelCheck/${formId}`,
          {headers: { Authorization: `Bearer ${token}`}});

        if(result.status === 200 )
        {
          const data = result.data.data;

          setInputData((prev: LevelCheckEntry) => ({
            ...prev,
            id: data.id,
            dateCreated: data.dateCreated,
            student_name: data.student_name,
            feedback: data.feedback,
            bookRecommendation: data.bookRecommendation,
            overallCEFR: data.overallCEFR,
            speaking: data.speaking,
            confidence: data.confidence,
            grammar: data.grammar,
            vocabulary: data.vocabulary,
            pronunciation: data.pronunciation,
            listening: data.listening,
            }));

        } else {
          console.log("Error in the backend");
        }

      } catch (error) {
        console.log("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  },[]);

  if(loading) return <p>Loading...</p>;
  
  return (
    <>
      <Form inputData={inputData} setInputData={setInputData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>)
}

const LevelCheckPreview = () => { 
  let params = useParams();
  const {studentId, formId} = params;
  const promiseResolveRef = useRef<null | (() => void)>(null);
  const [isPreparing, setIsPreparing] = useState<boolean>(false);
  let location = useLocation();
  const initData = new LevelCheckEntry();
  const [data, setData] = useState<LevelCheckEntry>(initData);
  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setLoading(true);

    if(location.state === null){
      const fetchData = async () =>{
        try{
          const token = localStorage.getItem("token");
          if(!token) {
            console.log("Need to login again");
          return;
          }
          const result = await axios.get(`${API_BASE_URL}/api/member/getLevelCheck/${formId}`,
            {headers: { Authorization: `Bearer ${token}`}});

          if(result.status === 200 )
          {
          const getData = result.data.data;
          console.log("Fetching data:", getData);

          setData((prev: LevelCheckEntry) => ({
            ...prev,
            id: getData.id,
            dateCreated: getData.dateCreated ?? "",
            student_name: getData.student_name ?? "",
            feedback: getData.feedback ?? "",
            bookRecommendation: getData.bookRecommendation ?? "",
            overallCEFR: getData.overallCEFR ?? "",
            speaking: ({...prev.speaking,
              level_name: getData.speaking.level_name,
              score: getData.speaking.score,
              strength: Array.isArray(getData.speaking.weakness) ? [...getData.speaking.strength] : [],
              weakness: Array.isArray(getData.speaking.weakness) ? [...getData.speaking.weakness] : [],
         
            }),
            confidence: ({...prev.confidence,
              level_name: getData.confidence.level_name,
              score: getData.confidence.score,
              strength: Array.isArray(getData.confidence.weakness) ? [...getData.confidence.strength] : [],
              weakness: Array.isArray(getData.confidence.weakness) ? [...getData.confidence.weakness] : [],

            }),
            grammar: ({...prev.grammar,
              level_name: getData.grammar.level_name,
              score: getData.grammar.score,
              strength: Array.isArray(getData.grammar.stregnth) ? [...getData.grammar.strength] : [],
              weakness: Array.isArray(getData.grammar.weakness) ? [...getData.grammar.weakness] : [],
            }),
            vocabulary: ({...prev.vocabulary,
              level_name: getData.vocabulary.level_name,
              score: getData.vocabulary.score,
              strength: Array.isArray(getData.vocabulary.strength) ? [...getData.vocabulary.strength] : [],
              weakness: Array.isArray(getData.vocabulary.weakness) ? [...getData.vocabulary.weakness] : [],
            }),
            listening: ({...prev.listening,
              level_name: getData.listening.level_name,
              score: getData.listening.score,
              strength: Array.isArray(getData.listening.strength) ? [...getData.listening.strength] : [],
              weakness: Array.isArray(getData.listening.weakness) ? [...getData.listening.weakness] : [],
            }),
            pronunciation: ({...prev.pronunciation,
              level_name: getData.pronunciation.level_name,
              score: getData.pronunciation.score,
              strength: Array.isArray(getData.pronunciation.strength) ? [...getData.pronunciation.strength] : [],
              weakness: Array.isArray(getData.pronunciation.weakness) ? [...getData.pronunciation.weakness] : []
            }),
          }));
        } else {
          console.log("Error in the backend");
        }

      } catch (error) {
        console.log("Failed to fetch data");
      } finally {
          setLoading(false);
      }
        } 
      
      fetchData();


    } else {
      console.log("State data");
      const userData = location.state.data;
      console.log(userData);
      setData((prev: LevelCheckEntry) =>  ({
        ...prev, 
          id: userData.id,
          student_name: userData.student_name,
          overallCEFR: userData.overallCEFR,
          bookRecommendation: userData.bookRecommendation,
          feedback: userData.feedback,
          dateCreated: userData.dateCreated,
          speaking: ({...prev.speaking,
            level_name: userData.speaking.level_name,
            score: userData.speaking.score,
            strength: userData.speaking.strength,
            weakness: userData.speaking.weakness,
          }),
          confidence: ({...prev.confidence,
            level_name: userData.confidence.level_name,
            score: userData.confidence.score,
            strength: userData.confidence.strength,
            weakness: userData.confidence.weakness,
          }),
          grammar: ({...prev.grammar,
            level_name: userData.grammar.level_name,
            score: userData.grammar.score,
            strength: userData.grammar.strength,
            weakness: userData.grammar.weakness,
          }),
          vocabulary: ({...prev.vocabulary,
            level_name: userData.vocabulary.level_name,
            score: userData.vocabulary.score,
            strength: userData.vocabulary.strength,
            weakness: userData.vocabulary.weakness,
          }),
          listening: ({...prev.listening,
            level_name: userData.listening.level_name,
            score: userData.listening.score,
            strength: userData.listening.strength,
            weakness: userData.listening.weakness,
          }),
          pronunciation: ({...prev.pronunciation,
            level_name: userData.pronunciation.level_name,
            score: userData.pronunciation.score,
            strength: userData.pronunciation.strength,
            weakness: userData.pronunciation.weakness,
          }),
      }));
    }
  },[]);

  useEffect(() => {
    if(isPreparing && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPreparing]);

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

  const handleGeneratePDF = async () => {
    if(!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current, {
      allowTaint: true,
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape","mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgRatio = imgProps.width / imgProps.height;
    let renderWidth = pdfWidth;
    let renderHeight = renderWidth / imgRatio;
    if(renderHeight > pdfHeight){
      renderHeight = pdfHeight
      renderWidth = renderHeight * imgRatio;
    }
    const offsetX = (pdfWidth - renderWidth) / 2;
    const offsetY = (pdfHeight - renderHeight) / 2;

    pdf.addImage(imgData, "PNG", offsetX, offsetY, renderWidth, renderHeight);
    pdf.save(`level-check-${data.student_name}.pdf`);
  }

  !loading && <p>Loading...</p>
  return(
    <> 
      { data ? (
        <>
        <div className="container flex justify-center mt-12 mb-3" id="navigation">
          <Link className="btn btn-primary" to={`/profile`}>Home</Link>
        </div>
          <div className="print-component-landscape" ref={componentRef}>
            <Plot data = {data} />
          </div>
          <div className="w-full flex justify-center mt-6 mb-12 gap-2">
            <Link to={`/levelCheck/${studentId}/edit/${formId}`} className="btn btn-primary mt-3">Edit</Link>
            <button onClick={handleGeneratePDF} className="btn-primary mt-3">Download to PDF</button>
          </div>
        </>
      ) : (
        <>
          <p>Data not found</p>
        </>
      )
    }

    </>
  );
}
const Plot: React.FC<LevelCheckEntry>=({data}) => {
  return(          
    <div className="print-component-landscape px-12" id="print-preview">
        <div className="font-primary container" id="level-check-content">
          <div className="flex w-full justify-between pt-4">
            <div className="ml-[50px] mt-3">
              <p className ="ml-3 text-[14px]"><span className="font-bold">Name: </span>{data.student_name}</p>
              <p className ="ml-3 text-[14px]"><span className="font-bold">Date: </span>{safeFormatISO(data.dateCreated, "MM/dd/yyyy")}</p>
            </div>
              <h1 className="text-center text-lg font-bold mt-6">Oral Assessment Guidelines</h1>
              <img className="mr-[50px]" width={120} height={60} src={"/logo.jpg"} alt = {"Company Logo"} />

          </div>
          <div id="table-container">
            <table className="w-[1026px] mx-auto mt-1 h-[420px] border border-black border-collapse table-auto" id="table-content">
              <colgroup>
                <col className="w-[100px]" />
                <col className="w-[400px]" />
                <col className="w-[400px]" />
                <col className="w-[56px]" />
                <col className="w-[70px]" />
              </colgroup>
              <thead className="text-[15px]">
                <tr className="text-white font-bold text-center h-[30px] bg-teal-600">
                  <td className="border-r border-black">Category</td>
                  <td className="border-r border-black">Strength</td>
                  <td className="border-r border-black">Weakness</td>
                  <td className="text-black border-r border-black bg-orange-300">Score</td>
                  <td className="text-black bg-orange-300">CEFR</td>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {["speaking", "confidence", "grammar", "vocabulary", "pronunciation","listening"].map((item) => {
                  return(
                    <tr key={item} className="h-[72px]">
                      <td className="w-[100px] border-r border-b border-t text-center font-bold capitalize border-black-600 px-1 bg-teal-50">{item}</td>
                      <td className="border-r border-b border-t border-black px-1 bg-white"><ul className="">{data[item].strength.map((list: any, idx: number) => <li className="print-list" key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-t border-black px-1 bg-white"><ul className="">{data[item].weakness.map((list: any, idx: number) => <li className="print-list" key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-t border-black px-1 text-center bg-orange-50 text-[15px]">{data[item].score}</td>   
                      <td className="border-black px-1 border-b border-t text-center bg-orange-50 text-[15px]">{data[item].level_name}</td>                      
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="w-[1026px] mx-auto mt-3 border border-black">
              <div className="font-bold text-white text-[15px] w-full">
                <div className="grid grid-cols-[100px_1fr_125px] w-full justify-self-center border-b border-black">
                  <p className="border-r border-black bg-teal-600 p-1 text-center">Comment</p>
                  <p className="border-r border-black bg-teal-600 p-1"></p>
                  <p className="p-1 bg-orange-300 text-center text-black">Level</p>
                </div>
              </div>
              <div className="text-[15px] bg-white">
                <div className="grid grid-cols-[1fr_125px] h-[150px]">
                  <p className="border-r border-teal-800 flex p-2 text-[15px]">{data.feedback}</p>
                  <div className="grid grid-rows-[1fr_40px_1fr] border-b border-black bg-orange-50 text-[16px]">
                    <p className="text-[15px] text-center self-center">{data.overallCEFR}</p>
                    <p className="p-2 text-[13px] bg-orange-300 border-t border-b border-black-800 font-bold self-center">Book Suggestion</p>
                    <p className="text-[15px] self-center text-center">{data.bookRecommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export {createForm, getForm, deleteForm, LevelCheckEdit, LevelCheckForm, LevelCheckPreview};
