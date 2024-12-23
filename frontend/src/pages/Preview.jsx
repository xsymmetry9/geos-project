import { useParams } from "react-router-dom"

const Preview = () =>{
    const {language} = useParams();
    return(
        <>
            <h1>This is a preview page.</h1>
            <p>{language}</p>
        </>
    )
}

export default Preview;