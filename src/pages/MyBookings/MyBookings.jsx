import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { Link } from "react-router";

const MyBookings = () => {
  const { allBookingsData, user } = useContext(AuthContext);

  // Ensure allBookingsData is an array
  const bookingsArray = Array.isArray(allBookingsData) ? allBookingsData : [];

  // Filter bookings that match the user's email
  const userBookings = bookingsArray.filter(
    (booking) => booking.email === user?.email
  );

  return (
    <div className="my-10 py-10 px-5 max-w-6xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-gray-900 mb-6">
        Total Bookings: {userBookings.length}
      </h1>

      {/* Booking Cards or No Bookings Message */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userBookings.length > 0 ? (
          userBookings.map((booking, index) => {
            const { img, place_name, location } = booking.resort;
            const { startDate, endDate, price } = booking;

            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-3xl overflow-hidden transition hover:shadow-xl"
              >
                <img
                  src={img}
                  alt={place_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800">
                    {place_name}
                  </h2>
                  <p className="text-gray-600">{location}</p>
                  <p className="mt-2 text-gray-700 font-semibold">
                    Price: ${price}
                  </p>
                  <p className="text-gray-500">
                    <strong>Dates:</strong> {startDate} - {endDate}
                  </p>
                  <Link
                    to={`/resorts/${place_name}`}
                    className="mt-4 inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Resort
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-center bg-gray-100 p-10 rounded-3xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">
              You didn't book any resort.
            </h2>
            <p className="text-gray-600 mb-4">
              Please book a resort to enjoy your vacation!
            </p>
            <Link to="/resorts">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition">
                Book a Resort Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
