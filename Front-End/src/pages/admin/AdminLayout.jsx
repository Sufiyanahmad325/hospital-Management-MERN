import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getAllDepartments, getAllDoctorAppointments, getAllDoctors, getAllPatients, todayAllAppointments } from '../../reduxtollkit/hospitalManagementSlice';
import { useDispatch } from 'react-redux';

function adminLayout() {
  const dispatch = useDispatch()
 useEffect(() => {
      // Fetch dashboard data here
      dispatch(getAllDoctors());
      dispatch(todayAllAppointments());
      dispatch(getAllDoctorAppointments());
      dispatch(getAllPatients());
      dispatch(getAllDepartments());
  }, [dispatch]);

  return (
    <div className='flex flex-col sm:flex-row sm:h-max-[100vh]'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default adminLayout