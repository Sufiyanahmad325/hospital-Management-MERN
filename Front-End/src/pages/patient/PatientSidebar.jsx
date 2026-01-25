import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../reduxtollkit/patientControlSlice";

const PatientSidebar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const handleLogout = async () => {
    let res = await dispatch(logoutUser()).unwrap()
    if (res.success) {
      alert(res.message)
    }
    localStorage.removeItem("role");
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 bg-blue-500 text-white p-2 rounded"
      : "flex items-center gap-3 p-2 rounded hover:bg-blue-100";

  return (
    <div className="w-full sm:w-[25vw] sm:h-screen bg-blue-300 p-4">
      {/* HAMBURGER (MOBILE) */}
      <div className="sm:hidden flex justify-between">
        <h2 className="text-xl font-bold text-blue-700 mb-1">Patient Panel</h2>
        <GiHamburgerMenu
          size={26}
          className="text-blue-600 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* TITLE */}
      <h2 className="hidden sm:block text-xl font-bold text-blue-700 mb-1">
        Patient Panel
      </h2>

      {/* MENU */}
      <nav
        className={`space-y-2 transition-all duration-300 h-[0vh] overflow-hidden sm:h-auto
        ${open ? "h-[50vw]" : ""}
        sm:block`}
      >
        <NavLink to="/patient/dashboard" className={linkStyle}>
          <MdDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink to="/patient/appointments" className={linkStyle}>
          <FaCalendarCheck size={20} />
          My Appointments
        </NavLink>

        <NavLink to="/patient/profile" className={linkStyle}>
          <IoPerson size={20} />
          My Profile
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex w-full rounded-md items-center gap-3 p-2 hover:bg-blue-100"
        >
          <BiLogOut size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default PatientSidebar;
