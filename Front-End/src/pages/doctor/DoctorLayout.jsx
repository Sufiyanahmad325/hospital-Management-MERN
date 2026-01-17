import React, { useEffect } from 'react'
import DoctorSidebar from './doctorSidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getAllDayAppointment, getAllTodayAppointments, getDoctorDetails, getTodayAllPendingAppointment } from '../../reduxtollkit/doctorControlSlice';

function DoctorLayout() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTodayAppointments())
    dispatch(getTodayAllPendingAppointment())
    dispatch(getAllDayAppointment())
    dispatch(getDoctorDetails())
  }, [])
  return (
    <div className='flex flex-col sm:flex-row'>
      <DoctorSidebar />
      <div className='sm:max-h-[100vh] sm:overflow-y-auto'>
      <Outlet />
      </div>
    </div>
  )
}

export default DoctorLayout