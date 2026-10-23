import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetFoodsQuery } from "../../redux/services/foodsApi";
import { useGetAccountingQuery } from "../../redux/services/accountingApi";
import { loadCart, saveCart } from "../../utils/localStorage";
import {
  constantCounter,
  decreaseCounter,
  increaseCounter,
} from "../../redux/counter/counterActions";
import { useDispatch } from "react-redux";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";

const FoodDetails = () => {
  const { data: foods, isLoading, error } = useGetFoodsQuery();
  const { data: accounting } = useGetAccountingQuery();
  const params = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  if (error) {
    return <h1 className="error-title">خطا: {error}</h1>;
  }
  if (isLoading) {
    return <h2 className="loading-title">درحال بارگذاری...</h2>;
  }
  const food = foods.find((item) => item.name === params.name);
  if (!food) {
    return <h1 className="error-title">غذا یافت نشد</h1>;
  }

  const plusQuantityHandler = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    const cartItems = loadCart();
    if (cartItems.length === 0) {
      const newItems = {
        foodName: food.name,
        foodCategory: food.category,
        date: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`,
        hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
        foodPrice: food.price,
        totalPrice: food.price,
        quantity: 1,
      };
      saveCart([newItems]);
      dispatch(increaseCounter());
    } else if (cartItems.length > 0) {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.foodName === food.name
      );
      if (existingItemIndex !== -1) {
        const newQuantity = cartItems[existingItemIndex].quantity + 1;
        const totalPrice = newQuantity * food.price;
        const updatedItem = {
          ...cartItems[existingItemIndex],
          quantity: newQuantity,
          totalPrice: totalPrice,
        };
        saveCart([updatedItem]);
        dispatch(constantCounter());
      }
    }
  };

  const minusQuantityHandler = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    const cartItems = loadCart();
    const existingItems = cartItems.findIndex(
      (item) => item.foodName === food.name
    );
    if (existingItems !== -1) {
      const newQuantity =
        cartItems[existingItems].quantity > 0
          ? cartItems[existingItems].quantity - 1
          : 0;
      const totalPrice = newQuantity * food.price;
      const updatedItem = {
        ...cartItems[existingItems],
        quantity: newQuantity,
        totalPrice: totalPrice,
      };
      saveCart([updatedItem]);
      if (newQuantity === 0) {
        dispatch(decreaseCounter());
        window.localStorage.removeItem("cartItems");
      } else {
        dispatch(constantCounter());
      }
    }
  };

  const reservedFood = () => {
    if (accounting.length === 0) {
      window.alert(
        "لطفا برای رزرو غذا ابتدا از تب ورود/ثبت نام وارد حساب کاربری شوید."
      );
    } else {
      navigate("/cart");
    }
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      <div className="food-details">
        <h1 className="food-details__title">
          {food.category} - {food.name}
        </h1>
        <div className="food-details__content">
          <div className="food-details__image">
            <img src={food.image} alt={food.name} />
          </div>
          <div className="food-details__info">
            <p>قیمت: {food.price}تومان</p>
            {food.description && <p>شامل: {food.description}</p>}
            <div className="food-details__buttons">
              <div className="food-details__quantity">
                <i
                  className="fa fa-plus plus-icon"
                  onClick={plusQuantityHandler}
                ></i>
                <span>{quantity}</span>
                <i
                  className="fa fa-minus minus-icon"
                  onClick={minusQuantityHandler}
                ></i>
              </div>
              <button type="button" onClick={reservedFood}>
                سفارش غذا
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default FoodDetails;
