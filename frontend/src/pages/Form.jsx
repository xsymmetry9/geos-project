import Form from "../components/Form/Index";

const App = ({data, handleData, handleLevelData, language}) =>{
    return(
        <>
            <Form data = {data} handleData = {handleData} handleLevelData = {handleLevelData} language = {language}/>
        </>
    )

}

export default App;