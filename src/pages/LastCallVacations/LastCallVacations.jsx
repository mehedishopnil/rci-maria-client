import { useContext, useState, useEffect } from "react";
import Loading from "../../components/Loading";
import ResortCard from "../../components/ResortCard/ResortCard";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const LastCallVacations = () => {
  const { allResortData, loading } = useContext(AuthContext);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitedResortData, setLimitedResortData] = useState([]);
  const resortsPerPage = 15;

  // Limit the data to 350 entries and initialize filteredData
  useEffect(() => {
    if (allResortData) {
      const limitedData = allResortData.slice(0, 350);
      setLimitedResortData(limitedData);
      setFilteredData(limitedData);
    }
  }, [allResortData]);

  // Pagination logic
  const indexOfLastResort = currentPage * resortsPerPage;
  const indexOfFirstResort = indexOfLastResort - resortsPerPage;
  const currentResorts = filteredData.slice(indexOfFirstResort, indexOfLastResort);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredData.length / resortsPerPage);

  // Generate pagination buttons
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
      let endPage = Math.min(startPage + maxButtons - 1, totalPages);

      if (endPage - startPage < maxButtons - 1) {
        startPage = Math.max(endPage - maxButtons + 1, 1);
      }

      if (startPage > 1) {
        buttons.push(1);
        if (startPage > 2) {
          buttons.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push("...");
        }
        buttons.push(totalPages);
      }
    }

    return buttons;
  };

  return (
    <div className="container mx-auto p-4 space-y-5 pb-20">
      {/* Data Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <Loading />
        ) : (
          currentResorts.map((resort) => (
            <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
              <ResortCard resort={resort} />
            </Link>
          ))
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-8">
        <nav className="flex gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-[#037092] text-white hover:bg-[#025a73]"
            } transition-colors duration-300`}
          >
            Previous
          </button>

          {getPaginationButtons().map((button, index) => (
            <button
              key={index}
              onClick={() => typeof button === "number" && paginate(button)}
              disabled={button === "..."}
              className={`px-4 py-2 rounded-md ${
                currentPage === button
                  ? "bg-[#037092] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } transition-colors duration-300`}
            >
              {button}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-[#037092] text-white hover:bg-[#025a73]"
            } transition-colors duration-300`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default LastCallVacations;
