import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { useSelector } from "react-redux";




const App = () => {
  // const { data, isLoading, isSuccess, isError, message } = useSelector((state) => state.solar);

  // console.log(data)
  return (
    <Router>
     
  
     <Navbar/>
      <Routes>
      
      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
    

      </Routes>
    </Router>
  );
};

export default App;
