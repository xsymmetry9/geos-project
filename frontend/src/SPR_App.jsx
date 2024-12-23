import React, {useState, useEffect} from "react";
import Student from "./type/student.js";
import Levels from "./type/levels.js";
import Form from "../src/components/Form/Index.jsx"
import { useParams } from "react-router-dom";
import {changeLanguageFormat} from "./utils/changeLanguageFormat.js"

const App = () =>{
    const [language, setLanguage] = useState(changeLanguageFormat(useParams().language));

    const [data, setData] = useState(
        new Student(
            "", //empty name
            "", //empty course
            "", //empty textbook
            0, //empty attedance 
            0, //total attendance
             [new Levels("vocabulary", 1, 2, 3),
               new Levels("grammar", 1, 2, 3),
                new Levels("pronunciation", 1 , 2, 3),
                new Levels("listening", 7, 5, 4),
                new Levels("conversation", 8, 4, 2)],
            ""
        )
    );

    const handleData = (e) =>{
        const {name, value} = e.currentTarget;
        setData({ ...data, [name]: value});

        if(name == "attendance" || name == "totalLessons")
            console.log(value);
    }

    const findIndexCategory = (category) =>{
        switch(category) {
            case "vocabulary":
              return 0
              break;
            case "grammar":
              return 1
              break;
              case "pronunciation":
              return 2
              break;
              case "listening":
              return 3
              break;
              case "conversation":
              return 4
              break;
            default:
              return "error"
          }
    }

    const handleLevelData = (e) =>{
        const {name, value} = e.currentTarget;
        console.log(name);
        console.log(value);

        const parentCategory = name.split('-')[0];
        const childCategory = name.split('-')[1];

        setData(prevData => {
            // Create a deep copy of the `levels` array
            const updatedLevels = [...prevData.levels];
    
            // Get the index of the parent category
            const parentIndex = findIndexCategory(parentCategory);
    
            // Create a new object for the specific level we are updating
            updatedLevels[parentIndex] = {
                ...updatedLevels[parentIndex],
                [childCategory]: value
            };
    
            // Return the updated data state
            return {
                ...prevData,
                levels: updatedLevels
            };
        });
    }

    const languageHandler = (e) =>{
        console.log(e.currentTarget.value);
        setLanguage(e.currentTarget.value);
    }

    useEffect(() =>{
        document.title = `SPR - ${language}`;
    })
    return(
        <div className="content">
            <Form data = {data} handleData = {handleData} handleLevelData= {handleLevelData} language = {language}/>
        </div>       
    )
}

export default App;