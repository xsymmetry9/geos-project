
import { useState } from 'react';
import {read, utils} from 'xlsx'
import Student from "../type/Student";

const ImportFromExcel = ({setUserData}) =>{
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (e) =>{
        const file = e.target.files[0];
        if(!file){
            return;
        }

        setFileName(file.name);
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const data = new Uint8Array(arrayBuffer);
            const workbook = read(data, {type: "array"});
            
            const sheetname = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetname];

            const jsonData = utils.sheet_to_json(worksheet);

            const parsedStudents = jsonData.map((row) => {
                const student = new Student(row.id);
                student.name = row.name || "";
                student.course = row.course || "";
                student.textbook = row.textbook || "";
                student.attendance = row.attendance || 0;
                student.totalLessons = row.totalLessons || 0;
                student.feedback = row.feedback || 0;

                student.levels = {
                    vocabulary: new Levels(row.vocab_initial, row.vocab_target, row.vocab_final),
                    pronunciation: new Levels(row.pron_initial, row.pron_target, row.pron_final),
                    grammar: new Levels(row.gram_initial, row.gram_target, row.gram_final),
                    listening: new Levels(row.listen_initial, row.listen_target, row.listen_final),
                    conversation: new Levels(row.conv_initial, row.conv_target, row.conv_final),
                }
                return student;
            })
            
            console.log(parsedStudents);
        }
    }

    return(
        <>
           <div>
                <input type='file' accept='.xlsx, .xls' onChange={handleFileUpload} />{fileName && <p>Uploaded: {fileName}</p>}
           </div>
        </>
    )
}

export default ImportFromExcel;
