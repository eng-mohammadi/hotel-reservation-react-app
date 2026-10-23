export const loadCart = () => {
  try {
    const items = window.localStorage.getItem("cartItems");
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.log("خطا در بارگذاری سبد خرید", error);
    return [];
  }
};

export const saveCart = (cartItems) => {
  try {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log("خطا در ذخیره سبد خرید", error);
    return [];
  }
};
