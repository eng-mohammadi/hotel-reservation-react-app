import React from "react";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";

const Support = () => {
  return (
    <React.Fragment>
      <NavbarMenu />
      <div className="support">
        <h2>پشتیبانی</h2>
        <p>در صورت بروز هرگونه مشکل، لطفا با ما تماس بگیرید.</p>
        <p>راه های ارتباطی با ما:</p>
        <ul>
          <li>
            <a href="tel:+123456789">تلفن: +123456789</a>
          </li>
          <li>
            <a href="mailto:support@example.com">ایمیل: support@example.com</a>
          </li>
        </ul>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Support;
