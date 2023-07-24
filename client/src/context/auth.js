import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  auth: { user: null, token: "" },
  setAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  const [notification, setNotification] = useState([]);

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider
      value={[auth, setAuth, notification, setNotification]}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

// import { createContext, useContext, useEffect, useState } from "react";
// // import axios from "axios";

// const AuthContext = createContext({
//   auth: { user: null, token: "" },
//   setAuth: () => {},
// });

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ user: null, token: "" });

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parsedData = JSON.parse(data);
//       setAuth(parsedData);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };
