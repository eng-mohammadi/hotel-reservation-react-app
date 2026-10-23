import React from "react";
import { useGetFoodsQuery } from "../../../redux/services/foodsApi";
import FoodCard from "../foodCard/FoodCard";

const FoodCards = ({ flag, setFlag }) => {
  const { data: foods, isLoading, error } = useGetFoodsQuery();

  if (error) {
    return <h1 className="error-title">خطا: {error}</h1>;
  }
  if (isLoading) {
    return <h2 className="loading-title">در حال بارگذاری....</h2>;
  }

  return (
    <React.Fragment>
      <div
        className="food-cards"
        style={
          flag
            ? {
                overflow: "visible",
                height: "auto",
              }
            : { overflow: "hidden" }
        }
      >
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            foodName={food.name}
            foodImage={food.image}
            foodCategory={food.category}
            foodPrice={food.price}
            flag={flag}
          />
        ))}
        <div
          className="hide-show-icon__food"
          style={
            flag
              ? {
                  position: "absolute",
                  zIndex: "1",
                  bottom: "-25px",
                }
              : {}
          }
        >
          <i
            className="fa-solid fa-angle-up"
            style={flag ? { display: "block" } : { display: "none" }}
            onClick={setFlag}
          ></i>
          <i
            className="fa-solid fa-angle-down"
            style={flag ? { display: " none" } : { display: "block" }}
            onClick={setFlag}
            title="نمایش بیشتر"
          ></i>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodCards;
