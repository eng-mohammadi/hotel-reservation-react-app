import React, { useState } from "react";
import { loadCart, saveCart } from "../../utils/localStorage";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";
import {
  resetCounter,
  decreaseCounter,
} from "../../redux/counter/counterActions";
import { useDispatch } from "react-redux";
import {
  useAddFoodReservationMutation,
  useEditFoodReservationMutation,
} from "../../redux/services/foodReservationApi";
import { useNavigate } from "react-router-dom";

const FoodCart = ({ selectedFoodReservation }) => {
  const initialCart = loadCart();
  const [items, setItems] = useState(initialCart);
  const dispatch = useDispatch();
  const [addFoodReservation, { isLoading: isAddingFoodReservation }] =
    useAddFoodReservationMutation();
  const [editFoodReservation] = useEditFoodReservationMutation();
  const [quantity, setQuantity] = useState(
    selectedFoodReservation?.quantity || 0
  );
  const [totalPrice, setTotalPrice] = useState(
    selectedFoodReservation?.totalPrice || 0
  );

  const navigate = useNavigate();

  const removeFromCart = (foodName) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.foodName !== foodName);
      saveCart(newItems);
      dispatch(decreaseCounter());
      return newItems;
    });
  };

  const plusFoodHandler = (foodName) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.foodName === foodName
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.foodPrice * (item.quantity + 1),
            }
          : item
      );

      saveCart(newItems);
      return newItems;
    });

    setQuantity((prevQuantity) => prevQuantity + 1);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + selectedFoodReservation.foodPrice
    );
  };

  const minusFoodHandler = (foodName) => {
    setItems((prevItems) => {
      const newItem = prevItems.map((item) =>
        item.foodName === foodName
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              totalPrice:
                item.quantity > 1
                  ? item.foodPrice * (item.quantity - 1)
                  : item.foodPrice,
            }
          : item
      );

      saveCart(newItem);
      return newItem;
    });

    setQuantity((prevQuantity) =>
      prevQuantity > selectedFoodReservation.quantity
        ? prevQuantity - 1
        : selectedFoodReservation.quantity
    );
    setTotalPrice((prevTotalPrice) =>
      prevTotalPrice > selectedFoodReservation.totalPrice
        ? prevTotalPrice - selectedFoodReservation.totalPrice
        : selectedFoodReservation.totalPrice
    );
  };

  const submitFoodReservationHandler = (event) => {
    event.preventDefault();
    window.alert("سفارش غذای شما با موفقیت انجام شد");
    const items = JSON.parse(window.localStorage.getItem("cartItems") || []);
    items.forEach((item) => {
      addFoodReservation(item);
    });
    navigate("/");
    window.localStorage.clear("cartItems");
    dispatch(resetCounter());
  };

  const submitEditFoodReservationHandler = (event) => {
    event.preventDefault();
    editFoodReservation({
      id: selectedFoodReservation.id,
      quantity,
      totalPrice,
    });
    window.alert("تغییرات با موفقیت ذخیره شد");
    navigate("/booking-tracking");
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      {selectedFoodReservation && (
        <div className="food-reservation">
          <table>
            <thead>
              <tr>
                <th>نام غذا</th>
                <th>وعده</th>
                <th>قیمت واحد</th>
                <th>تعداد</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedFoodReservation.foodName}</td>
                <td>{selectedFoodReservation.foodCategory}</td>
                <td>
                  {selectedFoodReservation.foodPrice.toLocaleString("fa-IR")}
                  تومان
                </td>
                <td>{quantity}</td>
                <td>
                  <div className="quantity-control">
                    <i
                      className="fas fa-plus"
                      onClick={() =>
                        plusFoodHandler(selectedFoodReservation.foodName)
                      }
                    ></i>
                    <i
                      className="fas fa-minus"
                      onClick={() =>
                        minusFoodHandler(selectedFoodReservation.foodName)
                      }
                    ></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="total-price">
            <h3>
              جمع کل:
              {totalPrice.toLocaleString("fa-IR")}
              تومان
            </h3>
            <form onSubmit={(event) => submitEditFoodReservationHandler(event)}>
              <button type="submit">ذخیره تغییرات</button>
            </form>
          </div>
        </div>
      )}
      {items.length === 0 && !selectedFoodReservation ? (
        <h3 className="error-title">هنوز غذایی سفارش داده نشده است!</h3>
      ) : (
        <div className="cart-box">
          <h2>لیست غذای های رزرو اولیه</h2>
          <table>
            <thead>
              <tr>
                <th>نام غذا</th>
                <th>وعده</th>
                <th>قیمت واحد</th>
                <th>تاریخ رزرو</th>
                <th>ساعت</th>
                <th>قیمت کل</th>
                <th>تعداد</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.foodName}</td>
                  <td>{item.foodCategory}</td>
                  <td>{item.foodPrice.toLocaleString("fa-IR")} تومان</td>
                  <td>{item.date}</td>
                  <td>{item.hour}</td>
                  <td>{item.totalPrice.toLocaleString("fa-IR")} تومان</td>
                  <td>
                    <div className="quantity-control">
                      <i
                        className="fas fa-plus"
                        onClick={() => plusFoodHandler(item.foodName)}
                      ></i>
                      {item.quantity}
                      <i
                        className="fas fa-minus"
                        onClick={() => minusFoodHandler(item.foodName)}
                      ></i>
                    </div>
                  </td>
                  <td>
                    <i
                      className="fas fa-trash"
                      onClick={() => removeFromCart(item.foodName)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-price">
            <h3>
              جمع کل:
              {items
                .reduce((acc, item) => acc + item.totalPrice, 0)
                .toLocaleString("fa-IR")}
              تومان
            </h3>
            <form onSubmit={(event) => submitFoodReservationHandler(event)}>
              <button type="submit" disabled={isAddingFoodReservation}>
                تایید و پرداخت
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default FoodCart;
