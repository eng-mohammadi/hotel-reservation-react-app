import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarMenu = () => {
  const [sticky, setSticky] = useState(false);
  const cartItemsCount = useSelector((state) => state.counter.number);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <nav
        className="navbar-menu"
        style={
          sticky
            ? {
                position: "sticky",
                top: "0",
                zIndex: "10",
                backgroundColor: "#d1c192",
                borderRadius: "0 0 10px 10px",
                transition: "all 0.3s ease-in",
              }
            : null
        }
      >
        <div className="logo">
          <img src="/images/favicon/logo.jpg" alt="hotel" />
        </div>
        <div className="list-style">
          <ul>
            <li>
              <i className="fa-solid fa-house"></i>
              <Link
                to="/"
                style={sticky ? { "&:hover": { color: "#f9f9f9" } } : {}}
              >
                خانه
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-right-to-bracket"></i>
              <Link
                to="/accounting"
                style={sticky ? { "&:hover": { color: "#f9f9f9" } } : {}}
              >
                ورود/ثبت نام
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-bed"></i>
              <Link
                to="/roomReservation"
                style={sticky ? { "&:hover": { color: "#f9f9f9" } } : {}}
              >
                رزرو
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-suitcase-rolling"></i>
              <Link
                to="/booking-tracking"
                style={sticky ? { "&:hover": { color: "#f9f9f9" } } : {}}
              >
                پیگیری رزرو
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-headset"></i>
              <Link
                to="/support"
                style={sticky ? { "&:hover": { color: "#f9f9f9" } } : {}}
              >
                پشتیبانی
              </Link>
            </li>
          </ul>
        </div>
        <div className="foodCart-icon">
          <Link to="/cart">
            <span>({cartItemsCount})</span>
            <i className="fa-solid fa-utensils"></i>
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavbarMenu;
