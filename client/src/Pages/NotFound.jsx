import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const naviagate = useNavigate();

  return (
    <div className='h-screen w-full pb-[8rem]  flex flex-col justify-center items-center bg-[#1A2238] font-mono'>
      
      <h1 className='text-9xl font-extrabold text-white'>404</h1>
      <div className='bg-black text-white absolute px-2 text-sm rounded rotate-12'>
        Page not found ...
      </div>
      <button className='mt-6'>
        <a onClick={() => naviagate(-1)} className="relative inline-block text-sm font-medium  text-[#FF6A3D] active:text-blue-500 focus:outline-none" >
            <span  className='relative block px-8 py-3 bg-[#]1a2238] border border-current'>Go back</span>
        </a>
      </button>
    </div>
  )
}

export default NotFound
