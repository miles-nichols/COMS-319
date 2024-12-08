import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column vh-100 p-3 bg-light"
      style={{ width: "250px" }}
    >
      <h2 className="text-center mb-4">Navigation</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link text-primary" : "nav-link text-dark"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? "nav-link text-primary" : "nav-link text-dark"
            }
          >
            View Contacts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/search-contacts"
            className={({ isActive }) =>
              isActive ? "nav-link text-primary" : "nav-link text-dark"
            }
          >
            Search Contact
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/add-contact"
            className={({ isActive }) =>
              isActive ? "nav-link text-primary" : "nav-link text-dark"
            }
          >
            Add Contact
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/delete-contact"
            className={({ isActive }) =>
              isActive ? "nav-link text-primary" : "nav-link text-dark"
            }
          >
            Delete Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
