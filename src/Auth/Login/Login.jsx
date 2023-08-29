import React, { useState } from "react";
import "../Login/Login.css";
import "../../Utility/Utility.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="login">
      <form className="login__form rounded shadow" onSubmit={(e)=>e.preventDefault()}>
        <h2 className="text-center py-3 text-uppercase">ABC Hospital</h2>
        <p className="text-center login__des">
          Enter Your Email and Password To Login
        </p>
        <p className="bottom__line"></p>
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
            required
            value={email}
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
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login__btn">
         <Link className="btn btn-primary" to='/DoctorView'>
         Login
         </Link>
         
        </div>
      </form>
    </section>
  );
};

export default Login;

/*
import React, { useState } from "react";
import "../Login/Login.css";
import "../../Utility/Utility.css";
import { Link,  Navigate,  redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [nav, setNav] = useState(false)

  const login = () => {
    if (email === "" || password === "") {
      setError("Please Enter the Email and Password");
    } else {
      setError("")
      axios
        .post("http://localhost:3000/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.message) {
            console.log(response);
            console.log(response.data.message)
            setEmail("")
            setPassword("")
          }else {
            console.log(response.data[0])
            setNav(true)
            redirect('/DoctorView')
            // Navigate('/DoctorView')
          }
        });
    }
  };

  return (
    <section className="login">
      <form className="login__form rounded shadow" onSubmit={(e)=>e.preventDefault()}>
        <h2 className="text-center py-3 text-uppercase">ABC Hospital</h2>
        <p className="text-center login__des">
          Enter Your Email and Password To Login
        </p>
        <p className="bottom__line"></p>
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
            required
            value={email}
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
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login__btn">
         <Link className="btn btn-primary" to={nav === true ? '/DoctorView' : '/'} onClick={login}>
         Login
         </Link>
         
        </div>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </section>
  );
};

export default Login;
*/
