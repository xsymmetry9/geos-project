import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LevelCheckSelect from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";
import "../styles/print.css"
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const LevelCheckForm = () => {
  const initiateForm = new LevelCheckEntry();
  const [inputData, setInputData] = useState<LevelCheckEntry>(initiateForm);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

   useEffect(() =>{
    const getUser = JSON.parse(localStorage.getItem("GEOS_app")) || "{}";
    if(!getUser)
    {
      console.log("Create a new token that stores it at the localStorage");
      return;
    } else {
      getUser.levelCheck.push((inputData)); // Adds new form 
    }

    getUser.levelCheck.forEach((item: any) =>  {
      if(item.id === inputData.id)
      {
        console.log(item);
      }
    })
    
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
    <div className="w-full h-full max-w-[55em] mx-auto border px-3 py-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-secondary text-lg py-3">Oral Assessment Guidelines</h1>
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
  let [inputData, setInputData] = useState(initForm);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
        [name]: value
    }));
  }
  console.log(inputData);

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
        console.log(filtered[0]);

        setInputData(filtered[0]);
   
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
           <label htmlFor="feedback"> Feedback
            <textarea className="block w-full h-[100px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6" 
            name="feedback"  
            onChange={handleChange} 
            id="input-feeback"
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

  console.log(data);

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
            <table className="w-full mt-3 border border-slate-800" id="table-content">
              <thead className="text-[15px]">
                <tr className="">
                  <td className="text-center font-bold border border-slate-800 py-2">Category</td>
                  <td className="text-center font-bold border border-slate-800 py-2">Strength</td>
                  <td className="text-center font-bold border border-slate-800 py-2">Weakness</td>
                  <td className="text-center font-bold border border-slate-800 py-2">Score</td>
                  <td className="text-center font-bold border border-slate-800 py-2">CEFR</td>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {["speaking", "confidence", "grammar", "vocabulary", "pronunciation"].map((item) => {
                  return(
                    <tr key={item}>
                      <td className="text-center capitalize border-r border-b border-black p-2">{item}</td>
                      <td className="border-r border-b border-black p-2"><ul className="list-disc ml-4">{data[item].strength.map((list, idx) => <li key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-black p-2"><ul className="list-disc ml-4">{data[item].weakness.map((list, idx) => <li key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-black p-2 text-center">{data[item].score}</td>   
                      <td className="border-b border-black p-2 text-center">{data[item].level_name}</td>                      
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <table className="w-full mt-3 border border-slate-800">
              <thead className="font-bold text-xs">
                <tr className="border-b border-black">
                  <td className="p-2 text-black">Feedback</td>
                </tr>
              </thead>
              <tbody>
                <tr className="h-[150px]">
                  <td className="flex p-2 text-[13px]">{data.feedback}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}
export {LevelCheckEdit, LevelCheckForm, LevelCheckPreview};
