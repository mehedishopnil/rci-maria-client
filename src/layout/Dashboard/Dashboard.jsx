import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom"; // Corrected import
import { Transition } from "@headlessui/react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FaCalendarCheck, FaHome, FaWpforms } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/Rci-vertical.svg.png";

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuItemClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="lg:flex h-screen bg-gray-100">
      {/* Sidebar for Large Screens */}
      <aside className="hidden lg:flex flex-col w-64 bg-white shadow-xl border-r border-gray-200">
        <div className=" p-5 gap-5 space-y-5 items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-10 h-10 md:w-20 md:h-18" />
          </Link>
          <h1 className="text-xl pt-5 font-bold text-gray-800">Dashboard</h1>
        </div>
        <ul className="menu p-4 text-gray-700 font-semibold space-y-2">
          <li className="hover:bg-blue-100 p-2 rounded-lg">
            <Link to="overview" className="flex items-center gap-2">
              <HiOutlineHomeModern className="text-blue-500" />
              Overview
            </Link>
          </li>

          <li className="hover:bg-blue-100 p-2 rounded-lg">
            <Link to="overview" className="flex items-center gap-2">
              <HiOutlineHomeModern className="text-blue-500" />
              My Bookings
            </Link>
          </li>


          <li className="hover:bg-blue-100 p-2 rounded-lg">
            <Link to="resort-input-form" className="flex items-center gap-2">
              <FaWpforms className="text-green-500" />
              Resort Input Form
            </Link>
          </li>
        </ul>
      </aside>

      {/* Mobile Navigation Bar */}
      <nav className="lg:hidden fixed top-0 w-full bg-white shadow-md p-4 flex items-center justify-between z-50">
        <div className="text-center">
        <Link to="/" className="w-full flex items-center gap-5">
          <img src={logo} alt="Logo" className="w-10 h-10" />
         
        </Link>
        </div>
        <h1 className="text-xl text-center font-bold text-gray-800">Dashboard</h1>
        <button onClick={toggleMobileMenu} className="text-2xl text-gray-700">
          <BsFillMenuButtonWideFill />
        </button>
      </nav>

      {/* Mobile Menu Drawer (Right Side) */}
      <Transition
        show={mobileMenuOpen}
        enter="transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 z-50 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button onClick={toggleMobileMenu} className="text-2xl text-gray-700">
              <IoMdClose />
            </button>
          </div>

          <ul className="menu mt-5 text-gray-700 font-semibold space-y-3">
            <li className="hover:bg-blue-100 p-2 rounded-lg">
              <button
                onClick={() => handleMenuItemClick("/dashboard/overview")}
                className="flex items-center gap-2 w-full text-left"
              >
                <HiOutlineHomeModern className="text-blue-500" />
                Overview
              </button>
            </li>

            <li className="hover:bg-blue-100 p-2 rounded-lg">
              <button
                onClick={() => handleMenuItemClick("/dashboard/myBookings")}
                className="flex items-center gap-2 w-full text-left"
              >
                <FaCalendarCheck className="text-blue-500" />
                My Bookings
              </button>
            </li>

            <li className="hover:bg-green-100 p-2 rounded-lg">
              <button
                onClick={() => handleMenuItemClick("/dashboard/resort-input-form")}
                className="flex items-center gap-2 w-full text-left"
              >
                <FaWpforms className="text-green-500" />
                Resort Input Form
              </button>
            </li>

            <div className="divider"></div>

            <li className="hover:bg-gray-100 p-2 rounded-lg">
              <button
                onClick={() => handleMenuItemClick("/")}
                className="flex items-center gap-2 w-full text-left"
              >
                <FaHome className="text-gray-500" />
                Home
              </button>
            </li>
          </ul>
        </div>
      </Transition>

      {/* Content Area */}
      <main className="flex-grow p-6 mt-16 lg:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;