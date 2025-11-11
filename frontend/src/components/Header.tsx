import { useState } from "react";
import { Link } from "react-router-dom";
import geosImg from "/logo.jpg";
import { Menu, X } from "lucide-react"; // `lucide-react` for modern icons

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img className="h-auto w-20" src={geosImg} alt="GEOS-logo" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 font-medium text-gray-700 md:flex">
          <Link to={"/"}>Home</Link>
          <Link to={"/levels"}>Levels</Link>
          <a href="/language" className="transition duration-200 hover:text-blue-600">
            Language
          </a>
        </nav>

        {/* Mobile Burger Icon */}
        <button
          className="text-gray-700 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-white px-4 pb-4 md:hidden" onClick={() => setMenuOpen(false)}>
          <Link
            to={"/"}
            className="block py-2 font-medium text-gray-700 transition duration-200 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to={"/language"}
            className="block py-2 font-medium text-gray-700 transition duration-200 hover:text-blue-600"
          >
            Language
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
