const mealsTime = [
  { time: "Сніданок", photo: require("../../img/breakfast.jpg") },
  { time: "Обід", photo: require("../../img/lunch.jpg") },
  { time: "Вечеря", photo: require("../../img/dinner.jpg") },
  { time: "Перекус", photo: require("../../img/snack.jpg") },
];
const dishes = [];

export const getMealsTime = () => {
  return mealsTime;
};
export const addMealsTime = (meal) => {
  mealsTime.push(meal);
};

export const addDish = (dish) => {
  dishes.push(dish);
};
export const getDish = () => {
  return dishes;
};
