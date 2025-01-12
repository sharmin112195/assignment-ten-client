import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaSun, FaMoon } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const { user, logOut, isDarkMode, setIsDarkMode } = useContext(AuthContext);
  const location = useLocation(); 

  
  const toggleDarkMode = () => {
    if (location.pathname === "/") {
      setIsDarkMode((prevMode) => !prevMode);

      if (!isDarkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allData">All Sports Equipment</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      {user ? (
        <li>
          <NavLink to="/addEquipment">Add Equipment</NavLink>
        </li>
      ) : (
        ""
      )}
      {user ? (
        <li>
          <NavLink to="/emailMass">My Equipment List</NavLink>
        </li>
      ) : (
        ""
      )}
    </>
  );

  return (
    <>
    <div className="w-full justify-center flex my-6">
    <div className="pt-5 fixed w-[95%] bg-blue-50 top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-30 ">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex gap-1 text-center items-center justify-center text-blue-900">
            <img className="w-10 h-10 rounded-full" src={logo} alt="" />
            <h2 className="text-sm font-semibold hidden md:block">
              <span className="text-4xl font-semibold">S</span>ports
            </h2>
            <h2 className="text-sm hidden md:block">
              <span className="text-4xl font-semibold">E</span>quipment
            </h2>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end space-x-2">
          {user && user?.email ? (
            <div className="text-center space-x-2 image">
              <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
              <p className="name">{user.displayName}</p>
            </div>
          ) : (
            <p className="text-3xl text-blue-900">
              <FaRegCircleUser />
            </p>
          )}

          {user && user?.email ? (
            <button onClick={logOut} className="btn bg-blue-900 text-white">
              Logout
            </button>
          ) : (
            <>
              <Link to="/auth/login" className="btn bg-blue-900 text-white" data-tooltip-id="my-tooltip"
                data-tooltip-content="Please use your correct email and password">
                Login
              </Link>
              <NavLink to="/auth/register" className="btn bg-blue-900 text-white" data-tooltip-id="my-tooltip"
                data-tooltip-content="Please Register with your personal information">
                Register
              </NavLink>
            </>
          )}

          
          {location.pathname === "/" && (
            <button onClick={toggleDarkMode} className="btn bg-blue-900 text-white">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          )}
        </div>
      </div>
    </div>
    <Tooltip id="my-tooltip" />
    </div>
    </>
  );
};

export default Header;
