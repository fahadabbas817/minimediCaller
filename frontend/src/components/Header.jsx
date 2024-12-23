import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
const navItems = [
      { label: 'Home', to: '/' },
      {  label: 'Simulation', to: '/simulation' },
      { label: 'Feedback', to: '/feedback' },
      {  label: 'Reports', to: '/reports' },
    ];
const Header = () => {
  const location = useLocation()
  return (
   <header className='container flex justify-between mt-8 mx-auto '>
    <h1 className='text-4xl font-bold text-gray-100'>MetaMindAI</h1>
   <nav className='flex gap-4 text-gray-300'>
    <Link className={`${location.pathname==='/'&&'bg-white/75 text-teal-800'} hover:bg-white/75 transition-all ease-in hover:text-teal-800 p-2 px-6 rounded-2xl text-xl font-semibold`} to={'/'}>Home</Link>
    <Link className={`${location.pathname==='/simulation'&&'bg-white/75 text-teal-800'} hover:bg-white/75 transition-all ease-in hover:text-teal-800 p-2 px-6 rounded-2xl  text-xl font-semibold`} to={'/simulation'}>Simulation</Link>
    <Link className={`${location.pathname==='/feedback'&&'bg-white/75 text-teal-800'} hover:bg-white/75 transition-all ease-in hover:text-teal-800 p-2 px-6 rounded-2xl  text-xl font-semibold`} to={'/feedback'}>Feedback</Link>
    <Link className={`${location.pathname==='/reports'&&'bg-white/75 text-teal-800'} hover:bg-white/75 transition-all ease-in hover:text-teal-800 p-2 px-6 rounded-2xl text-xl font-semibold`} to={'/reports'}>Report</Link>
   </nav> 
   </header>
  )
}

export default Header