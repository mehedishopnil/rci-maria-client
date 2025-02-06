import { useContext, useState } from "react";
import { Link } from "react-router"; // Use `react-router-dom` instead of `react-router`
import logo from "../../assets/logo.svg";
import {
  IoIosHelpCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import {
  FaUserCircle,
  FaTimes,
  FaBars,
  FaRegUserCircle,
  FaWpforms,
} from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, role } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-[#037092] shadow-md">
      {/* Desktop Navbar */}
      <div className="container mx-auto px-4 lg:px-10 py-3 flex justify-between items-center">
        {/* Logo and Branding */}
        <div className="flex items-center gap-4">
          <Link to="/" className="z-20">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
          <div className="w-px h-10 bg-white"></div>
          <img
            src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
            alt="Club Wyndham"
            className="w-20"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-6 text-white">
            <li>
              <Link to="/lastCallVacation" className="hover:text-gray-300">
                <p className="text-lg font-medium">BOOK</p>
              </Link>
            </li>
            {user && role ? (
              <>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    <p className="text-lg font-medium">TRIPS</p>
                  </Link>
                </li>
                {role === "admin" ? (
                  <>
                    <li>
                      <Link
                        to="/admin-panel/admin-overview"
                        className="hover:text-gray-300"
                      >
                        <p className="text-lg font-medium">Admin Panel</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/profile" className="hover:text-gray-300">
                        <p className="text-lg font-medium">Profile</p>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/dashboard" className="hover:text-gray-300">
                        <p className="text-lg font-medium">Dashboard</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/notifications" className="hover:text-gray-300">
                        <p className="text-lg font-medium">Notifications</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/myAccount" className="hover:text-gray-300">
                        <p className="text-lg font-medium">My Account</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/profile" className="hover:text-gray-300">
                        <p className="text-lg font-medium">Profile</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/myFavorites" className="hover:text-gray-300">
                        <p className="text-lg font-medium">My Favorites</p>
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    <p className="text-lg font-medium">HOME</p>
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    <p className="text-lg font-medium">LOGIN</p>
                  </Link>
                </li>
                <li>
                  <Link to="/registration" className="hover:text-gray-300">
                    <p className="text-lg font-medium">Registration</p>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* User Icons */}
        <div className="hidden lg:flex items-center space-x-6 text-white">
          {user ? (
            <>
              <IoMdNotificationsOutline className="text-2xl cursor-pointer hover:text-gray-300" />
              <Link to="/dashboard/profile">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-3xl hover:text-gray-300" />
                )}
              </Link>
              <button
                onClick={signOut}
                className="bg-white text-gray-700 rounded px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-gray-700 rounded px-4 py-2 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="bg-white text-gray-700 rounded px-4 py-2 hover:bg-gray-100"
              >
                Registration
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          {user && (
            <Link to="/dashboard/profile">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaRegUserCircle className="text-2xl text-white" />
              )}
            </Link>
          )}
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white fixed inset-0 z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <img
                  src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
                  alt="Club Wyndham"
                  className="w-16"
                />
              </div>
              <button onClick={closeMenu} className="text-gray-600">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/lastCallVacation"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                >
                  <img
                    src="https://www.rci.com/static/images/content/icons-header/book.svg"
                    alt="Book"
                    className="w-6 h-6"
                  />
                  <span className="text-lg">BOOK</span>
                </Link>
              </li>
              {user && role ? (
                <>
                  <li>
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                    >
                      <img
                        src="https://www.rci.com/static/images/content/icons-header/trips.svg"
                        alt="Trips"
                        className="w-6 h-6"
                      />
                      <span className="text-lg">TRIPS</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                    >
                      <img
                        src="https://www.rci.com/static/images/content/icons-header/offers.svg"
                        alt="Deals"
                        className="w-6 h-6"
                      />
                      <span className="text-lg">DEALS</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                  >
                    <IoHomeOutline className="w-6 h-6" />
                    <span className="text-lg">Home</span>
                  </Link>
                </li>
              )}
            </ul>

            <div className="my-6 border-t border-gray-200"></div>

            <ul className="space-y-4">
              {user && role ? (
                role === "admin" ? (
                  <>
                    <li>
                      <Link
                        to="/admin-panel/admin-overview"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                      >
                        <FaWpforms className="w-6 h-6" />
                        <span className="text-lg">Admin Panel</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/profile"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                      >
                        <FaRegUserCircle className="w-6 h-6" />
                        <span className="text-lg">Profile</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/dashboard/overview"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                      >
                        <FaWpforms className="w-6 h-6" />
                        <span className="text-lg">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/notifications"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                      >
                        <IoMdNotificationsOutline className="w-6 h-6" />
                        <span className="text-lg">Notifications</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/myAccount"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                      >
                        <MdAccountBalanceWallet className="w-6 h-6" />
                        <span className="text-lg">My Account</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/profile"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                      >
                        <FaRegUserCircle className="w-6 h-6" />
                        <span className="text-lg">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/myFavorites"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                      >
                        <FaRegHeart className="w-6 h-6" />
                        <span className="text-lg">My Favorites</span>
                      </Link>
                    </li>
                  </>
                )
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                    >
                      <FaWpforms className="w-6 h-6" />
                      <span className="text-lg">Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/registration"
                      onClick={closeMenu}
                      className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                    >
                      <FaRegUserCircle className="w-6 h-6" />
                      <span className="text-lg">Registration</span>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/help"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                >
                  <IoIosHelpCircleOutline className="w-6 h-6" />
                  <span className="text-lg">Help</span>
                </Link>
              </li>
              {user && (
                <li>
                  <button
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                    className="flex items-center space-x-3 text-gray-700 hover:text-[#037092]"
                  >
                    <PiSignOut className="w-6 h-6" />
                    <span className="text-lg">Sign Out</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;