export const registrationValidation = (data) => {
  const errors = {};

  if (!data.email.trim()) {
    errors.email = "فیلد ایمیل الزامی است";
  } else if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "ایمیل نامعتبر است";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "فیلد رمز عبور الزامی است";
  } else if (data.password.length < 8) {
    errors.password =
      "فیلد رمز عبور باید بیشتر از 8 کاراکتر و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر ویژه باشد";
  } else if (
    !data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
  ) {
    errors.password =
      "فیلد رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد";
  } else {
    delete errors.password;
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "فیلد تأیید رمز عبور الزامی است";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "رمز عبور و تأیید آن مطابقت ندارند";
  } else {
    delete errors.confirmPassword;
  }

  if (!data.terms) {
    errors.terms = "فیلد پذیرش شرایط الزامی است";
  } else {
    delete errors.terms;
  }

  return errors;
};

export const loginValidation = (data) => {
  const errors = {};

  if (!data.email.trim()) {
    errors.email = "فیلد ایمیل الزامی است";
  } else if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "ایمیل نامعتبر است";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "فیلد رمز عبور الزامی است";
  } else if (data.password.length < 8) {
    errors.password =
      "فیلد رمز عبور باید بیشتر از 8 کاراکتر و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر ویژه باشد";
  } else if (
    !data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
  ) {
    errors.password =
      "فیلد رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد";
  } else {
    delete errors.password;
  }

  return errors;
};

export const reservationValidate = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "فیلد نام الزامی است";
  } else if (data.name.length < 3) {
    errors.name = "فیلد نام باید بیشتر از 3 کاراکتر باشد";
  } else {
    delete errors.name;
  }

  if (!data.family.trim()) {
    errors.family = "فیلد نام خانوادگی الزامی است";
  } else if (data.family.length < 5) {
    errors.family = "فیلد نام خانوادگی باید بیشتر از 5 کاراکتر باشد";
  } else {
    delete errors.family;
  }

  if (!data.phone) {
    errors.phone = "فیلد تلفن الزامی است";
  } else if (!data.phone.length < 0 || data.phone.length < 11) {
    errors.phone = "فیلد تلفن باید شامل 11 رقم باشد";
  } else if (!data.phone.match(/^09\d{9}$/)) {
    errors.phone = "شماره تلفن نامعتبر است";
  } else {
    delete errors.phone;
  }

  if (!data.checkIn) {
    errors.checkIn = "تاریخ ورود الزامی است";
  } else {
    delete errors.checkIn;
  }

  if (!data.checkOut) {
    errors.checkOut = "تاریخ خروج الزامی است";
  } else {
    delete errors.checkOut;
  }

  if (!data.guests) {
    errors.guests = "تعداد میهمانان الزامی است";
  } else {
    delete errors.guests;
  }

  if (!data.roomType) {
    errors.roomType = "نوع اتاق الزامی است";
  } else {
    delete errors.roomType;
  }

  return errors;
};
