import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {LevelCheckSelect, LevelCheckOverall} from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";
import "../styles/print.css"
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const LevelCheckForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const initiateForm = new LevelCheckEntry();
  let params = useParams();
  const [inputData, setInputData] = useState<LevelCheckEntry>(initiateForm);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const studentId = params.id;

   useEffect(() =>{
    setLoading(true);

    const createForm = async () => {
      try{
        const token = localStorage.getItem("token");
        if(!token){
          console.log("token not found, you need to login again.");
          return;
        }
        const res = await axios.post(`http://localhost:8000/api/member/createLevelCheck/${studentId}`,
          {studentId: studentId},
          {headers: { Authorization: `Bearer ${token}`},
        });

      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    }
    // const getUser = JSON.parse(localStorage.getItem("GEOS_app")) || null;
    // if(getUser === null)
    // {
    //   console.log("Create a new token that stores it at the localStorage");
    //   return;
    // } else {
    //   getUser.levelCheck.push((inputData)); // Adds new form 
    // }

    // getUser.levelCheck.forEach((item: any) =>  {
    //   if(item.id === inputData.id)
    //   {
    //     console.log(item);
    //   }
    // })

    if(inputData.id !== "") {
      console.log("Already have an id", inputData.id);
      setLoading(false);
      return;
    }

    createForm();
    
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
        [name]: value
    }));
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
    // if(!getUser) return;

    // const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

    // if(index !== -1){
    //   getUser.levelCheck[index] = inputData;
    // } else {
    //   getUser.levelCheck.push(inputData);
    // }

    // localStorage.setItem("GEOS_app", JSON.stringify(getUser));
    // navigate(`preview/${inputData.id}`, {replace: true, state: {data: inputData}});
    }
  

  if(loading) return <p>Loading...</p>;
  return (
    <div className="font-secondary w-full h-full max-w-[55em] mx-auto shadow-2xl px-3 py-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl py-3">Oral Assessment Guidelines</h1>
        <p>{inputData.id}</p>
      </div>
      <form autoComplete="off">
        <section className="px-3 py-6 border-b-6 border-double border-dark-green">
          <div className="p-1">
            <label htmlFor="student_name"> Student Name:
              <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" name="student_name" id="input-student_name" onChange={handleChange} type="text" />
            </label>
          </div>
          <div className="p-1">
            <label htmlFor="dateCreated"> Date:
              <input type="date" className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" name="dateCreated" id="input-dateCreated" onChange={handleChange}/>
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
           <label htmlFor="feedback"> Feedback
            <textarea className="block w-full h-[400px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6" name="feedback"  onChange={handleChange} id="input-feeback" />
          </label>
        </section>
        <div className="w-full flex justify-center pt-3">
         <button className="btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const LevelCheckEdit = () => {

  const initForm = new LevelCheckEntry();
  let {id, language} = useParams();
  let [inputData, setInputData] = useState<LevelCheckEntry>(initForm);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
        [name]: value
    }));
  }
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
    if(!getUser) return;

    const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

    if(index !== -1){
      getUser.levelCheck[index] = inputData;
    } else {
      getUser.levelCheck.push(inputData);
    }

    localStorage.setItem("GEOS_app", JSON.stringify(getUser));

    navigate(`/levelCheck/${language}/preview/${inputData.id}`, {replace: true, state: {data: inputData}});
    }
 
  useEffect(() => {
    setLoading(true);
    try{
        const data = JSON.parse(localStorage.getItem("GEOS_app"));
        if(!data) {
          console.log("Couldn't find the data on localstorage");
          return;
        }
        const levelCheck = data.levelCheck;
        const filtered = levelCheck.filter((item: any) => item.id === id);
        if(filtered.length === 0){
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
          pronunciation: result.pronunciation
        }));
   
    } catch (error){
          console.log("Error", error);
          return;
    } finally{
          setLoading(false);
        }

  },[]);

  if(loading || inputData === null ){
    return <div>Loading ...</div>
  }

  return(
      <div className="w-full max-w-[55rem] relative bg-white mx-auto">
        {(!loading) && (
          <>
            <div className="flex flex-col justify-center items-center">
          <h1 className="font-secondary font-bold text-lg py-3">Oral Assessment Guidelines</h1>
        </div>
        <form autoComplete="off">
        <section className="px-3 py-6 border-b-6 border-double border-dark-green">
          <div className="p-1">
            <label htmlFor="student_name"> Student Name:
              <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" 
              type="text"
              name="student_name" 
              value={inputData?.student_name || ""}
              id="input-student_name" 
              onChange={handleChange} />
            </label>
          </div>
          <div className="p-1">
            <label htmlFor="dateCreated"> Date:
              <input type="date" value={inputData.dateCreated} className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" name="dateCreated" id="input-dateCreated" onChange={handleChange}/>
            </label>
          </div>
        </section>
        <section className="px-6 py-6 border-b-6 border-double border-dark-green">
        <LevelCheckSelect item="speaking" inputData ={inputData} setInputData={setInputData}  />
        <LevelCheckSelect item="confidence" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="grammar" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="vocabulary" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="pronunciation" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="listening" inputData ={inputData} setInputData={setInputData}/>
        </section>
        <section className="px-6 py-6 border-b-6 border-double border-dark-green" id="input-feedback">
          <label className="font-bold" htmlFor ="bookRecommendation">Book Recommendation:
            <input 
              type="text" 
              name="bookRecommendation" 
              id="bookRecommendation"
              value= {inputData.bookRecommendation}
              onChange={setInputData}
              className="font-normal form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" />
          </label>
          <LevelCheckOverall name="overall level" item="overallLevel" data = {inputData.overallCEFR} handleChange={handleChange}/>
           <label className="font-bold" htmlFor="feedback"> Feedback
            <textarea className="font-normal block w-full h-[100px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6" 
            name="feedback"  
            onChange={handleChange} 
            id="inputFeeback"
            value={inputData.feedback} />
          </label>
        </section>
        <div className="w-full flex justify-center pt-3">
         <button className="btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
          </>
        ) 
        }
        
    </div>
  );
}

const LevelCheckPreview = () => { 
  let params = useParams();
  const [data, setData] = useState<LevelCheckEntry>();
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      let app = JSON.parse(localStorage.getItem("GEOS_app")) || '{}';
      const levelCheckData = app.levelCheck || '[]';

      const index = levelCheckData.findIndex((item: any) => item.id === params.id);
      console.log(index);
      if(index != -1)
      {
        console.log("Data found");
        setData(levelCheckData[index]);
      } else {
        console.log("Data not found");
      }
  },[params.id]);

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
const Plot=({data}) => {
  return(
    <div className="print-component-landscape px-12 py-2" id="print-preview">
        <div className="font-primary container relative" id="level-check-content">
          <div className="flex justify-center flex-col items-center w-[400px] absolute right-[50%] left-[50%] translate-[-50%]">
            <img className="" width={120} height={60} src={"/logo.jpg"} alt = {"Company Logo"} />
            <h1 className="w-full text-center py-2 text-lg font-bold">Oral Assessment Guidelines</h1>
          </div>
          <div className="mt-15">
            <p className ="ml-3 text-[14px]"><span className="font-bold">Name:</span> {data.student_name}</p>
            <p className ="ml-3 text-[14px]"><span className="font-bold">Date:</span> {data.dateCreated}</p>
          </div>
          <div id="table-container">
            <table className="w-full mt-3 border h-[420px] table-auto" id="table-content">
              <thead className="text-[15px]">
                <tr className="">
                  <td className="text-white text-center font-bold border border-teal-800 py-2 bg-teal-600">Category</td>
                  <td className="text-white text-center font-bold border border-teal-800 py-2 bg-teal-600">Strength</td>
                  <td className="text-white text-center font-bold border border-teal-800 py-2 bg-teal-600">Weakness</td>
                  <td className="text-center font-bold border border-orange-800 py-2 bg-orange-300">Score</td>
                  <td className="text-center font-bold border border-orange-800 py-2 bg-orange-300">CEFR</td>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {["speaking", "confidence", "grammar", "vocabulary", "pronunciation"].map((item) => {
                  return(
                    <tr key={item} className="h-[76px]">
                      <td className="text-center font-bold capitalize border-r border-b border-black p-2 bg-teal-50">{item}</td>
                      <td className="border-r border-b border-black p-2 bg-white"><ul className="">{data[item].strength.map((list, idx) => <li className="print-list" key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-black p-2 bg-white"><ul className="">{data[item].weakness.map((list, idx) => <li className="print-list" key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-black p-2 text-center bg-orange-50 text-[15px]">{data[item].score}</td>   
                      <td className="border-b border-black p-2 text-center bg-orange-50 text-[15px]">{data[item].level_name}</td>                      
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="w-full mt-3 border border-teal-800">
              <div className="font-bold text-white text-[15px] w-full">
                <div className="grid grid-cols-[130px_1fr_125px] w-full justify-self-center border-b border-black">
                  <p className="border-r border-teal-800 bg-teal-600 p-2 text-center">Comment</p>
                  <p className="border-r border-teal-800 bg-teal-600 p-2"></p>
                  <p className="p-2 bg-orange-300 text-center text-black">Level</p>
                </div>
              </div>
              <div className="text-[15px] bg-white">
                <div className="grid grid-cols-[1fr_125px] h-[150px]">
                  <p className="border-r border-teal-800 flex p-2 text-[15px]">{data.feedback}</p>
                  <div className="grid grid-rows-3 bg-orange-50 text-[16px]">
                    <p className="text-[15px] p-2 text-center self-center">{data.overallCEFR}</p>
                    <p className="p-2 text-[13px] bg-orange-300 border-t border-b border-teal-800 font-bold self-center">Book Suggestion</p>
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
export {LevelCheckEdit, LevelCheckForm, LevelCheckPreview};
