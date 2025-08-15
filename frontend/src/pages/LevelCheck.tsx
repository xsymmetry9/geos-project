import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {LevelCheckSelect, LevelCheckOverall} from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";
import "../styles/print.css"
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { format, parseISO } from "date-fns";
import { safeFormatISO } from "@/utils/functions";

const createForm = async (studentId: string) => {
  try{
    const token = localStorage.getItem("token");
    if(!token){
      console.log("token not found, you need to login again.");
      return;
    }
    const res = await axios.post(`http://localhost:8000/api/member/createLevelCheck/${studentId}`,
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

interface FormProps {
  inputData: LevelCheckEntry,
  setInputData: React.Dispatch<React.SetStateAction<LevelCheckEntry>>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({inputData, setInputData, handleChange, handleSubmit}) => {
  return(
     <div className="w-full h-full bg-white max-w-[55em] mx-auto px-3 py-6 shadow-lg">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl py-3">Oral Assessment Guidelines</h1>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <section className="px-3 py-6 border-b-6 border-double border-dark-green">
          <div className="p-1">
            <label htmlFor="student_name"> Student Name:
              <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" 
                name="student_name" 
                id="input-student_name" 
                onChange={handleChange} 
                value={inputData.student_name}
                type="text" />
            </label>
          </div>
          <div className="p-1">
            <label htmlFor="dateCreated"> Date:
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
        <section className="px-3 py-6 border-b-6 border-double border-dark-green">
        <LevelCheckSelect item="speaking" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="confidence" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="grammar" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="vocabulary" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="pronunciation" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="listening" inputData ={inputData} setInputData={setInputData} />
        </section>
        <section className="px-3 py-6 border-b-6 border-double border-dark-green" id="input-feedback">
           <label className="font-bold" htmlFor ="bookRecommendation">Book Recommendation:
            <input 
              type="text" 
              name="bookRecommendation" 
              id="bookRecommendation"
              value={inputData.bookRecommendation}
              onChange={handleChange}
              className="font-normal form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" />
          </label>
          <LevelCheckOverall name="overall level" item="overallLevel" data={inputData.overallCEFR} handleChange={handleChange}/>
           <label htmlFor="feedback">Overall Level
            <textarea 
              className="block w-full h-[400px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6" 
              name="feedback"  
              onChange={handleChange} 
              id="input-feeback" 
              value={inputData.feedback}/>
          </label>
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

        const res = await axios.get(`http://localhost:8000/api/member/getLevelCheckForm/${formId}`,
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
        console.log(inputData);
      const token = localStorage.getItem("token");
        if(!token){
          console.log("token not found, you need to login again.");
          return;
        }

      const result = await axios.put("http://localhost:8000/api/member/updateLevelCheck", 
        { data: inputData},
        { headers: {Authorization: `Bearer ${token}`},
      });
      console.log(result);

      if(result.status === 200)
      {
        navigate(`/levelCheck/english/preview/${inputData.id}`, {replace: true, state: {data: inputData}});

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
  let {formId} = useParams();
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

      const result = await axios.put("http://localhost:8000/api/member/updateLevelCheck", 
        { data: inputData},
        { headers: {Authorization: `Bearer ${token}`},
      });
      console.log(result);

      if(result.status === 200)
      {
        navigate(`/levelCheck/english/preview/${inputData.id}`, {replace: true, state: {data: inputData}});

      }
    } catch (error) {
      console.log(error);
      return;
      }

    }
    updateForm();

    navigate(`/levelCheck/english/preview/${inputData.id}`, {replace: true, state: {data: inputData}});
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
          setInputData((prev) => ({
            ...prev,
            id: data.id,
            dateCreated: data.createdAt,
            student_name: data.name,
            feedback: data.feedback,
            bookRecommendation: data.bookRecommendation,
            overallCEFR: data.overallCEFR,
            speaking: ({...prev.speaking,
              level_name: data.speakingNameEntry,
              score: data.speakingScore
            }),
            confidence: ({...prev.confidence,
              level_name: data.speakingNameEntry,
              score: data.speakingScore
            }),
            grammar: ({...prev.grammar,
              level_name: data.speakingNameEntry,
              score: data.speakingScore
            }),
            vocabulary: ({...prev.vocabulary,
              level_name: data.speakingNameEntry,
              score: data.speakingScore
            }),
            listening: ({...prev.listening,
              level_name: data.speakingNameEntry,
              score: data.speakingScore
            }),
            pronunciation: ({...prev.pronunciation,
              level_name: data.speakingNameEntry,
              score: data.speakingScore
            }),
            

        }));

        console.log(data);
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
  },[]);

  if(loading) return <p>Loading...</p>;
  
  return (
    <>
      <Form inputData={inputData} setInputData={setInputData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>)
}

const LevelCheckPreview = () => { 
  let params = useParams();
  let location = useLocation();
  const initData = new LevelCheckEntry();
  const [data, setData] = useState<LevelCheckEntry>(initData);
  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setLoading(true);

    if(location.state === null){
      const fetchData = async () =>{
        const formId = params.formId;
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
          const getData = result.data.data;
          console.log("Fetching data:", getData);

          setData((prev: LevelCheckEntry) => ({
            ...prev,
            id: getData.id,
            dateCreated: getData.createdAt ?? "",
            student_name: getData.name ?? "",
            feedback: getData.feedback ?? "",
            bookRecommendation: getData.bookRecommendation ?? "",
            overallCEFR: getData.overallCEFR ?? "",
            speaking: ({...prev.speaking,
              level_name: getData.speakingNameEntry,
              score: getData.speakingScore
            }),
            confidence: ({...prev.confidence,
              level_name: getData.confidenceNameEntry,
              score: getData.confidenceScore
            }),
            grammar: ({...prev.grammar,
              level_name: getData.grammarNameEntry,
              score: getData.grammarScore
            }),
            vocabulary: ({...prev.vocabulary,
              level_name: getData.vocabularyNameEntry,
              score: getData.vocabularyScore
            }),
            listening: ({...prev.listening,
              level_name: getData.listeningNameEntry,
              score: getData.listeningScore
            }),
            pronunciation: ({...prev.pronunciation,
              level_name: getData.pronunciationNameEntry,
              score: getData.pronunciationScore
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
            score: userData.speaking.score
          }),
          confidence: ({...prev.confidence,
            level_name: userData.confidence.level_name,
            score: userData.confidence.score
          }),
          grammar: ({...prev.grammar,
            level_name: userData.grammar.level_name,
            score: userData.grammar.score
          }),
          vocabulary: ({...prev.vocabulary,
            level_name: userData.vocabulary.level_name,
            score: userData.vocabulary.score
          }),
          listening: ({...prev.listening,
            level_name: userData.listening.level_name,
            score: userData.listening.score
          }),
          pronunciation: ({...prev.pronunciation,
            level_name: userData.pronunciation.level_name,
            score: userData.pronunciation.score
          }),
      }));
    }
  },[]);

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
    const imgHeight = pdfWidth / imgRatio;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save(`level-check-${data.student_name}.pdf`);
  }

  !loading && <p>Loading...</p>
  return(
    <> 
      { data ? (
        <>
        <div className="container flex justify-center mb-3" id="navigation">
          <Link className="btn btn-primary" to={`/home/${params.language}`}>Home</Link>
        </div>
          <div ref={componentRef}>
            <Plot data = {data} />
          </div>
          <div className="w-full flex justify-center gap-2">
            <Link to={`/levelCheck/${params.language}/edit/${params.id}`} className="btn btn-primary mt-3">Edit</Link>
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
            <div className="mt-3">
              <p className ="ml-3 text-[14px]"><span className="font-bold">Name: </span>{data.student_name}</p>
              <p className ="ml-3 text-[14px]"><span className="font-bold">Date: </span>{safeFormatISO(data.dateCreated, "MM/dd/yyyy")}</p>
            </div>
              <h1 className="text-center text-lg font-bold mt-6">Oral Assessment Guidelines</h1>
              <img className="" width={120} height={60} src={"/logo.jpg"} alt = {"Company Logo"} />

          </div>
          <div id="table-container">
            <table className="w-full mt-1 h-[420px] border border-black border-collapse table-auto" id="table-content">
              <thead className="text-[15px]">
                <tr>
                  <td className="text-white text-center border-r border-black font-bold py-1 bg-teal-600">Category</td>
                  <td className="text-white text-center border-r border-black font-bold py-1 bg-teal-600">Strength</td>
                  <td className="text-white text-center border-r border-black font-bold py-1 bg-teal-600">Weakness</td>
                  <td className="text-center font-bold border-r border-black py-1 bg-orange-300">Score</td>
                  <td className="text-center font-bold py-1 bg-orange-300">CEFR</td>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {["speaking", "confidence", "grammar", "vocabulary", "pronunciation","listening"].map((item) => {
                  return(
                    <tr key={item} className="h-[72px]">
                      <td className="border-r border-b border-t text-center font-bold capitalize border-black-600 px-1 bg-teal-50">{item}</td>
                      <td className="border-r border-b border-t border-black px-1 bg-white"><ul className="">{data[item].strength.map((list: any, idx: number) => <li className="print-list" key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-t border-black px-1 bg-white"><ul className="">{data[item].weakness.map((list: any, idx: number) => <li className="print-list" key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-t border-black px-1 text-center bg-orange-50 text-[15px]">{data[item].score}</td>   
                      <td className="border-black px-1 border-b border-t text-center bg-orange-50 text-[15px]">{data[item].level_name}</td>                      
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="w-full mt-3 border border-black">
              <div className="font-bold text-white text-[15px] w-full">
                <div className="grid grid-cols-[130px_1fr_125px] w-full justify-self-center border-b border-black">
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
export {createForm, LevelCheckEdit, LevelCheckForm, LevelCheckPreview};
