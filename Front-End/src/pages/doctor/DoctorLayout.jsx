import React, { useEffect } from 'react'
import DoctorSidebar from './doctorSidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getAllTodayAppointments, getTodayAllPendingAppointment } from '../../reduxtollkit/doctorControlSlice';

function DoctorLayout() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getAllTodayAppointments())
    dispatch(getTodayAllPendingAppointment())
  },[])
  return (
    <div className='flex flex-col sm:flex-row'>
      <DoctorSidebar />
      <Outlet />
    </div>
  )
}

export default DoctorLayout