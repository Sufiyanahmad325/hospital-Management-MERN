import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function adminLayout() {
  return (
    <div className='flex flex-col md:flex-row'>
    <Sidebar/>
    <Outlet/>
    </div>
  )
}

export default adminLayout