import { useParams } from "react-router-dom"
import Graph from "./Graph";
import RenderLogo from "./Image/RenderLogo"
import {TitleSPR, StudentInfo, AttendanceInfo} from "./PrintSPR/StudentInfo";
import Table from "./PrintSPR/Table";
import Signature from "./PrintSPR/Signature";
import Comment from "./PrintSPR/Comment";
import PlotCards from "./PrintSPR/PlotCards";
import { useState, useEffect } from "react";
import { getStudentById } from "../utils/functions";

import "../styles/print.scss";


const PrintContent = () =>{
    const {id, language} = useParams();
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
    }, [id]);

    if (loading) {
        return(
            <>
                <h1>Loading ...</h1>
            </>
        )
    }

    return(
        <>
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
                        <Graph data={parsedData} language = {language}/>
                        <Comment comment = {parsedData.feedback} language={language}/>
                        <Signature language ={language} />
                    </div>
                    <PlotCards levels = {parsedData.levels} language={language}/>
                </div>
            </div>
        </>

    )
}

export default PrintContent;