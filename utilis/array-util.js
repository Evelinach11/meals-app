export const deleteElementById = (array, id) => {
  if (array.length > 0) {
    return array.filter((recipe) => recipe.id !== id);
  }
};

export const getElementById = (array, id) => {
  if (array.length > 0) {
    return array.find((el) => el.id == id);
  }
};
