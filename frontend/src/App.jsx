import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createContext, useState} from "react";
import { Outlet } from "react-router-dom";
import "./styles/index.scss";

export const LanguageContext = createContext();

const Layout = () =>{
    const [language, setLanguage] = useState("english"); //Change user's language

    const handler = (e) =>{
        setLanguage(e.currentTarget.value);
    }
    return(
        <LanguageContext.Provider value={{language, setLanguage}}>
            <div className="app-root relative">
                <Header/>
                    <div className="content">
                        <Outlet />
                    </div>
                <Footer language={language} handler={handler}/> 
            </div>
        </LanguageContext.Provider>

    )

}

export default Layout;
