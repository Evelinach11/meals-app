import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const addMeal = (meal) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO meals (title, photo, date, isSystem) values (?, ?, ?, ?)",
        [meal.title, meal.photo, meal.date, meal.isSystem],
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
        "SELECT COUNT(*) AS count FROM meals",
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
        "SELECT * FROM meals",
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
        "SELECT * FROM meals WHERE isSystem = 1",
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

export const fetchByDate = (date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meals WHERE date = ?",
        [date],
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

export const deleteNotSystemMealById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM meals WHERE id = ? AND isSystem = 0",
        [id],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log(`deleted personal meal with id = ${id}`);
            resolve(id);
          } else reject(console.log(`nothing delete by id: ${id}`));
        },
        (_, error) => console.log(`cannot delete personal meal with id = ${id}`)
      );
    });
  });
};
