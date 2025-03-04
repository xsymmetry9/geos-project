import React, { createContext} from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles/index.scss";

export const LanguageContext = createContext();

const Layout = () =>{
  return(
    <div className="app-root relative">
      <Header/>
      <div className="content">
        <Outlet />
      </div>
      <Footer/> 
    </div>
  );

};

export default Layout;
