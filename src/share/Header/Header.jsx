import { useContext, useState } from "react";
import { Link } from "react-router-dom"; // Corrected import
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
import SearchBarMobile from "../../components/SearchBarMobile/SearchBarMobile";
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
    <div className="bg-[#037092]">
      {/* Desktop Navbar */}
      <div className="container mx-auto hidden md:px-10 lg:flex justify-between items-center navbar">
        {/* Logo and Search Bar */}
        <div className=" navbar-start flex items-center py-5 gap-5">
          <Link to="/" className="z-20 md:flex md:items-center md:gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <div className="w-[1px] h-14 bg-white"></div>
            <img
              src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
              alt=""
              className="md:w-24 md:h-10"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center">
          <ul className="flex gap-6 menu menu-horizontal space-y-2 px-1 text-white">
            <li>
              <Link to="/lastCallVacation">
                <p className="text-xl">BOOK</p>
              </Link>
            </li>
            {user && role ? (
              <>
                <li>
                  <Link to="/">
                    <p className="text-xl">TRIPS</p>
                  </Link>
                </li>
                {role === "admin" ? (
                  <div className="space-y-5">
                    <li>
                      <Link to="/admin-panel/admin-overview">
                        <p className="text-xl">AdminPanel</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/profile">
                        <p className="text-xl">Profile</p>
                      </Link>
                    </li>
                  </div>
                ) : (
                  <>
                    <li>
                      <Link to="/dashboard">
                        <p className="text-xl">Dashboard</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/notifications">
                        <p className="text-xl">Notifications</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/myAccount">
                        <p className="text-xl">My Account</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/profile">
                        <p className="text-xl">Profile</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/myFavorites">
                        <p className="text-xl">My Favorites</p>
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/">
                    <p className="text-xl">HOME</p>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <p className="text-xl">LOGIN</p>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <p className="text-xl">SIGN UP</p>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* User Icons */}
        <div className="navbar-end text-white flex gap-5 items-center">
          {user ? (
            <>
              <IoMdNotificationsOutline className="text-3xl" />

              <Link to="/dashboard/profile">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="text-3xl w-[50px] rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
              </Link>

              <div>
                <button
                  onClick={signOut}
                  className="bg-white text-gray-700 rounded px-3 py-1"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-gray-700 rounded px-3 py-1"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-gray-700 rounded px-3 py-1"
              >
                Registration
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="p-2">
        <div className="container mx-auto flex lg:hidden justify-between items-center navbar">
          <div className="flex justify-center items-center space-x-4">
            {/* Logo */}
            <Link to="/" className="z-20">
              <img src={logo} alt="" className="w-[45px] h-[45px]" />
            </Link>
            <div className="w-[1px] h-14 bg-white"></div>
            <img
              src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
              alt=""
              className="w-[55px]"
            />
          </div>

          {/* Mobile Dropdown */}
          <div className="flex dropdown relative">
            <div className="flex gap-2">
              {user ? (
                <>
                  <Link to="/dashboard/profile">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Profile"
                        className="text-2xl w-[30px] rounded-full"
                      />
                    ) : (
                      <FaRegUserCircle className="text-3xl text-white" />
                    )}
                  </Link>
                  <PiSignOut
                    onClick={signOut}
                    className="text-3xl cursor-pointer text-white"
                  />
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm text-white border rounded px-1 py-1 hover:bg-white hover:text-gray-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm text-white border rounded px-2 py-1 mr-1 hover:bg-white hover:text-gray-500"
                  >
                    Registration
                  </Link>
                </>
              )}
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaTimes className="h-8 w-8 text-xl text-white" />
              ) : (
                <FaBars className="h-8 w-8 text-xl text-white" />
              )}
            </div>
            {isMenuOpen && (
              <div className="p-5">
                <ul className="absolute -right-5 menu menu-lg dropdown-content mt-5 p-6 shadow bg-white rounded-box w-screen z-10 h-fit flex flex-col space-y-2">
                  <div className="">
                    <Link to="/lastCallVacation" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="flex gap-3">
                          <img
                            src="https://www.rci.com/static/images/content/icons-header/book.svg"
                            alt=""
                          />
                          <a>BOOK</a>
                        </div>
                      </li>
                    </Link>
                    {user && role ? (
                      <div className="space-y-3">
                        <Link to="/" onClick={closeMenu}>
                          <li className="flex font-regular pt-2 text-gray-600">
                            <div className="flex gap-3">
                              <img
                                src="https://www.rci.com/static/images/content/icons-header/trips.svg"
                                alt=""
                              />
                              <a>TRIPS</a>
                            </div>
                          </li>
                        </Link>

                        <Link to="/" onClick={closeMenu}>
                          <li className="flex font-regular pt-2 text-gray-600">
                            <div className="flex gap-3">
                              <img
                                src="https://www.rci.com/static/images/content/icons-header/offers.svg"
                                alt=""
                              />
                              <a>DEALS</a>
                            </div>
                          </li>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link to="/" onClick={closeMenu}>
                          <li className="flex font-regular text-gray-600">
                            <div className="flex gap-3">
                              <IoHomeOutline className="text-2xl" />
                              <a>Home</a>
                            </div>
                          </li>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="divider border-[1px] border-gray-200"></div>
                  <div className="divider"></div>
                  <div className="flex justify-start flex-col gap-3">
                    {user && role ? (
                      <>
                        {role === "admin" ? (
                          <div className="flex flex-col space-y-3">
                            <Link
                              to="/admin-panel/admin-overview"
                              onClick={closeMenu}
                            >
                              <li className="flex font-regular text-gray-600">
                                <div className="flex gap-3">
                                  <FaWpforms className="text-2xl" />
                                  <a>AdminPanel</a>
                                </div>
                              </li>
                            </Link>
                            <Link to="/dashboard/profile" onClick={closeMenu}>
                              <li className="flex font-regular text-gray-600">
                                <div className="flex gap-3">
                                  <FaRegUserCircle className="text-2xl" />
                                  <a>Profile</a>
                                </div>
                              </li>
                            </Link>
                          </div>
                        ) : (
                          <>
                            <Link to="/dashboard/overview" onClick={closeMenu}>
                              <li className="flex font-regular text-gray-600">
                                <div className="flex gap-3">
                                  <FaWpforms className="text-2xl" />
                                  <a>Dashboard</a>
                                </div>
                              </li>
                            </Link>

                            <Link to="/" onClick={closeMenu}>
                              <li className="flex font-regular text-gray-600">
                                <div className="flex gap-3">
                                  <IoMdNotificationsOutline className="text-3xl" />
                                  <a>Notifications</a>
                                </div>
                              </li>
                            </Link>

                            <Link to="/myAccount" onClick={closeMenu}>
                              <li className="flex font-regular text-gray-600">
                                <div className="flex gap-3">
                                  <MdAccountBalanceWallet className="text-2xl" />
                                  <a>My Account</a>
                                </div>
                              </li>
                            </Link>

                            <Link to="/dashboard/profile" onClick={closeMenu}>
                              <li className="flex font-regular text-gray-600">
                                <div className="flex gap-3">
                                  <FaRegUserCircle className="text-2xl" />
                                  <a>Profile</a>
                                </div>
                              </li>
                            </Link>

                            <li className="flex font-regular text-gray-600">
                              <div className="flex gap-3">
                                <FaRegHeart className="text-2xl" />
                                <a>My Favorites</a>
                              </div>
                            </li>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={closeMenu}>
                          <li className="flex font-regular text-gray-600">
                            <div className="flex gap-3">
                              <FaWpforms className="text-2xl" />
                              <a>Login</a>
                            </div>
                          </li>
                        </Link>

                        <Link to="/signup" onClick={closeMenu}>
                          <li className="flex font-regular text-gray-600">
                            <div className="flex gap-3">
                              <FaRegUserCircle className="text-2xl" />
                              <a>Registration</a>
                            </div>
                          </li>
                        </Link>
                      </>
                    )}

                    <li className="flex font-regular text-gray-600">
                      <div className="flex gap-3">
                        <IoIosHelpCircleOutline className="text-2xl" />
                        <a>Help</a>
                      </div>
                    </li>

                    {user ? (
                      <li className="flex font-regular text-gray-600">
                        <div className="flex gap-3">
                          <PiSignOut className="text-2xl" />
                          <a onClick={signOut}>Sign Out</a>
                        </div>
                      </li>
                    ) : null}
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
        <SearchBarMobile />
      </div>
    </div>
  );
};

export default Header;