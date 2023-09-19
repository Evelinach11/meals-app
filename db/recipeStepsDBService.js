import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const saveStepsForRecipe = (
  recipeId,
  title,
  description,
  time,
  orderliness
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipe_steps ( recipe_id, title, description, time, orderliness) values (?, ?, ?, ?, ?)",
        [recipeId, title, description, time, orderliness],
        (_, resultSet) => {
          resolve({
            id: resultSet.insertId,
            recipe_id: recipeId,
            title: title,
            description: description,
            time: time,
            orderliness: orderliness,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const fetchSteps = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM recipe_steps ",
        null,
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
};

export const fetchStepsByRecipeId = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM recipe_steps WHERE recipe_id = ?",
        [recipeId],
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
};
