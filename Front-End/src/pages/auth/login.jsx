import { NavLink, useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAllUsers } from "../../reduxtollkit/hospitalManagementSlice";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // console.log(userDetails)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let res = await dispatch(loginAllUsers({ email, password })).unwrap();
    if (res.success) {
      localStorage.setItem("role", res.data.role);
    }

    const role = localStorage.getItem("role");

    if (role === "admin") navigate("/admin/dashboard");
    if (role === "doctor") navigate("/doctor/dashboard");
    if (role === "patient") navigate("/patient/dashboard");

  };


 useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:8000/hospital/auth/getMe", {
          withCredentials: true,
        });

        const role = res.data?.data?.role; 

        // replace: true ka matlab hota hai  navigate karte time browser history me purana page remove (replace) kar dena. User ko new page pe bhej do aur back button se wapas us page pe na jaane do.
        if (role === "admin") navigate("/admin/dashboard", { replace: true });
        if (role === "doctor") navigate("/doctor/dashboard", { replace: true });
        if (role === "patient") navigate("/patient/dashboard", { replace: true });
      } catch (error) {
        console.log('not logged in -> stay on login page')
      }
    };

    checkLogin();
  }, [navigate]);

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-[url('/loginBackground.png')]
        bg-cover bg-center bg-no-repeat
        px-4
      "
    >
      <div
        className="w-full max-w-md sm:max-w-lg bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl flex flex-col items-center
        "
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">
          Hospital Login
        </h2>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border rounded-md px-3 py-2 mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-md px-3 py-2 mt-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-2
              rounded-md
              transition
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          You don’t have an account?{" "}
          <NavLink to="/register" className="text-blue-600 font-semibold">
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
