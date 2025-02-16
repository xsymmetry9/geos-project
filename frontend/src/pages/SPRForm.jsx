import React, {useState} from "react";
import Form from "../components/Form/Form"
import { useParams } from "react-router-dom";
import Student from "../type/student";

const SPRForm = () =>{
    const {language} = useParams();
    
    const [inputData, setInputData] = useState( new Student());

    // Save form data whenever it changes
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
            <Form 
                inputData ={inputData} 
                setInputData={setInputData} 
                language={language} />
        </>
    )
}

export default SPRForm;