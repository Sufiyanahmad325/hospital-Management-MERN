  import React from 'react'
import PatientSidebar from './PatientSidebar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllCancelledAppointment, getCompletedAppointment, getMyProfile, getUpComingAppointment } from '../../reduxtollkit/patientControlSlice'
import { useDispatch } from 'react-redux'

function PatientLayout() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getMyProfile())
    dispatch(getUpComingAppointment())
    dispatch(getCompletedAppointment())
    dispatch(getAllCancelledAppointment())
  },[])
  return (
    <div className='flex flex-col sm:flex-row'>
      <PatientSidebar/>
      <Outlet/>
    </div>
  )
}

export default PatientLayout