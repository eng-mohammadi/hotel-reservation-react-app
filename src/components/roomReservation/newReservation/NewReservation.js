import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { reservationValidate } from "../../../utils/validation";
import { useAddRoomReservationMutation } from "../../../redux/services/roomReservationApi";

const NewReservation = () => {
  const [addRoomReservation] = useAddRoomReservationMutation();

  return (
    <React.Fragment>
      <div className="reservation-form">
        <fieldset>
          <legend>فرم رزرو</legend>
          <Formik
            initialValues={{
              name: "",
              family: "",
              phone: "",
              checkIn: "",
              checkOut: "",
              guests: "",
              roomType: "",
              specialRequests: "",
            }}
            validate={reservationValidate}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                setSubmitting(false);
                addRoomReservation(values);
                resetForm();
                window.alert("رزرو شما با موفقیت ثبت شد");
              }, 3000);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="name">*نام</label>
                      </td>
                      <td>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          placeholder="نام"
                          autoComplete="off"
                        />
                      </td>
                      <td>
                        <label htmlFor="family">*نام خانوادگی</label>
                      </td>
                      <td>
                        <Field
                          type="text"
                          name="family"
                          id="family"
                          placeholder="نام خانوادگی"
                          autoComplete="off"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="error-message" colSpan={2}>
                        <ErrorMessage name="name" component="span" />
                      </td>
                      <td className="error-message" colSpan={2}>
                        <ErrorMessage name="family" component="span" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="phone">*تلفن</label>
                      </td>
                      <td>
                        <Field
                          type="text"
                          name="phone"
                          id="phone"
                          placeholder="با پیش شماره 09"
                          autoComplete="off"
                        />
                      </td>
                      <td>
                        <label htmlFor="checkIn">*تاریخ ورود</label>
                      </td>
                      <td>
                        <Field
                          type="date"
                          name="checkIn"
                          id="checkIn"
                          autoComplete="off"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="error-message" colSpan={2}>
                        <ErrorMessage name="phone" component="span" />
                      </td>
                      <td className="error-message" colSpan={2}>
                        <ErrorMessage name="checkIn" component="span" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="checkOut">*تاریخ خروج</label>
                      </td>
                      <td>
                        <Field
                          type="date"
                          name="checkOut"
                          id="checkOut"
                          autoComplete="off"
                        />
                      </td>
                      <td>
                        <label htmlFor="guests">*تعداد میهمان</label>
                      </td>
                      <td>
                        <Field
                          type="number"
                          name="guests"
                          id="guests"
                          min="1"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="error-message" colSpan={2}>
                        <ErrorMessage name="checkOut" component="span" />
                      </td>
                      <td className="error-message" colSpan={2}>
                        <ErrorMessage name="guests" component="span" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="roomType">*نوع اتاق</label>
                      </td>
                      <td>
                        <Field as="select" name="roomType" id="roomType">
                          <option value="select">نوع اتاق</option>
                          <option value="single">یک تخته لوکس</option>
                          <option value="double">دو تخته استاندارد</option>
                          <option value="suite"> سوئیت خانوادگی</option>
                        </Field>
                      </td>
                      <td>
                        <label htmlFor="specialRequests">
                          درخواست ویژه (اختیاری)
                        </label>
                      </td>
                      <td>
                        <Field
                          as="textarea"
                          name="specialRequests"
                          id="specialRequests"
                          placeholder="درخواست‌های خود را وارد کنید"
                          autoComplete="off"
                          rows="7"
                          cols="30"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="error-message" colSpan={2}>
                        <ErrorMessage name="roomType" component="span" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "در حال ثبت..." : "ثبت رزرو"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form>
            )}
          </Formik>
        </fieldset>
      </div>
    </React.Fragment>
  );
};

export default NewReservation;
