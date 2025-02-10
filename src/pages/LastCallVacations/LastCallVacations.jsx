import { useContext, useState, useEffect } from "react";
import Loading from "../../components/Loading";
import ResortCard from "../../components/ResortCard/ResortCard";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { Link } from "react-router-dom"; // Corrected import

const LastCallVacations = () => {
  const { resortData, allResortData, loading } = useContext(AuthContext);

  // Local state for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitedResortData, setLimitedResortData] = useState([]); // State for limited data
  const resortsPerPage = 15;

  // Update limitedResortData when allResortData changes
  useEffect(() => {
    if (allResortData) {
      // Limit the data to 250 entries
      const limitedData = allResortData.slice(0, 250);
      setLimitedResortData(limitedData);
      setFilteredData(limitedData); // Initialize filteredData with limited data
    }
  }, [allResortData]);

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(limitedResortData || []); // Fallback to limitedResortData if search term is empty
      return;
    }
    const filteredResults = (limitedResortData || []).filter((resort) =>
      resort.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Pagination logic
  const indexOfLastResort = currentPage * resortsPerPage;
  const indexOfFirstResort = indexOfLastResort - resortsPerPage;
  const currentResorts = filteredData.slice(indexOfFirstResort, indexOfLastResort);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(filteredData.length / resortsPerPage);

  // Mobile responsive pagination
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Maximum number of pagination buttons to show

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
          buttons.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push('...');
        }
        buttons.push(totalPages);
      }
    }

    return buttons;
  };

  return (
    <div className="container mx-auto p-4 space-y-5 pb-20">
      {/* Search results count */}
      {searchTerm && (
        <div className="pt-2">
          <h1 className="text-xl">{filteredData.length} Resorts</h1>
        </div>
      )}

      <div className="divider"></div>

      {/* Filter Section */}
      <div className="w-full md:flex md:justify-center">
        <div className="mb-4 flex md:w-1/2">
          <input
            type="text"
            placeholder="Filter by location"
            className="w-full px-3 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-3 py-2 bg-[#037092] text-white rounded-md hover:bg-[#025a73] transition-colors duration-300"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Data showing section */}
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
          {/* Previous Button */}
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

          {/* Page Numbers */}
          {getPaginationButtons().map((button, index) => (
            <button
              key={index}
              onClick={() => typeof button === 'number' && paginate(button)}
              disabled={button === '...'}
              className={`px-4 py-2 rounded-md ${
                currentPage === button
                  ? "bg-[#037092] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } transition-colors duration-300`}
            >
              {button}
            </button>
          ))}

          {/* Next Button */}
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