import { useParams } from "react-router-dom"
import Graph from "../components/Graph";
import "../styles/print.scss";
import RenderLogo from "../components/Image/RenderLogo"
import Table from "../components/Table";
import {format} from "date-fns";

const Preview = () =>{
    const parsedData = JSON.parse(localStorage.getItem("SPR_Form"));
    const {name, course, textbook, attendance, totalLessons, levels} = parsedData;
    const {language} = useParams();
    return(
        <div className="papersize-A4">
            <div className='title-container'>
                <div className='img-container'>
                    <RenderLogo style ="logoName" description="logo"/>
                    <h1>Student Progress Report</h1>
                </div>
            </div>
            <div className="even-columns">
                <div className="info-container">
                    <div className="pring-name"><p>Student's Name: <strong>{name}</strong></p></div>
                    <p>Course: {course}</p>
                    <p>Textbook: {textbook}</p>
                </div>
                <div className="info-container">
                    <div className='two-columns-container'>
                        <p className='personalInformation-title'>Date: </p>
                        <p className='personalInformation-description justify-end'>{format(new Date(), "MM/dd/yyyy")}</p>
                    </div>
                    <div className='two-columns-container'>
                        <p className='personalInformation-title'>Attendance: </p>
                        <p className='personalInformation-description justify-end'>{attendance} times</p>
                    </div>
                    <div className='two-columns-container'>
                        <p className='personalInformation-title'>Total Lessons: </p>
                        <p className='personalInformation-description justify-end'>{totalLessons} times</p>
                    </div>
                    <div className='two-columns-container'>
                        <p className='personalInformation-title'>% of Attendance: </p>
                        <p className='personalInformation-description justify-end'>{parseFloat(attendance / totalLessons * 100).toFixed(2)}%</p>
                    </div>
                </div>
            </div>
            <Table levels = {levels}/>
            <Graph data={parsedData} />

        </div>
    )
}

export default Preview;