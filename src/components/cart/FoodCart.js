import React, { useEffect, useState } from "react";
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
  const [items, setItems] = useState(() => loadCart());

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const dispatch = useDispatch();
  const [addFoodReservation, { isLoading: isAddingFoodReservation }] =
    useAddFoodReservationMutation();
  const [editFoodReservation] = useEditFoodReservationMutation();
  const [quantity, setQuantity] = useState(
    selectedFoodReservation?.quantity || 0,
  );
  const [totalPrice, setTotalPrice] = useState(
    selectedFoodReservation?.totalPrice || 0,
  );

  const navigate = useNavigate();

  const removeFromCart = (foodName) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.foodName !== foodName),
    );
    dispatch(decreaseCounter());
  };

  const plusFoodHandler = (foodName) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.foodName === foodName ?
          {
            ...item,
            quantity: Number(item.quantity || 0) + 1,
            totalPrice:
              Number(item.foodPrice || 0) * (Number(item.quantity || 0) + 1),
          }
        : item,
      ),
    );

    if (selectedFoodReservation) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice + Number(selectedFoodReservation.foodPrice || 0),
      );
    }
  };

  const minusFoodHandler = (foodName) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.foodName !== foodName) return item;

        const nextQuantity = Math.max(1, Number(item.quantity || 1) - 1);
        return {
          ...item,
          quantity: nextQuantity,
          totalPrice: Number(item.foodPrice || 0) * nextQuantity,
        };
      }),
    );

    if (selectedFoodReservation) {
      setQuantity((prevQuantity) =>
        Math.max(
          Number(selectedFoodReservation.quantity || 1),
          prevQuantity - 1,
        ),
      );
      setTotalPrice((prevTotalPrice) =>
        Math.max(
          Number(selectedFoodReservation.totalPrice || 0),
          prevTotalPrice - Number(selectedFoodReservation.foodPrice || 0),
        ),
      );
    }
  };

  const submitFoodReservationHandler = (event) => {
    event.preventDefault();
    window.alert("سفارش غذای شما با موفقیت انجام شد");

    const cartItems = JSON.parse(
      window.localStorage.getItem("cartItems") || "[]",
    );

    cartItems.forEach((item) => {
      addFoodReservation(item);
    });

    navigate("/");
    window.localStorage.removeItem("cartItems");
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
                    />
                    <i
                      className="fas fa-minus"
                      onClick={() =>
                        minusFoodHandler(selectedFoodReservation.foodName)
                      }
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="total-price">
            <h3>جمع کل: {totalPrice.toLocaleString("fa-IR")} تومان</h3>
            <form onSubmit={submitEditFoodReservationHandler}>
              <button type="submit">ذخیره تغییرات</button>
            </form>
          </div>
        </div>
      )}

      {items.length === 0 && !selectedFoodReservation ?
        <h3 className="error-title">هنوز غذایی سفارش داده نشده است!</h3>
      : <div className="cart-box">
          <h2>لیست غذاهای رزرو اولیه</h2>

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
                <tr key={item.id ?? item.foodName}>
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
                      />
                      {item.quantity}
                      <i
                        className="fas fa-minus"
                        onClick={() => minusFoodHandler(item.foodName)}
                      />
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
              جمع کل:{" "}
              {items
                .reduce((acc, item) => acc + item.totalPrice, 0)
                .toLocaleString("fa-IR")}{" "}
              تومان
            </h3>
            <form onSubmit={submitFoodReservationHandler}>
              <button type="submit" disabled={isAddingFoodReservation}>
                تایید و پرداخت
              </button>
            </form>
          </div>
        </div>
      }

      <Footer />
    </React.Fragment>
  );
};

export default FoodCart;
