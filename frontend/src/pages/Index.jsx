import Form from "../components/Form/Index";

const App = ({data, handleData, language}) =>{
    return(
        <>
            <Form data = {data} handleData = {handleData} language = {language}/>
        </>
    )

}

export default App;