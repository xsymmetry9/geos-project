<<<<<<< HEAD
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
=======
import { useState } from "react";
import geosImg from "/logo.jpg";
import { Menu, X } from "lucide-react"; // `lucide-react` for modern icons

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-[1100px] w-full mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img className="w-20 h-auto" src={geosImg} alt="Geos logo" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a
            href="/language"
            className="hover:text-blue-600 transition duration-200"
          >
            Language
          </a>
        </nav>

        {/* Mobile Burger Icon */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <a
            href="/language"
            className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition duration-200"
          >
            Language
          </a>
        </div>
      )}
    </header>
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
  );
};

export default Header;
