import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user}= useSelector(state => state.auth)
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser(formData));
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    if(user){
      navigate('/')
    }

  }, [user]);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className=" w-20 p-4 m-3" style={{borderRadius:"40px",boxShadow:"rgba(133, 189, 215, 0.8784313725) 10px 30px 30px -15px"}} >
        <div className="heading">Sign In</div>
        <form action="" className="form-area my-3" onSubmit={handleSubmit}>
          <input
            required=""
            className="input w-100 p-3 border-0 rounded-5 m-1"
            style={{boxShadow:'#cff0ff 0px 10px 10px -5px'}}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            id="email"
            placeholder="E-mail"
          />
          <input
            required=""
            className="input w-100  p-3  border-0 rounded-5 m-1"
            style={{boxShadow:'#cff0ff 0px 10px 10px -5px'}}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />

          {/* <button  className=" btn login-button" type="submit" value="Sign In" /> */}
          <button className="btn w-100 btn-md login-button rounded-4">Sign In</button>
        </form>
        <span className="signup">
          <pre>
            Don't have an account?<Link to={"/register"}>Signup</Link>
          </pre>
        </span>
      </div>
    </div>
  );
};

export default Login;
