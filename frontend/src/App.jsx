import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { createContext, useState} from "react";
import { Outlet } from "react-router-dom";

export const LanguageContext = createContext();

const Layout = () =>{
    const [language, setLanguage] = useState("english"); //Change user's language


    const handler = (e) =>{
        setLanguage(e.currentTarget.value);
    }
    return(
        <LanguageContext.Provider value={{language, setLanguage}}>
            <div className="app-root">
                <Header/>
                    <Outlet />
                <Footer language={language} handler={handler}/> 
            </div>
        </LanguageContext.Provider>

    )

}

export default Layout;
