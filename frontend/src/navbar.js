import React from "react";
import Button from "./widgets";

function Navbar() {
  return (
    <div className="navbar-container">
      <a href="http://localhost:3000/" className="logo">
        Example
      </a>
      <div className="navbar-side">
        <Button>Twój profil</Button>
        <Button className="logout">Wyloguj się</Button>
      </div>
    </div>
  );
}

export default Navbar;
