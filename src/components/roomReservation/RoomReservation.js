import React from "react";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";
import { Outlet, Link } from "react-router-dom";

const Reservation = () => {
  return (
    <React.Fragment>
      <NavbarMenu />
      <hr />
      <div className="reservation-links">
        <ul>
          <li>
            <Link to="newReservation">رزرو اتاق جدید</Link>
          </li>
          <li>
            <Link to="editReservation">ویرایش رزرو اتاق</Link>
          </li>
        </ul>
      </div>
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Reservation;
