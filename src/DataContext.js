import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [meals, setMeals] = useState([]);

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        recipes,
        setRecipes,
        selectedMealId,
        setSelectedMealId,
        selectedRecipeId,
        setSelectedRecipeId,
        meals,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
