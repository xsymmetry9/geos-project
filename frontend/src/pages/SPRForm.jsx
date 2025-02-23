import React, {createContext} from "react";
import Form from "../components/Form/Form"
import { useParams } from "react-router-dom";

export const LanguageContext = createContext();

const SPRForm = () =>{
    const {language} = useParams();
    
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
   
        <LanguageContext.Provider value ={language}>
            <Form />
        </LanguageContext.Provider>

    )
}

export default SPRForm;