import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const getByRecipeId = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meals WHERE ? = recipe_id",
        [recipeId],
        (_, resultSet) => {
          const data = resultSet.rows._array;
          resolve(data);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const deleteRecipeById = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM meals WHERE recipe_id = ?",
        [recipeId],
        (_, resultSet) => {
          resolve(console.log(`deleted ${recipeId}`));
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const getAllMealsByDay = (day) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meals WHERE ? = day",
        [day],
        (_, resultSet) => {
          const data = resultSet.rows._array;
          resolve(data);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const getAllMealsByType = (typeOfMeals) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meals WHERE ? = typeOfMeals",
        [typeOfMeals],
        (_, resultSet) => {
          const data = resultSet.rows._array;
          resolve(data);
        },
        (_, error) => console.log(error)
      );
    });
  });
};
