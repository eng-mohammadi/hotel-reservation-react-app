import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidation } from "../../../utils/validation";
import { useGetAccountingQuery } from "../../../redux/services/accountingApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { data: accounting, isLoading, error } = useGetAccountingQuery();
  const navigate = useNavigate();

  if (error) {
    return <h1 className="error-title">خطا در بارگذاری اطلاعات</h1>;
  }
  if (isLoading) {
    return <h2 className="loading-title">در حال بارگذاری...</h2>;
  }

  return (
    <React.Fragment>
      <h2 className="accounting-title">ورود</h2>
      <div className="login-container">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={loginValidation}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setSubmitting(false);
              resetForm();
              accounting.forEach((user) => {
                if (
                  user.email === values.email &&
                  user.password === values.password
                ) {
                  window.alert("ورود موفقیت آمیز بود");
                  navigate("/roomReservation");
                } else if (
                  user.email !== values.email ||
                  user.password !== values.password
                ) {
                  window.alert("ایمیل یا رمز عبور اشتباه است");
                }
              });
              if (!accounting || accounting.length === 0) {
                window.alert("هیچ کاربری یافت نشد");
              }
            }, 3000);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-control">
                <label htmlFor="email">نام کاربری</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="ایمیل"
                />
                <ErrorMessage name="email" component="span" />
              </div>
              <div className="form-control">
                <label htmlFor="password">رمز عبور</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="رمز عبور"
                />
                <ErrorMessage name="password" component="span" />
              </div>
              <div className="form-button">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "در حال ارسال اطلاعات..." : "ورود"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Login;
