import React, { useState } from "react";
import { filterFoods } from "../../../redux/foods/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  getFilteredFoods,
  getFilteredFoodsCount,
} from "../../../redux/foods/selectors";

const SearchFoodsBox = () => {
  const foods = useSelector((state) => getFilteredFoods(state) || []);
  const foodsCount = useSelector((state) => getFilteredFoodsCount(state));

  const dispatch = useDispatch();

  const [showResult, setShowResult] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState();

  const searchResultHandler = () => {
    dispatch(filterFoods({ filterName, filterCategory, filterPrice }));
    setShowResult(!showResult);
  };

  return (
    <React.Fragment>
      <div className="search-box">
        <h3>تعداد غذاها: {foodsCount}</h3>
        <h3>جستجوی غذا</h3>
        <div className="search-box__container">
          <input
            type="text"
            name="name"
            placeholder="نام غذا"
            autoComplete="off"
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}
          />
          <input
            type="text"
            name="category"
            placeholder="وعده غذایی"
            autoComplete="off"
            value={filterCategory}
            onChange={(event) => setFilterCategory(event.target.value)}
          />
          <input
            type="number"
            name="price"
            placeholder="حداکثر قیمت"
            autoComplete="off"
            value={filterPrice}
            onChange={(event) => setFilterPrice(event.target.value)}
          />
          <button type="button" onClick={searchResultHandler}>
            جستجو
          </button>
        </div>
        <div className="search-foods-result">
          {showResult &&
            Array.isArray(foods) &&
            foods.map((food) => (
              <div className="search-foods-result__items" key={food.id}>
                <h4>{food.name}</h4>
                <div className="search-foods-result__image">
                  <img src={food.image} alt={food.name} />
                </div>
                <p>قیمت: {food.price}</p>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchFoodsBox;
