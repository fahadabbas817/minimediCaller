import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { NavLink } from 'react-router-dom';
const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Simulator",
    link: "/simulation",
  },
  {
    name: "Feedback",
    link: "/feedback",
  },
  {
    name: "Report",
    link: "/reports",
  },

];
const Header = () => {
  const location = useLocation()
  return (
   <header className='container flex justify-between mt-8 mx-auto '>
    <h1 className='text-4xl font-bold text-gray-100'>MetaMindAI</h1>
   <nav className='flex gap-4 text-gray-300'>
   {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className={({ isActive }) =>
                  `transition-all ease-in duration-100 cursor-pointer text-gray-200 p-1 sm:p-3 text-sm sm:text-base lg:text-xl rounded-md sm:rounded-full px-3 lg:px-6 hover:backdrop-blur-md ${
                    isActive
                      ? " text-teal-900 bg-white/75 font-semibold  " // Active styles
                      : "hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
    {/* <Link className={`${location.pathname==='/'&&'bg-white/75 text-teal-800'} hover:bg-white/75 transition-all ease-in hover:text-teal-800 p-2 px-6 rounded-2xl text-xl font-semibold`} to={'/'}>Home</Link>
    <Link className={`${location.pathname==='/simulation'&&'bg-white/75 text-teal-800'} hover:bg-white/75 transition-all ease-in hover:text-teal-800 p-2 px-6 rounded-2xl  text-xl font-semibold`} to={'/simulation'}>Simulation</Link>
    <Link className={`${location.pathname==='/feedback'&&'bg-white/75 text-teal-800'} hover:bg-white/75 transition-all ease-in hover:text-teal-800 p-2 px-6 rounded-2xl  text-xl font-semibold`} to={'/feedback'}>Feedback</Link>
    <Link className={`${location.pathname==='/reports'&&'bg-white/75 text-teal-800'} hover:bg-white/75 transition-all ease-in hover:text-teal-800 p-2 px-6 rounded-2xl text-xl font-semibold`} to={'/reports'}>Report</Link> */}
   </nav> 
   </header>
  )
}

export default Header