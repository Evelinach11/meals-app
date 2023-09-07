import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const addPersonalUser = (
  personalName,
  personalPhoto,
  personalAge,
  personalWeight,
  personalHeight,
  pesonalGoal
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO personalUser (name, photo, age, height, weight, goal) values (?, ?, ?, ?, ?, ?)",
        [
          personalName,
          personalPhoto,
          personalAge,
          personalWeight,
          personalHeight,
          pesonalGoal,
        ],
        (_, resultSet) => {
          console.log(resultSet);
          resolve({
            id: resultSet.insertId,
            name: personalName,
            photo: personalPhoto,
            age: personalAge,
            weight: personalWeight,
            height: personalHeight,
            goal: pesonalGoal,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const getPersonalUserById = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM personalUser WHERE id = 1",
        null,
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const updateUser = (newUser) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE personalUser SET  name = ?, photo = ?, age = ?,  weight = ?,height = ?, goal = ? WHERE id = 1",
        [
          newUser.currentName,
          newUser.currentPhoto,
          newUser.currentAge,
          newUser.currentWeight,
          newUser.currentHeight,
          newUser.currentGoal,
          newUser.id,
        ],
        (_, resultSet) => {
          resolve({
            id: newUser.id,
            name: newUser.currentName,
            photo: newUser.currentPhoto,
            age: newUser.currentAge,
            weight: newUser.currentWeight,
            height: newUser.currentHeight,
            goal: newUser.currentGoal,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const deletePhotoFromProfileById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE personalUser SET photo = NULL WHERE id = 1",
        [id],
        (_, resultSet) => {
          resolve(resultSet.rowsAffected);
        },
        (_, error) => console.log(error)
      );
    });
  });
};
