import React, { useState } from "react";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";
import {
  filterRoomsByDate,
  filterFoodsByDate,
  setFoods,
  setRooms,
} from "../../redux/bookingTracking/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredFoodsByDate,
  selectFilteredRoomsByDate,
} from "../../redux/bookingTracking/selectors";
import {
  useGetFoodReservationQuery,
  useDeleteFoodReservationMutation,
} from "../../redux/services/foodReservationApi";
import {
  useGetRoomReservationQuery,
  useDeleteRoomReservationMutation,
} from "../../redux/services/roomReservationApi";
import { useNavigate } from "react-router-dom";

const BookingTracking = ({
  setSelectedRoomReservation,
  setSelectedFoodReservation,
}) => {
  const dispatch = useDispatch();
  const filteredRoomsByDate = useSelector((state) =>
    selectFilteredRoomsByDate(state || [])
  );
  const filteredFoodsByDate = useSelector((state) =>
    selectFilteredFoodsByDate(state || [])
  );
  const { data: roomReservation } = useGetRoomReservationQuery();
  const { data: foodReservation } = useGetFoodReservationQuery();
  const [deleteFoodReservation] = useDeleteFoodReservationMutation();
  const [deleteRoomReservation] = useDeleteRoomReservationMutation();
  const [foodReservationDate, setFoodReservationDate] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const searchRoomSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(setRooms(roomReservation));
    dispatch(
      filterRoomsByDate({
        checkInDate,
        checkOutDate,
      })
    );
    setFlag(!flag);
  };

  const deleteRoomReservationHandler = (roomId) => {
    deleteRoomReservation(roomId);
    dispatch(setRooms(roomReservation.filter((room) => room.id !== roomId)));
    dispatch(filterRoomsByDate({ checkInDate, checkOutDate }));
    window.alert(
      "اتاق رزرو شده در تاریخ " +
        checkInDate +
        " تا " +
        checkOutDate +
        " حذف شد."
    );
  };

  const editRoomReservationHandler = (room) => {
    navigate("/roomReservation/editReservation");
    setSelectedRoomReservation(room);
  };

  const searchFoodSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(setFoods(foodReservation));
    dispatch(filterFoodsByDate({ filterFoodDate: foodReservationDate }));
    setFlag(!flag);
  };

  const deleteFoodReservationHandler = (foodId, foodName) => {
    deleteFoodReservation(foodId);
    dispatch(setFoods(foodReservation.filter((food) => food.id !== foodId)));
    dispatch(filterFoodsByDate({ foodReservationDate }));
    window.alert("سفارش غذای " + foodName + " حذف شد.");
  };

  const editFoodReservationHandler = (food) => {
    setSelectedFoodReservation(food);
    navigate("/cart");
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      <hr />
      <div className="booking-tracking">
        <h3>در این بخش می‌توانید رزروهای ثبت شده خود را پیگیری کنید.</h3>
        <fieldset>
          <legend>پیگیری رزرو</legend>
          <form onSubmit={(event) => searchRoomSubmitHandler(event)}>
            <div className="search-reservation">
              <h4>جستجوی اتاق رزرو شده</h4>
              <label htmlFor="room-reservation-checkIn">تاریخ ورود رزرو:</label>
              <input
                type="date"
                name="roomReservationCheckIn"
                id="room-reservation-checkIn"
                value={checkInDate}
                onChange={(event) => setCheckInDate(event.target.value)}
              />
              <label htmlFor="room-reservation-checkOut">
                تاریخ خروج رزرو:
              </label>
              <input
                type="date"
                name="roomReservationCheckOut"
                id="room-reservation-checkOut"
                value={checkOutDate}
                onChange={(event) => setCheckOutDate(event.target.value)}
              />
            </div>
            <div className="booking-tracking__button">
              <button type="submit">جستجو</button>
            </div>
          </form>
          <form onSubmit={(event) => searchFoodSubmitHandler(event)}>
            <div className="search-reservation">
              <h4>جستجوی غذای سفارش شده</h4>
              <label htmlFor="food-reservation-date">تاریخ سفارش:</label>
              <input
                type="date"
                name="foodReservationDate"
                id="food-reservation-date"
                value={foodReservationDate}
                onChange={(event) => setFoodReservationDate(event.target.value)}
              />
            </div>
            <div className="booking-tracking__button">
              <button type="submit">جستجو</button>
            </div>
          </form>
        </fieldset>
        {flag ? (
          filteredRoomsByDate.length > 0 || filteredFoodsByDate.length > 0 ? (
            <React.Fragment>
              <h4 className="search-results-title">نتایج جستجو:</h4>
              <div className="booking-tracking__results">
                <div className="booking-tracking__room--result">
                  <table>
                    <thead>
                      <tr>
                        <th>نام رزرو کننده</th>
                        <th>تاریخ ورود</th>
                        <th>تاریخ خروج</th>
                        <th>تعداد میهمان</th>
                        <th>نوع اتاق</th>
                        <th>حذف</th>
                        <th>ویرایش</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRoomsByDate.map((room) => (
                        <tr key={room.id}>
                          <td>
                            {room.name} - {room.family}
                          </td>
                          <td>{room.checkIn}</td>
                          <td>{room.checkOut}</td>
                          <td>{room.guests}</td>
                          <td>{room.roomType}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                deleteRoomReservationHandler(room.id)
                              }
                              className="delete-button"
                            >
                              حذف
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="edit-button"
                              onClick={() => editRoomReservationHandler(room)}
                            >
                              ویرایش
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="booking-tracking__food--result">
                  <table>
                    <thead>
                      <tr>
                        <th>نام غذا</th>
                        <th>تاریخ رزرو</th>
                        <th>وعده</th>
                        <th>تعداد</th>
                        <th>حذف</th>
                        <th>ویرایش</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFoodsByDate.map((food) => (
                        <tr key={food.id}>
                          <td>{food.foodName}</td>
                          <td>{food.date}</td>
                          <td>{food.foodCategory}</td>
                          <td>{food.quantity}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                deleteFoodReservationHandler(
                                  food.id,
                                  food.foodName
                                )
                              }
                              className="delete-button"
                            >
                              حذف
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="edit-button"
                              onClick={() => editFoodReservationHandler(food)}
                            >
                              ویرایش
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <h3 className="search-results-none">نتیجه ای یافت نشد!</h3>
          )
        ) : null}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default BookingTracking;
