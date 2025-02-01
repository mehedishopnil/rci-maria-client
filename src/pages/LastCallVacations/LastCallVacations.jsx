import React, { useContext, useState, useEffect } from "react";
import Loading from "../../components/Loading";
import ResortCard from "../../components/ResortCard/ResortCard";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { Link } from "react-router"; // Fixed: Correct import for Link

const LastCallVacations = () => {
  const {
    resortData,
    allResortData,
    loading,
    fetchResortData,
  } = useContext(AuthContext);

  // Local state for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Update filteredData when resortData changes
  useEffect(() => {
    if (resortData) {
      setFilteredData(resortData);
    }
  }, [resortData]);

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(resortData || []); // Fallback to empty array if resortData is undefined
      return;
    }
    const filteredResults = (allResortData || []).filter((resort) =>
      resort.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
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
            className="ml-2 px-3 py-2 bg-[#037092] text-white rounded-md"
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
          (filteredData || []).map((resort) => (
            <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
              <ResortCard resort={resort} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default LastCallVacations;