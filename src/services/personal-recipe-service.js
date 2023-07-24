import { deleteElementById } from "../../utilis/array-util";
export let personalRecipes = [];

export const addPersonalRecipe = (data) => {
  if (validateRecipeData(data)) {
    const id = generateId();
    console.log(`added recipe with id: ${id}`);
    data.id = id;
    personalRecipes.push(data);
  }
};

export const deletePersonalRecipe = (id) => {
  personalRecipes = deleteElementById(personalRecipes, id);
};

export const getPersonalRecipeById = (id) => {
  if (personalRecipes.length > 0) {
    return personalRecipes.find((recipe) => recipe.id === id);
  }
};

export const getAllPersonalRecipe = () => {
  if (personalRecipes.length > 0) {
    return personalRecipes;
  }
  return [];
};

const generateId = () => {
  return personalRecipes.length;
};

const validateRecipeData = (data) => {
  if (data === undefined || null) {
    return false;
  }
  if (!data.title) {
    return false;
  }
  return true;
};
