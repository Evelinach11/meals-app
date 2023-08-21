import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const addMeal = (meal) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO meal (title, photo, isSystem) values (?, ?, ?)",
        [meal.title, meal.photo, meal.isSystem],
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const isMealsTableEmpty = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) AS count FROM meal",
        [],
        (_, resultSet) => {
          const count = resultSet.rows.item(0).count;
          resolve(count === 0);
        },
        (_, error) => {
          console.error("Error executing SQL query:", error);
          reject(error);
        }
      );
    });
  });
};
export const fetchAllMeals = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meal",
        null,
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const fetchSystemMeals = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meal WHERE isSystem = 1",
        null,
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
