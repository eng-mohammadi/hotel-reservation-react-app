import React from "react";
import { useEditRoomReservationMutation } from "../../../redux/services/roomReservationApi";
import { Formik, Form, Field } from "formik";

const EditReservation = ({ selectedReservation }) => {
  const [editRoomReservation] = useEditRoomReservationMutation();

  if (!selectedReservation) {
    return <h3 className="error-title">رزرو انتخاب شده‌ای وجود ندارد</h3>;
  }

  return (
    <React.Fragment>
      <div className="edit-reservation">
        <div className="reservation-details">
          <h3>نام: {selectedReservation.name}</h3>
          <h3>نام خانوادگی: {selectedReservation.family}</h3>
          <h3>شماره تماس: {selectedReservation.phone}</h3>
        </div>
        <fieldset>
          <legend>ویرایش اطلاعات رزرو</legend>
          <Formik
            initialValues={{
              checkIn: selectedReservation.checkIn,
              checkOut: selectedReservation.checkOut,
              guests: selectedReservation.guests,
              roomType: selectedReservation.roomType,
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                setSubmitting(false);
                editRoomReservation({ id: selectedReservation.id, ...values });
                resetForm({
                  values: {
                    checkIn: "",
                    checkOut: "",
                    guests: "",
                    roomType: "select",
                    specialRequests: "",
                  },
                });
                window.alert("رزرو با موفقیت ویرایش شد");
              }, 3000);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-control">
                  <label htmlFor="checkIn">تاریخ ورود:</label>
                  <Field type="date" name="checkIn" id="checkIn" />
                </div>
                <div className="form-control">
                  <label htmlFor="checkOut">تاریخ خروج:</label>
                  <Field type="date" name="checkOut" id="checkOut" />
                </div>
                <div className="form-control">
                  <label htmlFor="guests">تعداد میهمان:</label>
                  <Field type="number" name="guests" id="guests" />
                </div>
                <div className="form-control">
                  <Field as="select" name="roomType" id="roomType">
                    <option value="select">نوع اتاق</option>
                    <option value="single">یک تخته لوکس</option>
                    <option value="double">دو تخته استاندارد</option>
                    <option value="suite"> سوئیت خانوادگی</option>
                  </Field>
                </div>
                <div className="form-control">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "در حال ویرایش..." : "ذخیره تغییرات"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </fieldset>
      </div>
    </React.Fragment>
  );
};

export default EditReservation;
