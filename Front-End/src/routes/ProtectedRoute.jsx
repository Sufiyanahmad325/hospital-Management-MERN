// src/routes/ProtectedRoute.jsx
// import { useCookies } from "react-cookie";
// import { Navigate } from "react-router-dom";
// import Cookies from 'js-cookie'

// const ProtectedRoute = ({ children, role }) => {
//   // const token = localStorage.getItem("token");
//   const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

//   // const token = Cookies.get('accessToken')
//   const token = cookies.accessToken;
//   const userRole = localStorage.getItem("role"); // admin / doctor / patient

//   if (!token) return <Navigate to="/" />;

//   // yaha kya logic hai ? answer in hindi => agar role defined hai aur userRole jo localStorage se mila hai wo role ke barabar nahi hai to navigate kar do login page pe


//   if (role && userRole !== role) return <Navigate to="/" />;

//   return children;
// };

// export default ProtectedRoute;


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkMe = async () => {
      try {
        const res = await axios.get("http://localhost:8000/hospital/auth/getMe", {
          withCredentials: true,
        });

        setUserRole(res.data.data.role);
      } catch (err) {
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkMe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (!userRole) return <Navigate to="/" replace />;

  if (role && userRole !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
