export const deleteElementById = (array, id) => {
  if (array.length > 0) {
    return array.filter((recipe) => recipe.id !== id);
  }
};
