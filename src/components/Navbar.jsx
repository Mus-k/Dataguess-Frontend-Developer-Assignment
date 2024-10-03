import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <navbar className="nav">
        <Link to="https://www.dataguess.com/" className="logo">
        React Js
        </Link>

        <ul>
          <li>
            <Link to="https://www.dataguess.com/form-toplanti">
             Request
            </Link>
          </li>
        </ul>
      </navbar>
    </div>
  );
};

export default Navbar;
