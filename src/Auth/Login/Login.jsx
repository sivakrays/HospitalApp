import React, { useContext, useEffect, useState } from "react";
import "../Login/Login.css";
import "../../Utility/Utility.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { get } from "../../ApiCalls/ApiCalls";
import { AuthContext } from "../../Context/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const [loginDetails, setLoginDetails] = useState("");

  const handleLogin = async () => {
    if (email === "" && password === "") {
      setError("Please Enter the Email and Password");
    } else {
      setError("");
      try{
        await login(email, password);
        navigate('/filterPatients')
      }
      catch(e){
        console.log(e)
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <section className="login">
      <form
        className="login__form rounded shadow"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-center py-3 text-uppercase">ABC Hospital</h2>
        <p className="text-center login__des">
          Enter Your Email and Password To Login
        </p>
        <p className="bottom__line"></p>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="login__input">
          <label htmlFor="" className="mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="" className="mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your Password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login__btn">
          <input
            type="submit"
            value="Login"
            className="btn text-white btn btn-primary"
          />
        </div>
      </form>
    </section>
  );
};

export default Login;
