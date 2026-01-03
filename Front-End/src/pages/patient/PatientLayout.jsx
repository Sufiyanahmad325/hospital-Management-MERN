  import React from 'react'
import PatientSidebar from './PatientSidebar'
import { Outlet } from 'react-router-dom'

function PatientLayout() {
  return (
    <div className='flex flex-col sm:flex-row'>
      <PatientSidebar/>
      <Outlet/>
    </div>
  )
}

export default PatientLayout