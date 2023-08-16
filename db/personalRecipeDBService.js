import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const addPersonalRecipe = (
  recipeName,
  recipeCategory,
  recipeTime,
  recipePhoto
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO personalRecipe (title, category, time, photo, isLike) values (?, ?, ?, ?,?)",
        [recipeName, recipeCategory, recipeTime, recipePhoto, false],
        (_, resultSet) => {
          resolve({
            id: resultSet.insertId,
            title: recipeName,
            category: recipeCategory,
            time: recipeTime,
            photo: recipePhoto,
            isLike: false,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const getAllByPersonalRecipe = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM personalRecipe",
        null,
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const markLikeRecipe = (id, isLike) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE personalRecipe SET isLike = ?  WHERE id = ? ",
      [isLike, id],
      (_, resultSet) => {},
      (_, error) => {
        console.error("Error executing SQL query:", error);
      }
    );
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

export const updatePersonalRecipe = (newRecipe) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE personalRecipe SET title = ?, category = ?, time = ?, photo = ? WHERE id = ?",
        [
          newRecipe.currentName,
          newRecipe.currentCategory,
          newRecipe.currentTime,
          newRecipe.currentPhoto,
          newRecipe.id,
        ],
        (_, resultSet) => {
          console.log(newRecipe);
          resolve({
            id: newRecipe.id,
            title: newRecipe.currentName,
            category: newRecipe.currentCategory,
            time: newRecipe.currentTime,
            photo: newRecipe.currentPhoto,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};
