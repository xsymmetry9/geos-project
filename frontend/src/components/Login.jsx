const Login = ({language}) =>{
    const title = {
        "English": "Student Progress Report",
        "Chinese": "学生进度报告",
        "Korean": "학생 진행 보고서 ",
        "Japanese": "学生進捗報告"
    }
    return (
        <>
            <h1>{title[language]}</h1>
        </>
    )
}

export default Login;