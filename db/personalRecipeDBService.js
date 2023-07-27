import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const addPersonalRecipe = (recipeName, recipeCategory, recipeTime) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO personalRecipe (title, category, time) values (?, ?, ?)",
        [recipeName, recipeCategory, recipeTime],
        (_, resultSet) => {
          resolve({
            id: resultSet.insertId,
            title: recipeName,
            category: recipeCategory,
            time: recipeTime,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const deletePersonalRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM personalRecipe WHERE id = ?",
        [id],
        (_, resultSet) => {
          console.log(`deleted personal recipe with id = ${id}`);
          resolve(id);
        },
        (_, error) =>
          console.log(`cannot delete personal recipe with id = ${id}`)
      );
    });
  });
};
