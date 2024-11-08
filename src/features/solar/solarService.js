import axios from "axios";

// API endpoint URL
const SOLAR_API_URL = "/api/solar";

// Function to fetch energy data using a date and token
const fetchEnergyData = async (date, token) => {
  try {
 
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    if (!date) {
      throw new Error("Date is missing");
    }
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Token being used:", token); 
    console.log("Date being used:", date); 

    const response = await axios.get(`${SOLAR_API_URL}/daily?date=${encodeURIComponent(date)}`, options);
    console.log("solar",response.data)

    return response.data;
  } catch (error) {
  
    console.error("Error fetching energy data:", error.response || error);

    throw error;
  }
};
const token = "your_valid_token_here"; 
fetchEnergyData()



// weekly
const getWeeklyData = async (startDate, endDate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,  // Add authorization header if necessary
    },
  };

  // Make the request to the backend API with startDate and endDate as query parameters
  const response = await axios.get(
    `${SOLAR_API_URL}/weekly?startDate=${startDate}&endDate=${endDate}`, 
    config
  );

  return response.data;
};








const solarServices = {
  fetchEnergyData,
  getWeeklyData
};

export default solarServices;
