import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";

const DoctorSidebar = () => {

  const [openHamburger, setOpenHamburger] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 bg-green-500 text-white p-2 rounded"
      : "flex items-center gap-3 p-2 rounded hover:bg-green-100";

  return (
    <div className="w-full  sm:w-[25vw] sm:h-screen bg-green-300 p-4">

      {/* hambargar menu */}

      <div className="fixed right-5 mb-4 sm:hidden">
        <GiHamburgerMenu size={30} color="green" onClick={() => setOpenHamburger(prev => !prev)} />
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-bold text-green-700 mb-3">
        Doctor Panel
      </h2>

      {/* MENU */}
      <nav  className={`
          space-y-2 text-gray-700
          overflow-hidden
          transition-all duration-500 ease-in-out
          ${openHamburger ? "max-h-[300px]" : "max-h-0"}
          sm:max-h-full
        `}>

          

        <NavLink to="/doctor/dashboard" className={linkStyle}>
          <MdDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink to="/doctor/appointments" className={linkStyle}>
          <FaCalendarCheck size={20} />
          Appointments
        </NavLink>

        <NavLink to="/doctor/profile" className={linkStyle}>
          <IoPerson size={20} />
          My Profile
        </NavLink>

        <NavLink to="/logout" className={linkStyle}>
          <BiLogOut size={20} />
          Logout
        </NavLink>

      </nav>
    </div>
  );
};

export default DoctorSidebar;
