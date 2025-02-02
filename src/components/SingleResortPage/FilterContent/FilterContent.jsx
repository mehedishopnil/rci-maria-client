import { useState, useRef, useEffect } from "react";
import AvailableUnits from "./FilteredOptions/AvailableUnits";
import RoomDetails from "./FilteredOptions/RoomDetails";
import ResortDetails from "./FilteredOptions/ResortDetails";
import AreaInfo from "./FilteredOptions/AreaInfo";
import Reviews from "./FilteredOptions/Reviews";

const FilterContent = ({ currentResort }) => {
  const {
    room_details,
    available_amount,
    resort_details,
    check_in_time,
    check_out_time,
    place_name,
    location,
    reviews_amount,
    rating,
    resort_ID,
  } = currentResort;

  const [activeMenu, setActiveMenu] = useState("Available Units");
  const filterMenuRef = useRef(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const menuContent = {
    "Available Units": <AvailableUnits currentResort={currentResort} />,
    "Room Details": <RoomDetails room_details={room_details} />,
    "Resort Details": (
      <ResortDetails
        resort_details={resort_details}
        check_in_time={check_in_time}
        check_out_time={check_out_time}
      />
    ),
    "Area info": <AreaInfo place_name={place_name} location={location} />,
    Reviews: <Reviews reviews_amount={reviews_amount} rating={rating} />,
  };

  useEffect(() => {
    const handleScroll = () => {
      const filterMenu = filterMenuRef.current;
      if (filterMenu) {
        const offsetTop = filterMenu.offsetTop;
        if (window.pageYOffset > offsetTop) {
          filterMenu.classList.add(
            "fixed",
            "top-0",
            "left-0",
            "right-0",
            "z-10",
            "bg-white",
            "shadow-md"
          );
        } else {
          filterMenu.classList.remove(
            "fixed",
            "top-0",
            "left-0",
            "right-0",
            "z-10",
            "bg-white",
            "shadow-md"
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div
        ref={filterMenuRef}
        className="w-full bg-white py-3 overflow-x-auto no-scrollbar"
      >
        <ul className="flex space-x-5 text-lg font-semibold px-4 whitespace-nowrap no-scrollbar">
          {Object.keys(menuContent).map((menu) => (
            <li
              key={menu}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-300 ${
                activeMenu === menu
                  ? "bg-[#037092] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4">{menuContent[activeMenu]}</div>
    </div>
  );
};

export default FilterContent;
