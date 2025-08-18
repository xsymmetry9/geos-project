import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {LevelCheckSelect, LevelCheckOverall} from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";
import "../styles/print.css"
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";

interface FormProps {
  inputData: LevelCheckEntry,
  setInputData: React.Dispatch<React.SetStateAction<LevelCheckEntry>>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Form: React.FC<FormProps> = ({inputData, setInputData, handleChange, handleSubmit}) => {
  return(
     <div className="w-full h-full max-w-[55em] mx-auto border px-3 py-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-secondary text-lg py-3">Oral Assessment Guidelines</h1>
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
                value={inputData.dateCreated} 
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
  const initiateForm = new LevelCheckEntry();
  const [inputData, setInputData] = useState<LevelCheckEntry>(initiateForm);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

   useEffect(() =>{
    setLoading(true);

    const getUser = () => {
      const raw = localStorage.getItem("GEOS_app");
      const result = raw ? JSON.parse(raw) : null;

      if(result === null) return;
      return result;
    }
    const user = getUser();
    if(user !== null)
    {
        user.levelCheck.push((inputData)); // Adds new form 
        setLoading(false);
      // Creates new user
    } else {
      console.log("It' wasn't loaded well");

    }

    // getUser.levelCheck.forEach((item: any) =>  {
    //   if(item.id === inputData.id)
    //   {
    //     console.log(item);
    //   }
    // })
    
  }, []);

  !loading && <p>Loading ...</p>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
        [name]: value
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    navigate(`preview/${inputData.id}`, {replace: true, state: {data: inputData}});
    }
  

  return (
    <>
      <Form inputData={inputData} setInputData={setInputData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
};

const LevelCheckEdit = () => {

  const initForm = new LevelCheckEntry();
  let {id, language} = useParams();
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
        const raw = localStorage.getItem("GEOS_app");
        const data = raw ? JSON.parse(raw) : null;        
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
     <>
        {(!loading) && (
          <Form inputData={inputData} setInputData={setInputData} handleChange={handleChange} handleSubmit={handleSubmit} />
           ) 
        }
    </>
  );
}

const LevelCheckPreview = () => { 
  let params = useParams();
  const [data, setData] = useState<LevelCheckEntry>();
  const componentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<null | (() => void)>(null);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

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

  const reactToPrintContent = useCallback(() => componentRef.current, []);

  const handlePrint = async () => useReactToPrint({
    content: useReactToPrint,
    documentTitle: "Level Check Report",
    removeAfterPrint: true,
    pageStyle:`
    @page {size: A4 landscape;}
    @media print {
    #navigation, #actions {display: none !important}
    html, body {-webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    `,
    onBeforePrint: () => 
      new Promise<void>((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
      onAfterPrint: () => {
        promiseResolveRef.current = null;
        setIsPrinting(false);
      }
  });


  useEffect(() => {
    if(isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

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
            <button className="btn-primary mt-3" onClick = {() => handlePrint(reactToPrintContent)}>Print</button>
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
              <p className ="ml-3 text-[14px]"><span className="font-bold">Date: </span>{format(data.dateCreated, "MM/dd/yyyy")}</p>
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
export {LevelCheckEdit, LevelCheckForm, LevelCheckPreview};
