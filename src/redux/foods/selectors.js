import { createSelector } from "reselect";

export const getFilteredFoods = createSelector(
  [(state) => state.foods.filteredFoods],
  (filteredFoods) => (filteredFoods ? [...filteredFoods] : [])
);

export const getFilteredFoodsCount = createSelector(
  [getFilteredFoods],
  (filteredFoods) => filteredFoods.length
);
