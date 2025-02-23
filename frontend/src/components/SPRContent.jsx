import { useParams } from "react-router-dom"
import Graph from "../components/Graph";
import "../styles/print.scss";
import RenderLogo from "../components/Image/RenderLogo"
import {TitleSPR, StudentInfo, AttendanceInfo} from "../components/PrintSPR/StudentInfo";
import Table from "../components/PrintSPR/Table";
import Signature from "../components/PrintSPR/Signature";
import Comment from "../components/PrintSPR/Comment";
import PlotCards from "../components/PrintSPR/PlotCards";
import { useState, useEffect } from "react";
import { getStudentById } from "../utils/functions";

const SPRContent = () =>{
    const {id} = useParams();
    const [parsedData, setParsedData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const fetchUser = () =>{
            const data = getStudentById(id);
            if (data != null) {
                setParsedData(data);
            } else {
                console.log("data not found");
            }
            setLoading(false);
        }

        fetchUser();
    }, [])
    const language = "english";
    if (loading) {
        return(
            <>
                <h1>Loading ...</h1>
            </>
        )
    }

    return(
        <div className="papersize-A4">
            <div className='title-container'>
                <div className='img-container'>
                    <RenderLogo style ="logoName" description="logo"/>
                    <TitleSPR language ={language} />
                </div>
            </div>
            <div className="even-columns">
                <StudentInfo name = {parsedData.name} textbook ={parsedData.textbook} course={parsedData.course} language={language} />
                <AttendanceInfo attendance = {parsedData.attendance} totalLessons={parsedData.totalLessons} language ={language} />
            </div>
            <Table levels = {parsedData.levels} language={language}/>
            <div className="graph-levelInfo">
                <div className="comment-signature-container">
                    {/* <Graph data={parsedData} language = {language}/> */}
                    <Comment comment = {parsedData.feedback} language={language}/>
                    <Signature language ={language} />
                </div>
                {/* <PlotCards levels = {levels} language={language}/> */}
            </div>
        </div>
    )
}

export default SPRContent;