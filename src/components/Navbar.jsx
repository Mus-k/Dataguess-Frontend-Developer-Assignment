import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <navbar className="nav">
        <Link to="https://www.dataguess.com/">
          <img src="/logo.PNG" alt="dataguess-logo" />
        </Link>

        <ul>
          <li>
            <Link to="https://www.dataguess.com/form-toplanti">
              Toplantı Talep Edin
            </Link>
          </li>
        </ul>
      </navbar>
    </div>
  );
};

export default Navbar;
