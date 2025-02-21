import React, { useState, useEffect, useRef } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router'; // or 'react-router' if needed

const SearchEngine = ({
  placeholder = 'Search...',
  data = [],
  filterFunction, // optional: custom filter function (item, query) => boolean
  onSearch,       // optional: callback invoked with filtered data after search
  maxHistory = 10,
  storageKey = 'searchHistory'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem(storageKey)) || [];
    setSearchHistory(savedHistory);
  }, [storageKey]);

  // Save search query to history
  const saveSearchQuery = (query) => {
    const updatedHistory = [query, ...searchHistory.filter(item => item !== query)];
    if (updatedHistory.length > maxHistory) {
      updatedHistory.splice(maxHistory);
    }
    setSearchHistory(updatedHistory);
    localStorage.setItem(storageKey, JSON.stringify(updatedHistory));
  };

  // Remove a search history item
  const removeSearchHistoryItem = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem(storageKey, JSON.stringify(updatedHistory));
  };

  // Default filter function if none is provided
  const defaultFilterFunction = (item, query) => {
    return Object.keys(item).some(key => {
      if (typeof item[key] === 'string') {
        return item[key].toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });
  };

  // Perform search based on the searchQuery and provided data
  const performSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredData(data);
      if (onSearch) onSearch(data);
      return;
    }
    setLoading(true);
    const filterFn = filterFunction || defaultFilterFunction;
    const results = data.filter(item => filterFn(item, searchQuery));
    setFilteredData(results);
    saveSearchQuery(searchQuery);
    setLoading(false);
    if (onSearch) {
      onSearch(results);
    }
    // Optionally, if you need to navigate with query parameters:
    const ids = results.map(item => item._id);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&ids=${encodeURIComponent(ids.join(','))}`);
  };

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  // Handle selecting a history item
  const handleHistorySelect = (query) => {
    setSearchQuery(query);
    setShowHistoryDropdown(false);
    performSearch();
  };

  // Hide history dropdown if clicked outside
  const handleOutsideClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowHistoryDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="search-engine-container" ref={containerRef}>
      <div className="relative flex justify-center">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowHistoryDropdown(true)}
          onKeyPress={handleKeyPress}
          className="w-full px-2 py-1 "
        />
        <button
          className="absolute right-0 top-0 text-xl bg-white text-gray-400f px-3 py-1 rounded-r-full"
          onClick={performSearch}
        >
          <IoSearch />
        </button>
      </div>

      {showHistoryDropdown && searchHistory.length > 0 && (
        <div className="search-history-dropdown bg-white rounded p-4 mt-2">
          <h1 className="text-center mb-2">Search History</h1>
          <ul>
            {searchHistory.map((query, index) => (
              <li key={index} className="flex justify-between items-center">
                <span
                  className="cursor-pointer"
                  onClick={() => handleHistorySelect(query)}
                >
                  {query}
                </span>
                <IoClose
                  className="cursor-pointer"
                  onClick={() => removeSearchHistoryItem(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Optionally, render filteredData or a loader here */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SearchEngine;
