import { useContext } from "react";
import { FaLock, FaRegEdit, FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdLogout, MdOutlineSupportAgent } from "react-icons/md";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { name, email, photoURL } = user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f1f1f1] p-5">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        {/* Profile Picture */}
        <div className="relative">
          <img
            className="w-28 h-28 rounded-full border-4 border-blue-400 mx-auto"
            src={photoURL}
            alt="Profile"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mt-3">{name}</h1>
        <p className="text-gray-500 text-sm">Traveler & Adventure Lover</p>

        {/* Profile Info */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
            <h1 className="text-gray-700 flex items-center gap-2">
              <FaUser className="text-blue-500" /> {name}
            </h1>
            <FaRegEdit className="text-gray-500 cursor-pointer hover:text-blue-500" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
            <h1 className="text-gray-700 flex items-center gap-2">
              <MdEmail className="text-blue-500" /> {email}
            </h1>
            <FaRegEdit className="text-gray-500 cursor-pointer hover:text-blue-500" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
            <h1 className="text-gray-700 flex items-center gap-2">
              <FaLock className="text-blue-500" /> *********
            </h1>
            <FaRegEdit className="text-gray-500 cursor-pointer hover:text-blue-500" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
            <h1 className="text-gray-700 flex items-center gap-2">
              <IoLocationSharp className="text-blue-500" /> USA
            </h1>
            <FaRegEdit className="text-gray-500 cursor-pointer hover:text-blue-500" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
            <h1 className="text-gray-700 flex items-center gap-2">
              <MdOutlineSupportAgent className="text-blue-500" /> Support
            </h1>
            <FaRegEdit className="text-gray-500 cursor-pointer hover:text-blue-500" />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={signOut}
          className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2 mx-auto"
        >
          <MdLogout className="text-lg" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
