import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainNavbar.css";
import EditProfile from "./EditProfile";
import AddTask from "./AddTask";

const MainNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="navbar-wrapper">
      <h1>TaskFlow</h1>
      <div className="profileSection">
        <img
          src={
            user?.profilePicture ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          onClick={toggleDropdown}
        />

        {dropdownOpen && (
          <div className="dropdown">
            <div onClick={() => setShowEdit(true)} className="dropdownItem">
              Edit Profile
            </div>
            <div onClick={handleLogout} className="dropdownItem">
              Logout
            </div>
          </div>
        )}

        {showEdit && <EditProfile onClose={() => setShowEdit(false)} />}
      </div>
    </div>
  );
};

export default MainNavbar;
