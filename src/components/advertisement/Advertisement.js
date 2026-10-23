import React from "react";
import advertisementImage from "../../images/advertisement/student.jpeg";

const Advertisement = () => {
  return (
    <React.Fragment>
      <aside className="advertisement">
        <div className="advertisement-image">
          <img src={advertisementImage} alt="Advertisement" />
        </div>
        <h3>آکادمی آنلاین درسمن</h3>
        <h3>
          یادگیری <span>بدون مرز</span>
        </h3>
        <p>بهترین و کامل ترین دوره های برنامه نویسی اینجاست!</p>
        <p>
          با درسمن، یادگیری را آغاز کنید، مهارت‌های کاربردی کسب کنید و آماده
          ورود به بازار کار شوید. مسیر موفقیت شما از اینجا شروع می‌شود.
        </p>
        <button type="button">شروع یادگیری</button>
      </aside>
    </React.Fragment>
  );
};

export default Advertisement;
