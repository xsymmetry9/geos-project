<<<<<<< HEAD
// import "../styles/components/footer.scss";
import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center bg-[#00646c] text-white font-primary text-base font-normal">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm">&copy; GEOS Online Language Academy All Rights Reserved.</p>
        <p className="text-sm">Created by Gary - {date}</p>
=======
const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#00646c] text-white font-primary text-sm py-4">
      <div className="max-w-[1100px] mx-auto px-4 flex flex-col items-center gap-1 text-center">
        <p>&copy; GEOS Online Language Academy. All Rights Reserved.</p>
        <p>Created by Gary – {date}</p>
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
      </div>
    </footer>
  );
};

export default Footer;
