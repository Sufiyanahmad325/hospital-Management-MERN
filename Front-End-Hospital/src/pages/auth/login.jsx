// src/pages/auth/Login.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    let role = "admin"; // dummy role assignment based on email for demonstration
    let token = "dummy-token";

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    if (role === "admin") navigate("/admin/dashboard");
    if (role === "doctor") navigate("/doctor/dashboard");
    if (role === "patient") navigate("/patient/dashboard");
  };

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
