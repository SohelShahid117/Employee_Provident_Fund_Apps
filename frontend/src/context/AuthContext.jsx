import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true)

//   const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // console.log("hello")
        const token = localStorage.getItem("token");
        console.log(token)
        if (token) {
          const responseData = await axios.get(
            "http://localhost:3000/api/auth/verify",
            {
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            }
          );
          console.log(responseData);
          if (responseData.data.success) {
            setUser(responseData.data.user);
          }
        } else {
        //   navigate("/login");
          setUser(null)
        }
      } catch (err) {
        console.log(err);
        if (err.response && !err.response.data.error) {
          console.log("hello");
        //   navigate("/login");
          setUser(null)
        }
      }finally{
        setLoading(false)
      }
    };
    verifyUser();
  }, []);

  const loginUser = (user) => {
    setUser(user);
  };

  const logOutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, loginUser, logOutUser,loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthContext;
