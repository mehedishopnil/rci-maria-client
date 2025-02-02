import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

// Create AuthContext for global state management
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State variables
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [user, setUser] = useState(null); // User state to store authenticated user data
  const [resortData, setResortData] = useState([]); // State for resort data
  const [filteredData, setFilteredData] = useState([]); // State for filtered resort data
  const [allResortData, setAllResortData] = useState([]); // State for all resort data

  

  // Fetch resort data from the API
  const fetchResortData = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Check if API link is defined in environment variables
      if (!import.meta.env.VITE_API_Link) {
        throw new Error("API link is not defined in environment variables.");
      }

      // Fetch resort data
      const response = await fetch(`${import.meta.env.VITE_API_Link}/allResorts`);

      // Handle API errors
      if (!response.ok) {
        throw new Error(
          `Error fetching resort data: ${response.status} ${response.statusText}`
        );
      }

      // Parse and update resort data
      const data = await response.json();

      // Ensure the response has the expected structure
      if (data) {
        setResortData(data);
        setFilteredData(data);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      // Handle errors and show user-friendly message
      console.error("Error fetching resort data:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch resort data. Please try again later.",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch all resort data from the API
  const fetchAllResorts = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Check if API link is defined in environment variables
      if (!import.meta.env.VITE_API_Link) {
        throw new Error("API link is not defined in environment variables.");
      }

      // Fetch all resort data
      const url = `${import.meta.env.VITE_API_Link}/allResorts`;
      const response = await fetch(url);

      // Handle API errors
      if (!response.ok) {
        throw new Error(
          `Error fetching all resort data: ${response.status} ${response.statusText}`
        );
      }

      // Parse and update all resort data
      const data = await response.json();
      setAllResortData(data);
    } catch (error) {
      // Handle errors and show user-friendly message
      console.error("Error fetching all resort data:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch all resort data. Please try again later.",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch user data from the backend based on email
  const fetchUserData = async (email) => {
    try {
      // Check if API link is defined in environment variables
      if (!import.meta.env.VITE_API_Link) {
        throw new Error("API link is not defined in environment variables.");
      }

      // Fetch user data
      const userDataResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );

      // Handle API errors
      if (!userDataResponse.ok) {
        throw new Error("Failed to fetch user data from backend");
      }

      // Parse and update user data
      const userData = await userDataResponse.json();
      setUser(userData);
    } catch (error) {
      // Handle errors and show user-friendly message
      console.error("Error fetching user data:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch user data. Please try again later.",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch all resort data when the component mounts
  useEffect(() => {
    fetchAllResorts();
    fetchResortData();
  }, []);

  // Context value to be provided to the app
  const authInfo = {
    loading,
    user,
    resortData,
    filteredData,
    allResortData,
    fetchResortData,
  };

  // Provide the context value to the app
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;