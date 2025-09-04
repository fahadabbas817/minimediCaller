import React from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Sidebar } from "./Sidebar";
import { useAppStore } from "@/Context/Zustand";

const navLinks = [
  { name: "Home", link: "/dashboard" },
  { name: "Simulator", link: "/simulation" },
  { name: "Report", link: "/reports" },
  { name: "Log Out", link: "/login" },
];

const Header = ({ isAuthenticated }) => {
  const input = useAppStore((state) => state.input);
  const location = useLocation();

  // Hide header for login/signup routes
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <header className={`${isAuthenticated?"bg-gradient-to-r from-emerald-500/90 to-emerald-900/90":"bg-transparent"} w-full fixed top-0 left-0 z-50  backdrop-blur-md`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          MetaMindAI
        </h1>

        {/* If Authenticated */}
        {isAuthenticated ? (
          <>
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-4 text-gray-100">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) =>
                    `transition-all ease-in-out duration-150 cursor-pointer text-sm sm:text-base lg:text-lg px-4 py-2 rounded-md
                     ${
                       isActive
                         ? "bg-white text-emerald-800 font-semibold shadow-md"
                         : "hover:bg-white/20 hover:text-white"
                     }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Nav */}
            <div className="md:hidden">
              <Sidebar />
            </div>
          </>
        ) : (
          /* If Not Authenticated */
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white border border-white hover:bg-white/20"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              className="bg-white text-emerald-700 hover:bg-gray-200 font-semibold"
              asChild
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
