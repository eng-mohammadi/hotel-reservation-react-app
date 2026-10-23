import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { loadCart, saveCart } from "../../../utils/localStorage";
import { useGetAccountingQuery } from "../../../redux/services/accountingApi";
import {
  increaseCounter,
  constantCounter,
} from "../../../redux/counter/counterActions";
import { useDispatch } from "react-redux";

const FoodCard = ({ foodName, foodImage, foodPrice, foodCategory, flag }) => {
  const { data: accounting } = useGetAccountingQuery();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const likeNodeRef = useRef(null);
  const dislikeNodeRef = useRef(null);
  const dispatch = useDispatch();

  const reservedFoods = (event) => {
    event.preventDefault();

    if (accounting.length === 0) {
      window.alert(
        "لطفا برای رزرو غذا ابتدا از تب ورود/ثبت نام وارد حساب کاربری شوید."
      );
    } else {
      const cartItems = loadCart();
      const existingItemIndex = cartItems.findIndex(
        (item) => item.foodName === foodName
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = cartItems.map((item, index) => {
          if (index !== existingItemIndex) return item;

          let totalPrice = item.foodPrice;
          totalPrice += item.quantity * item.foodPrice;
          const newQuantity = item.quantity + 1;

          return {
            ...item,
            quantity: newQuantity,
            foodPrice,
            totalPrice,
          };
        });
        saveCart(updatedCartItems);
        dispatch(constantCounter());
      } else {
        const newItem = {
          foodName,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
          hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
          foodCategory,
          foodPrice,
          totalPrice: foodPrice,
          quantity: 1,
        };
        saveCart([...cartItems, newItem]);
        dispatch(increaseCounter());
      }
    }
  };

  return (
    <React.Fragment>
      <div
        className="food-card__box"
        style={flag ? { backgroundColor: "#bfddf8" } : {}}
      >
        <div className="food-image">
          <Link to={`/foods/${foodName}`}>
            <img src={foodImage} alt={`image_${foodName}`} />
          </Link>
        </div>
        <p className="food-name"> {foodName}</p>
        <p>وعده غذایی: {foodCategory}</p>
        <p>قیمت: {foodPrice.toLocaleString("fa-IR")} تومان</p>
        <div className="food-card__button">
          <div className="food-card__icons">
            <CSSTransition
              nodeRef={likeNodeRef}
              in={like}
              timeout={300}
              classNames="translate-like-icon"
            >
              <i
                className="fa-regular fa-thumbs-up"
                onClick={() => {
                  setLike(!like);
                  if (!like) setDislike(false);
                }}
                style={like ? { color: "yellowGreen" } : { color: "" }}
                ref={likeNodeRef}
              ></i>
            </CSSTransition>
            <CSSTransition
              nodeRef={dislikeNodeRef}
              in={dislike}
              timeout={300}
              classNames="translate-dislike-icon"
            >
              <i
                className="fa-regular fa-thumbs-down"
                onClick={() => {
                  setDislike(!dislike);
                  if (!dislike) setLike(false);
                }}
                style={dislike ? { color: "red" } : { color: "" }}
                ref={dislikeNodeRef}
              ></i>
            </CSSTransition>
          </div>
          <form onSubmit={reservedFoods}>
            <button type="submit">سفارش غذا</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodCard;
