import { NavLink } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import { CiViewList } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-2 px-3 rounded-md transition 
     ${isActive ? "bg-blue-400 font-bold" : "hover:bg-blue-600"}`;

  return (
    <div className="w-[20vw] min-h-screen bg-blue-500 text-white p-4">
      <h2 className="text-xl font-bold mb-5">Admin Panel</h2>

      <hr className="mb-6" />

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <MdDashboardCustomize className="text-2xl" />
          Dashboard
        </NavLink>

        <NavLink to="/admin/doctors" className={linkClass}>
          <FaUserDoctor className="text-2xl" />
          Manage Doctors
        </NavLink>

        <NavLink to="/admin/departments" className={linkClass}>
          <FcDepartment className="text-2xl" />
          Manage Departments
        </NavLink>

        <NavLink to="/admin/patients" className={linkClass}>
          <IoPeople className="text-2xl" />
          View Patients
        </NavLink>

        <NavLink to="/admin/appointments" className={linkClass}>
          <CiViewList className="text-2xl" />
          Appointments
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
