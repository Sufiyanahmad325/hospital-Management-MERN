import React from 'react'
import DoctorSidebar from './doctorSidebar'
import { Outlet } from 'react-router-dom'

function DoctorLayout() {
  return (
    <div className='flex flex-col sm:flex-row'>
      <DoctorSidebar />
      <Outlet />
    </div>
  )
}

export default DoctorLayout