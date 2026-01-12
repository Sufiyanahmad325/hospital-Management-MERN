import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function adminLayout() {
  return (
    <div className='flex flex-col sm:flex-row sm:h-max-[100vh]'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default adminLayout