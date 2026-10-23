import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main-style.scss";
import Home from "./components/home/Home";
import RoomDetails from "./components/roomDetails/RoomDetails";
import FoodDetails from "./components/foodDetails/FoodDetails";
import RoomReservation from "./components/roomReservation/RoomReservation";
import EditReservation from "./components/roomReservation/editReservation/EditReservation";
import NewReservation from "./components/roomReservation/newReservation/NewReservation";
import Accounting from "./components/accounting/Accounting";
import Register from "./components/accounting/register/Register";
import Login from "./components/accounting/login/Login";
import FoodCart from "./components/cart/FoodCart";
import BookingTracking from "./components/bookingTracking/BookingTracking";
import Support from "./components/support/Support";

const App = () => {
  const [selectedRoomReservation, setSelectedRoomReservation] = useState(null);
  const [selectedFoodReservation, setSelectedFoodReservation] = useState(null);
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="rooms/:name" element={<RoomDetails />}></Route>
        <Route path="foods/:name" element={<FoodDetails />}></Route>
        <Route path="accounting" element={<Accounting />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="roomReservation" element={<RoomReservation />}>
          <Route path="newReservation" element={<NewReservation />}></Route>
          <Route
            path="editReservation"
            element={
              <EditReservation
                selectedRoomReservation={selectedRoomReservation}
              />
            }
          ></Route>
        </Route>
        <Route
          path="cart"
          element={
            <FoodCart selectedFoodReservation={selectedFoodReservation} />
          }
        ></Route>
        <Route
          path="booking-tracking"
          element={
            <BookingTracking
              setSelectedRoomReservation={setSelectedRoomReservation}
              setSelectedFoodReservation={setSelectedFoodReservation}
            />
          }
        ></Route>
        <Route path="support" element={<Support />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
