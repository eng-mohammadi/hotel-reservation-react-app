import React, { useState } from "react";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";
import { Outlet, Link } from "react-router-dom";

const Accounting = () => {
  const [flag, setFlag] = useState(false);

  const changeStateHandler = () => {
    setFlag(!flag);
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      <div className="accounting-links">
        <ul>
          <li style={{ display: flag ? "none" : "block" }}>
            <Link to="register" onClick={changeStateHandler}>
              ثبت نام
            </Link>
          </li>
          <li style={{ display: flag ? "block" : "none" }}>
            <Link to="login" onClick={changeStateHandler}>
              ورود
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Accounting;
