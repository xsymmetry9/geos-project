// import "../styles/components/footer.scss";
import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center bg-[#00646c] text-white font-primary text-base font-normal">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm">&copy; GEOS Online Language Academy All Rights Reserved.</p>
        <p className="text-sm">Created by Gary - {date}</p>
      </div>
    </footer>
  );
};

export default Footer;
