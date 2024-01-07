import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const add = (meal) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO dishesMeal (date , typeOfMeals , recipe_id  ) values (?, ?, ?)",
        [meal.date, meal.typeOfMeals, meal.recipe_id],
        (_, resultSet) => {
          resolve({
            date: meal.date,
            typeOfMeals: meal.typeOfMeals,
            recipe_id: meal.recipe_id,
          });
        },
        (_, error) => console.log("error ", error)
      );
    });
  });
};

export const getAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM dishesMeal",
        null,
        (_, resultSet) => {
          const data = resultSet.rows._array;
          resolve(data);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const getByRecipeByMealsType = (typeOfMeals, date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT recipes.* , typeOfMeals FROM dishesMeal JOIN recipes ON dishesMeal.recipe_id = recipes.id WHERE typeOfMeals = ? AND date = ?",
        [typeOfMeals, date],
        (_, resultSet) => {
          const data = resultSet.rows._array;
          resolve(data);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const getByPersonalRecipeByMealsType = (typeOfMeals, date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT recipes.* , typeOfMeals FROM dishesMeal JOIN recipes ON dishesMeal.recipe_id = personalRecipe.id WHERE typeOfMeals = ? AND date = ?",
        [typeOfMeals, date],
        (_, resultSet) => {
          const data = resultSet.rows._array;
          resolve(data);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const deleteRecipeInMealsByRecipeId = (recipeId, typeOfMeals) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM dishesMeal WHERE recipe_id = ? AND typeOfMeals = ?",
        [recipeId, typeOfMeals],
        (_, resultSet) => {
          const data = resultSet.rows._array;
          resolve(data);
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
};

export const deleteRecipeById = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM dishesMeal WHERE recipe_id = ?",
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
        "SELECT * FROM dishesMeal WHERE ? = date",
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
        "SELECT * FROM dishesMeal WHERE ? = typeOfMeals",
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
