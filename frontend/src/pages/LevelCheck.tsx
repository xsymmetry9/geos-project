import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LevelCheckSelect from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";
import "../styles/print.css"

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

    getUser.levelCheck.forEach((item) =>  {
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

    const index = getUser.levelCheck.findIndex((item) => item.id === inputData.id);

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
        <section>
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
        <section>
        <LevelCheckSelect item="speaking" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="confidence" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="grammar" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="vocabulary" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="pronunciation" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="listening" inputData ={inputData} setInputData={setInputData} />
        </section>
        <section id="input-feedback">
           <label htmlFor="feedback"> Feedback
            <textarea className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6" name="feedback"  onChange={handleChange} id="input-feeback" />
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

const LevelCheckPreview = () => { 
  let params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
      let app = JSON.parse(localStorage.getItem("GEOS_app")) || '{}';
      const levelCheckData = app.levelCheck || '[]';

      const index = levelCheckData.findIndex((item) => item.id === params.id);
      console.log(index);
      if(index != -1)
      {
        console.log("Data found");
        setData(levelCheckData[index]);
      } else {
        console.log("Data not found");
      }


  },[params.id]);

  console.log(data);


  return(
    <> 
      { data ? (
        <>
          <Plot data = {data} />
          <div className="w-full flex justify-center">
            <button className="btn-primary mt-3">Download to PDF</button>
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
    <div className="print-component-landscape px-5 py-2" id="print-preview">
        <div className="font-primary container relative" id="level-check-content">
          <div className="flex justify-center flex-col items-center w-[400px] absolute right-[50%] left-[50%] translate-[-50%]">
            <img className="" width={120} height={60} src={"/logo.jpg"} alt = {"Company Logo"} />
            <h1 className="w-full text-center py-2 text-lg font-bold">Oral Assessment Guidelines</h1>
          </div>
          <div className="mt-15">
            <p className>Name: {data.student_name}</p>
            <p className>Date: {data.dateCreated}</p>
          </div>
          <div id="table-container">
            <table className="w-full mt-3 border border-slate-500 text-sm" id="table-content">
              <thead>
                <tr className="">
                  <td className="text-center font-bold border border-slate-500 py-2">Category</td>
                  <td className="text-center font-bold border border-slate-500 py-2">Strength</td>
                  <td className="text-center font-bold border border-slate-500 py-2">Weakness</td>
                  <td className="text-center font-bold border border-slate-500 py-2">Score</td>
                  <td className="text-center font-bold border border-slate-500 py-2">CEFR</td>
                </tr>
              </thead>
              <tbody>
                {["speaking", "confidence", "grammar", "vocabulary", "pronunciation"].map((item) => {
                  return(
                    <tr key={item}>
                      <td className="text-center capitalize border-r border-b border-slate-500 p-2">{item}</td>
                      <td className="border-r border-b border-slate-500 p-2"><ul>{data[item].strength.map((list, idx) => <li key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-slate-500 p-2"><ul>{data[item].weakness.map((list, idx) => <li key={idx}>{list}</li>)}</ul></td>
                      <td className="border-r border-b border-slate-500 p-2">{data[item].level_name}</td>   
                      <td className="border-b border-slate-500 p-2">{data[item].level_name}</td>                      
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="mt-3 w-full h-[200px] border border-slate-500">
              <h2>Feedback</h2>
            <div>{data.feedback}</div>
            </div>

          </div>

        </div>

      </div>
  )
}
export {LevelCheckForm, LevelCheckPreview};
