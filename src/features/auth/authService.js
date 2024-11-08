import axios from "axios";

const API_URL = "/api/user";
// const SOLAR_API_URL = "http://localhost:7500/api/solar"; 

// Register user
const register = async (formData) => {
  const response = await axios.post(API_URL + "/register", formData);
  console.log("res", response);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

// Log in user
const logIn = async (formData) => {
  const response = await axios.post(API_URL + "/login", formData);
  console.log("log", response);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};



const authServices = {
  register,
  logIn,
 
};

export default authServices;
