import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  // const getLocalStorageData = () => {
  //   try {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       let parsedUser = JSON.parse(storedUser);
  //       setUser(parsedUser);
  //       console.log("user", parsedUser);
  //     }
  //   } catch (err) {
  //     console.log("Error parsing user:", err);
  //   }
  // };
  // getLocalStorageData();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
