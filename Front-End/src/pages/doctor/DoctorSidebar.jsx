import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { useCookies } from 'react-cookie'
import { useDispatch } from "react-redux";
import { logoutUser } from "../../reduxtollkit/doctorControlSlice";

const DoctorSidebar = () => {

  const [openHamburger, setOpenHamburger] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutDoctor = async () => {
    const res = await dispatch(logoutUser()).unwrap()
    if (res.success) {
      alert(res.message)
      localStorage.removeItem("role");
      navigate('/')
    }
  }

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 bg-green-500 text-white p-2 rounded"
      : "flex items-center gap-3 p-2 rounded hover:bg-green-100";

  return (
    <div className="w-full  sm:w-[25vw] sm:h-screen bg-green-300 p-4">

      {/* hambargar menu */}


      {/* TITLE */}
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-green-700 mb-3">
          Doctor Panel
        </h2>

        <div className=" right-5 mb-4 sm:hidden">
          <GiHamburgerMenu size={30} color="green" onClick={() => setOpenHamburger(prev => !prev)} />
        </div>
      </div>

      {/* MENU */}
      <nav className={`
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

        <button onClick={logoutDoctor} className={`flex gap-3 items-center p-2 hover:bg-green-100 w-full rounded-md`}>
          <BiLogOut size={20} />
          Logout
        </button>

      </nav>
    </div>
  );
};

export default DoctorSidebar;
