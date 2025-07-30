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
          {/* <a
            href="/language"
            className="hover:text-blue-600 transition duration-200"
          >
            Language
          </a> */}
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
  );
};

export default Header;
