import { FaRegHeart } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";

const ResortCard = ({ resort }) => {
  const { img, place_name, reviews_amount, location, ownerExclusive } = resort;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <figure className="relative">
        <img
          src={img}
          alt="Resort"
          className="w-full h-48 md:h-56 object-cover"
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
          <FaRegHeart className="text-xl text-gray-700" />
        </button>
      </figure>

      {/* Content Section */}
      <div className="p-4 md:p-6">
        {/* Location */}
        <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
          {location}
        </p>

        {/* Resort Name */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{place_name}</h2>

        {/* Owner Exclusive Badge */}
        {ownerExclusive && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-700">{ownerExclusive}</span>
          </div>
        )}

        {/* Wyndham Owner Exclusive Badge */}
        {place_name.includes("Wyndham") && (
          <div className="flex items-center gap-2 mb-3">
            <GiStarsStack className="text-yellow-500 text-xl" />
            <span className="text-sm text-gray-700">Wyndham owner exclusive</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Ratings Section */}
        <div className="flex items-center gap-4">
          {/* Gold Crown Badge */}
          <img
            src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
            alt="Gold Crown"
            className="w-10 h-10"
          />

          {/* TripAdvisor Rating */}
          <div className="flex items-center gap-2">
            <img
              src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg"
              alt="TripAdvisor Rating"
              className="w-20"
            />
            <p className="text-sm text-gray-600">{reviews_amount} reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortCard;