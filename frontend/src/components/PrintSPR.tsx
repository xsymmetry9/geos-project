import { useState, useEffect, useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { Link, useParams } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import axios from "axios";
import { PrintContent } from "./PrintStudentProgressReport";
import { StudentProgressReportEntry, Levels } from "@/type/StudentProgressReportEntry";
import API_BASE_URL from "@/api/axiosInstance";

import "../styles/print.css";
const PrintPage = () => {
  const initialStudent = new StudentProgressReportEntry();
  const [fetchData, setFetchData] = useState<StudentProgressReportEntry>(initialStudent);
  const { formId: formId } = useParams<{ formId: string; }>();
  const componentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<null | (() => void)>(null);
  const [loading, setLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const fetchSPR = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token. Please log in.");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/member/getSPR/${formId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        if (data) {
          setFetchData(prev => ({
            ...prev,
            formId: data.id,
            name: data.studentName,
            course: data.course,
            feedback: data.feedback,
            language: data.language,
            textbook: data.textbook,
            dateCreated: new Date(data.dateCreated),
            attendance: data.attendance,
            totalLessons: data.totalLessons,
            teacherEmail: data.teacherEmail,
            studentId: data.studentId,
            levels: {
              vocabulary: new Levels(data.vocabularyInitial, data.vocabularyTarget, data.vocabularyFinal),
              pronunciation: new Levels(data.pronunciationInitial, data.pronunciationTarget, data.pronunciationFinal),
              grammar: new Levels(data.grammarInitial, data.grammarTarget, data.grammarFinal),
              conversation: new Levels(data.speakingInitial, data.speakingTarget, data.speakingFinal),
              listening: new Levels(data.listeningInitial, data.listeningTarget, data.listeningFinal),
            },
          }));
        } else {
          console.warn("No data found");
        }
      } catch (error) {
        console.log("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchSPR();
  }, [formId]);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const reactToPrintContent = useCallback(() => componentRef.current, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Student Progress Report",
    onBeforePrint: () =>
      new Promise<void>(resolve => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  const handleGeneratePDF = async () => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current, {
      allowTaint: true,
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = pdfWidth / (imgProps.width / imgProps.height);

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save(`student-report-${formId}.pdf`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-center pb-3">
        <Link className="btn-primary" to={`/profile/viewStudent/${fetchData.studentId}`}>
          Dashboard
        </Link>
      </div>
      {fetchData.formId === "" && <Link to={`/`}>Please go back</Link>}
      {fetchData.formId !== "" && ( <div className="mx-auto overflow-auto">
        <div id={`print-${fetchData.language}`} className="shadow-lg print-component" ref={componentRef}>
          <PrintContent data={fetchData} />
        </div>
      </div>) }
      <div className="flex justify-center pt-3 gap-3">
        <button className="btn btn-primary print w-[150px]" onClick={handlePrint}>
          Print
        </button>
        <button className="btn btn-primary print" onClick={handleGeneratePDF}>
          Save as PDF
        </button>
      </div>
    </>
  );
};

export default PrintPage;
