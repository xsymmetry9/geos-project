const Login = ({language}) =>{
    const title = {
        "English": "This is a title",
        "Chinese": "This is a tilte in Chinese",
        "Korean": "this is a title in Korean",
        "Japanese": "this is a title in Japanese"
    }
    return (
        <>
            <h1>{title[language]}</h1>
        </>
    )
}

export default Login;