import { useParams } from "react-router-dom"
import Graph from "../components/Graph";
import "../styles/print.scss";
import RenderLogo from "../components/Image/RenderLogo"
import {TitleSPR, StudentInfo, AttendanceInfo} from "../components/PrintSPR/StudentInfo";
import Table from "../components/PrintSPR/Table";
import Signature from "../components/PrintSPR/Signature";
import Comment from "../components/PrintSPR/Comment";
import PlotCards from "../components/PrintSPR/PlotCards";

const SPRContent = ({parsedData}) =>{
    const {language} = useParams();
   
    const {name, course, textbook, attendance, totalLessons, levels, comment} = parsedData;
    return(
        <div className="papersize-A4">
            <div className='title-container'>
                <div className='img-container'>
                    <RenderLogo style ="logoName" description="logo"/>
                    <TitleSPR language ={language} />
                </div>
            </div>
            <div className="even-columns">
                <StudentInfo name = {name} textbook ={textbook} course={course} language={language} />
                <AttendanceInfo attendance = {attendance} totalLessons={totalLessons} language ={language} />
            </div>
            <Table levels = {levels} language={language}/>
            <div className="graph-levelInfo">
                <div className="comment-signature-container">
                    <Graph data={parsedData} language = {language}/>
                    <Comment comment = {comment} language={language}/>
                    <Signature language ={language} />
                </div>
                <PlotCards levels = {levels} language={language}/>
            </div>
        </div>
    )
}

export default SPRContent;