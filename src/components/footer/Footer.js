import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <h4>هتل آنلاین</h4>
            <a href="#contact">تماس با ما</a>
            <a href="#about">درباره ما</a>
            <a href="#services">خدمات</a>
            <a href="#faq">سوالات متداول</a>
          </div>
          <div className="footer-links">
            <h4>اطلاعات تکمیلی</h4>
            <a href="#privacy">حریم خصوصی</a>
            <a href="#terms">شرایط استفاده</a>
            <a href="#sitemap">نقشه سایت</a>
          </div>
          <div className="footer-links">
            <h4>خدمات مشتریان</h4>
            <a href="#">گارانتی بهترین نرخ</a>
            <a href="#">نظرات هتل ها</a>
            <a href="#">راهنمای رزرو</a>
            <a href="#">قوانین رزرو</a>
          </div>
          <div className="footer-contact">
            <div className="title-contact">
              <p>تلفن پشتیبانی </p>
              <p>کد پستی</p>
            </div>
            <div className="info-contact">
              <p>021-36584222</p>
              <p>1234567890</p>
            </div>
          </div>
        </div>
        <div className="footer-social">
          <i className="fab fa-telegram-plane"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-facebook-f"></i>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
