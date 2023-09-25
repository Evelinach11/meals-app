import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");
import { stepState } from "../utilis/steps-util";

export const saveStepsForRecipe = (
  recipeId,
  title,
  description,
  time,
  orderliness,
  state
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipe_steps ( recipe_id, title, description, time, orderliness, state) values (?, ?, ?, ?, ?, ?)",
        [recipeId, title, description, time, orderliness, state],
        (_, resultSet) => {
          resolve({
            id: resultSet.insertId,
            recipe_id: recipeId,
            title: title,
            description: description,
            time: time,
            orderliness: orderliness,
            state: state,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const updateStepsByRecipeId = (state, recipeId, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE recipe_steps SET state = ?  WHERE recipe_id = ? AND id = ?",
        [state, recipeId, id],
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, error) => {
          console.error("Error executing SQL query:", error);
        }
      );
    });
  });
};

export const resetStatesByRecipeId = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE recipe_steps SET state = ?  WHERE recipe_id = ?",
        [stepState.wait, recipeId],
        (_, resultSet) => {
          console.log(resultSet);
          console.log("reset");
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
