import { createContext, useEffect, useState } from "react";
import { get } from "../ApiCalls/ApiCalls";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await get(`/login?email=${email}&password=${password}`, config).then(
      (res) => setCurrentUser(res.data)
    );
  };

  const logout = async () => {
    localStorage.setItem("user",null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  });

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
