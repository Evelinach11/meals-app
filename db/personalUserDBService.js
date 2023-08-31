import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const addPersonalUser = (
  personalName,
  personalPhoto,
  personalAge,
  personalHeight,
  personalWeight,
  pesonalGoal
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO personalUser (name, photo, age, height, weight, goal) values (?, ?,?,?,?,?)",
        [
          personalName,
          personalPhoto,
          personalAge,
          personalHeight,
          personalWeight,
          pesonalGoal,
        ],
        (_, resultSet) => {
          resolve({
            id: resultSet.insertId,
            name: personalName,
            photo: personalPhoto,
            age: personalAge,
            heigth: personalHeight,
            weight: personalWeight,
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
        "UPDATE personalUser SET  name = ?, photo = ?, age = ?, height = ?, weight = ?, goal = ? WHERE id = 1",
        [
          newUser.currentName,
          newUser.currentPhoto,
          newUser.currentAge,
          newUser.currentHeight,
          newUser.currentWeight,
          newUser.currentGoal,
          newUser.id,
        ],
        (_, resultSet) => {
          resolve({
            id: newUser.id,
            name: newUser.currentName,
            photo: newUser.currentPhoto,
            age: newUser.currentAge,
            height: newUser.currentHeight,
            weight: newUser.currentWeight,
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
