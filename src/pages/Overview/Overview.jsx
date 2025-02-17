import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Loading from "../../components/Loading";

const Overview = () => {
  const { user, bookingsData } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  const { name, email, photoURL } = user;

  // Ensure bookingsData is an array
  const bookingsArray = Array.isArray(bookingsData) ? bookingsData : [];

  // Billing Info (assuming it is the same for all bookings)
  const billingInfo = bookingsArray.length > 0 ? bookingsArray[0]?.billingInfo || {} : {};

  const {
    firstName,
    lastName,
    phoneNumber,
    postalCode,
    country,
    city,
    state,
    address1,
    address2,
  } = billingInfo;

  return (
    <div className="my-10 py-10 px-5 max-w-6xl mx-auto">
      {/* User Profile Section */}
      <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg">
        <img src={photoURL} alt="User" className="w-24 h-24 rounded-full border-4 border-indigo-500" />
        <h1 className="text-2xl font-semibold text-gray-900 mt-3">{name}</h1>
        <p className="text-gray-600">{email}</p>
      </div>

      {/* Booking Section */}
      <div className="mt-10">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Your Bookings:</h1>

        <div className="flex flex-wrap gap-5">
          {bookingsArray.length > 0 ? (
            bookingsArray.map((booking, index) => {
              const { img, place_name, location } = booking.resort;
              const { startDate, endDate, unitType } = booking;

              return (
                <div key={index} className="flex flex-col w-full md:w-1/2 lg:w-1/3 bg-gray-100 rounded-3xl p-5 shadow-md hover:shadow-xl transition">
                  <img src={img} alt="" className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h2 className="text-lg font-semibold text-gray-800">{place_name}</h2>
                  <p className="text-gray-600">{location}</p>
                  <p className="mt-2 text-sm"><strong>Start Date:</strong> {startDate}</p>
                  <p className="text-sm"><strong>End Date:</strong> {endDate}</p>
                  <p className="text-sm"><strong>Unit Type:</strong> {unitType}</p>
                  <Link to="/dashboard/myBookings" className="mt-4">
                    <button className="w-full text-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
                      See all the bookings
                    </button>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center w-full text-center bg-gray-100 p-10 rounded-3xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800">You didn't book any resort.</h2>
              <p className="text-gray-600 mb-4">Please book a resort to enjoy your vacation!</p>
              <Link to="/lastCallVacation">
                <button className="bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition">
                  Book a Resort Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Billing Info Section (only show if there are bookings) */}
      {bookingsArray.length > 0 && (
        <div className="mt-10 bg-white shadow-lg rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Billing Info:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Phone Number:</strong> {phoneNumber}</p>
            </div>
            <div>
              <p><strong>Address Line 1:</strong> {address1}</p>
              <p><strong>Address Line 2:</strong> {address2 || 'N/A'}</p>
              <p><strong>City:</strong> {city}</p>
              <p><strong>State:</strong> {state}</p>
              <p><strong>Postal Code:</strong> {postalCode}</p>
              <p><strong>Country:</strong> {country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
