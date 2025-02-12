import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const App = () =>{
    const {language} = useParams();
    useEffect(() =>{
        document.title = `SPR - ${language}`;
    })
    return(
        <div className="content">
            <Link className="btn btn-primary" to={`/spr/${language}/create`}>Create</Link>
        </div>       
    )
}

export default App;