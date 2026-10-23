import { FILTER_FOODS, SET_FOODS } from "./ActionTypes";

const initialFoodsState = {
  foods: [],
  filteredFoods: [],
};

export const foodsReducer = (state = initialFoodsState, action) => {
  switch (action.type) {
    case SET_FOODS:
      return { ...state, foods: action.payload, filteredFoods: action.payload };
    case FILTER_FOODS:
      const {
        filterName = "",
        filterCategory = "",
        filterPrice,
      } = action.payload;

      let filtered = [...state.foods];

      if (filterName.trim()) {
        filtered = filtered.filter((food) =>
          food.name.toLowerCase().includes(filterName.toLowerCase())
        );
      }

      if (filterCategory.trim()) {
        filtered = filtered.filter((food) =>
          food.category.toLowerCase().includes(filterCategory.toLowerCase())
        );
      }

      if (filterPrice != null && filterPrice !== "") {
        filtered = filtered.filter((food) => food.price <= Number(filterPrice));
      }

      return { ...state, filteredFoods: filtered };

    default:
      return state;
  }
};
