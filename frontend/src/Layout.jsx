import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import "./styles/index.scss";

export const LanguageContext = createContext();

const Layout = () => {
  return (
    <div className="relative grid h-screen grid-rows-[70px_auto_90px] grid-cols-1">
      <Header />
      <div className="relative mx-auto my-12 w-full max-w-[1100]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
