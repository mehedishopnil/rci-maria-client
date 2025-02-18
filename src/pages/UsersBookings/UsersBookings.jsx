import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const UsersBookings = () => {
  const { allBookingsData } = useContext(AuthContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-8 text-gray-800">
        Total Bookings: {allBookingsData.length}
      </h1>
      <div className="overflow-x-auto">
        {/* Desktop Table */}
        <table className="table-auto w-full hidden lg:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Resort Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Booking Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allBookingsData.map((booking, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={booking.resort.img}
                    alt="Resort"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.resort.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.startDate} - {booking.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive Cards */}
        <div className="block lg:hidden space-y-4">
          {allBookingsData.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={booking.resort.img}
                  alt="Resort"
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {booking.resort.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {booking.billingInfo.firstName} {booking.billingInfo.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Dates:</strong> {booking.startDate} - {booking.endDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Unit Type:</strong> {booking.unitType}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersBookings;