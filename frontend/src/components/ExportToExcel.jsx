import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = ({userData}) =>{
    const test = () =>{
        if(!userData || !userData.SPR || userData.SPR.length === 0) {
            alert("No data available to export.");
            return;
        }
        const dataToExport = userData.SPR.map((item) =>({
            id: item.id,
            Name: item.name,
            Date: item.dateCreated,
            Course: item.course,
            Textbook: item.textbook,
            Attedance: item.attedance,
            TotalLessons: item.TotalLessons,
            Vocabulary: item.levels.vocabulary,
            Pronunciation: item.levels.pronunciation,
            Grammar: item.levels.grammar,
            Listening: item.levels.listening,
            Conversation: item.levels.conversation,
            Feedback: item.feedback,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Teacher's data");

        const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
        const data = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

        saveAs(data, "Teacher's backup data");

        alert("Coming soon");
    }
    return(
        <>
            <button className="btn-primary" onClick={test}>to Excel</button>
        </>
    )
}

export default ExportToExcel;