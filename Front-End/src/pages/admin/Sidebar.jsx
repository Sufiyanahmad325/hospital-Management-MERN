import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboardCustomize, MdMenu } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import { CiViewList } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import {useDispatch} from 'react-redux'
import { logoutUser } from "../../reduxtollkit/hospitalManagementSlice";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const disptach = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async() => {
   const res = await disptach(logoutUser()).unwrap()
   if(res.success){
        localStorage.removeItem('role')
        alert(res.message)
        navigate('/')
   }
  };



  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 bg-blue-400 py-2 px-3 rounded"
      : "flex items-center gap-2 py-2 px-3 hover:bg-blue-600 rounded";

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="sm:hidden flex justify-between items-center bg-blue-500 text-white p-3">
        <h2 className="font-bold">Admin Panel</h2>
        <button onClick={() => setShow(!show)}>
          <MdMenu size={24} />
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          ${show ? "block" : "hidden"}
          sm:block
          w-[100vw] sm:w-[25vw]
          h-[30vh]
          sm:h-screen
          bg-blue-500
          text-white
          p-4
        `}
      >
        <h2 className="hidden sm:block text-lg font-bold mb-4">Admin Panel</h2>

        <nav className="space-y-1">
          <NavLink to="/admin/dashboard" className={linkStyle}>
            <MdDashboardCustomize />
            Dashboard
          </NavLink>

          <NavLink to="/admin/doctors" className={linkStyle}>
            <FaUserDoctor />
            Doctors
          </NavLink>

          <NavLink to="/admin/departments" className={linkStyle}>
            <FcDepartment />
            Departments
          </NavLink>

          <NavLink to="/admin/patients" className={linkStyle}>
            <IoPeople />
            Patients
          </NavLink>

          <NavLink to="/admin/appointments" className={linkStyle}>
            <CiViewList />
            Appointments
          </NavLink>


          <button onClick={handleLogout} className={`flex gap-3 items-center p-2 hover:bg-blue-600 w-full rounded-md`}>
            <CiLogout />
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
