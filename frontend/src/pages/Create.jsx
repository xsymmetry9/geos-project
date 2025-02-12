import React, {useEffect, useState} from "react";
import Student from "../type/student";
import Levels from "../type/levels";
import SPR_Form from "../components/Form/SPR_FORM"
import { useParams } from "react-router-dom";

const Create = () =>{
    const {language} = useParams();
    const [formData, setFormData] = useState(() =>{
        // Load the form data from Local Storage if it exists
        const savedData = localStorage.getItem('SPR_Form');
        return savedData ? JSON.parse(savedData) : new Student (
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
    });

    // Save form data whenever it changes
    useEffect(() =>{
        localStorage.setItem('SPR_Form', JSON.stringify(formData));

    }, [formData]);

    const handleFormData = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));

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

    const handleFormLevelData = (e) =>{
        const {name, value} = e.currentTarget;

        const parentCategory = name.split('-')[0];
        const childCategory = name.split('-')[1];

        setFormData(prevFormData => {
            // Create a deep copy of the `levels` array
            const updatedLevels = [...prevFormData.levels];
    
            // Get the index of the parent category
            const parentIndex = findIndexCategory(parentCategory);
    
            // Create a new object for the specific level we are updating
            updatedLevels[parentIndex] = {
                ...updatedLevels[parentIndex],
                [childCategory]: value
            };
    
            // Return the updated data state
            return {
                ...prevFormData,
                levels: updatedLevels
            };
        });
    }

    return(
        <>
            <SPR_Form 
                data = {formData}
                handleData = {handleFormData}
                handleLevelData = {handleFormLevelData}
                language = {language}/>
        </>
    )
}

export default Create;