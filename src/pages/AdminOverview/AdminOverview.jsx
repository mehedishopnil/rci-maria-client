import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { FaBook, FaUsers } from "react-icons/fa";

const AdminOverview = () => {
  const { user, allBookingsData, allUsersData, fetchAllBookingsData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!allUsersData || allUsersData.length === 0) {
          await fetchAllBookingsData();
        }
        if (!allBookingsData || allBookingsData.length === 0) {
          await fetchAllBookingsData();
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [allUsersData, allBookingsData, fetchAllBookingsData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user || !allBookingsData || !allUsersData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const { name, photoURL, email } = user;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* User Profile Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <img
            src={photoURL}
            alt="Admin"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Admin
          </span>
        </div>
        <h1 className="text-2xl font-bold mt-4 text-gray-800">{name}</h1>
        <p className="text-sm text-gray-600">{email}</p>
      </div>

      {/* Metrics Section */}
<div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
  {/* Total Bookings Card */}
  <Link
    to="/admin-panel/users-bookings"
    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-4xl font-bold mt-2">{allBookingsData.length}</p>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <FaBook className="w-8 h-8" />
        </div>
      </div>
      <p className="text-sm mt-2">View all bookings</p>
    </div>
  </Link>

  {/* Total Users Card */}
  <Link
    to="/admin-panel/user-control"
    className="w-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-4xl font-bold mt-2">{allUsersData.length}</p>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <FaUsers className="w-8 h-8" />
        </div>
      </div>
      <p className="text-sm mt-2">Manage users</p>
    </div>
  </Link>
</div>

    </div>
  );
};

export default AdminOverview;