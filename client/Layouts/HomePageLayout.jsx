import React from 'react'
import Footer from '../src/Components/Footer'
import Navbar from '../src/Components/Navbar'

const HomePageLayout = ({children}) => {
  return (
    <div>
      <Navbar/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default HomePageLayout
