import React, { useEffect, useState } from "react";
import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, lastname, password, password2, email } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ marginTop: "15%" }}
        >
          <form className="form" onSubmit={handleSubmit}>
            <p className="title">Register </p>
            <p className="message">
              Signup now and get full access to our app.{" "}
            </p>
            <div className="flex">
              <label>
                <input
                  required=""
                  placeholder="Firstname"
                  // type="text"
                  className="input"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
                <span></span>
              </label>

              <label>
                <input
                  required=""
                  placeholder="Lastname"
                  // type="text"
                  className="input"
                  name="lastname"
                  value={lastname}
                  onChange={handleChange}
                />
                <span></span>
              </label>
            </div>

            <label>
              <input
                required=""
                placeholder="Email"
                // type="email"
                className="input"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <span></span>
            </label>

            <label>
              <input
                required=""
                placeholder="Password"
                type="password"
                className="input"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <span></span>
            </label>
            <label>
              <input
                required=""
                placeholder="Confirm password"
                type="password"
                className="input"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
              <span></span>
            </label>
            <button className="submit">Submit</button>
            <p className="signin">
              Already have an acount ? <Link to={"/login"}>Signin</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
