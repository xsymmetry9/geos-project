import React from "react";
import geosImg from "/logo.jpg";

const Header = () => {
  return (
    <>
      <header>
        <div className="shadow-[1px_1px_2px_2px_rgba(131,121,121,0.3)] flex items-center text-base font-sans">
          <div className="max-w-[1100px] w-full p-2 flex justify-between items-center mx-auto">
            <a href="/">
              <img className="w-20 h-auto" src={geosImg} alt="Geos logo" />
            </a>
          </div>
          <nav className="navigation-root"></nav>
        </div>
      </header>
    </>
  );
};

export default Header;
