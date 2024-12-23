import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () =>{
    const [language, setLanguage] = useState("english");

    const handler = (e) =>{
        console.log(e.currentTarget.value);
        setLanguage(e.currentTarget.value);
    }
    return(
        <>
            <div className="app-root">
                <Header language={language} handler={handler}/>
                <Outlet />

                <Footer language={language} handler={handler}/> 
            </div>
        </>

    )

}

export default Layout;
