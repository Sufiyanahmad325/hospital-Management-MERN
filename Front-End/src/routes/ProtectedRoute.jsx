// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // admin / doctor / patient

  if (!token) return <Navigate to="/" />;

  // yaha kya logic hai ? answer in hindi => agar role defined hai aur userRole jo localStorage se mila hai wo role ke barabar nahi hai to navigate kar do login page pe

  
  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
