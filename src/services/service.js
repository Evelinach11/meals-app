const mealsTime = ["Сніданок", "Обід", "Вечеря", "Перекус"];
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
