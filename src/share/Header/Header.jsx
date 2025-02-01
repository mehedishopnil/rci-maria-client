import { useState } from "react";
import logo from "../../assets/logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#037092]">
      {/* Desktop Navbar */}
      <div className="container mx-auto hidden md:px-10 lg:flex justify-between items-center py-4">
        {/* Logo and Branding */}
        <div className="flex items-center gap-5">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
          <div className="w-[1px] h-14 bg-white"></div>
          <img
            src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
            alt="Brand Logo"
            className="w-[80px]"
          />
        </div>

        {/* Desktop Menu */}
        <div className="flex items-center">
          <ul className="flex space-x-8 text-white">
            <li>
              <Link to="/lastCallVacation" className="text-xl hover:text-gray-300">
                BOOK
              </Link>
            </li>
            <li>
              <Link to="/" className="text-xl hover:text-gray-300">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-xl hover:text-gray-300">
                LOGIN
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-xl hover:text-gray-300">
                SIGN UP
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="container mx-auto flex lg:hidden justify-between items-center py-4 px-6">
        {/* Logo and Branding */}
        <div className="flex items-center gap-5">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
          <div className="w-[1px] h-14 bg-white"></div>
          <img
            src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
            alt="Brand Logo"
            className="w-[80px]"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? (
            <FaTimes className="h-8 w-8" />
          ) : (
            <FaBars className="h-8 w-8" />
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 right-0 left-0 bg-white shadow-lg z-10">
            <ul className="p-5 space-y-4">
              <li>
                <Link to="/lastCallVacation" className="text-gray-700 text-xl hover:text-blue-500">
                  BOOK
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 text-xl hover:text-blue-500">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-700 text-xl hover:text-blue-500">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-700 text-xl hover:text-blue-500">
                  SIGN UP
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;