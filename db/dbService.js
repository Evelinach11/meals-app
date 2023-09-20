import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const createTablesIfNotExist = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS dishesMeal (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, typeOfMeals TEXT, recipe_id INTEGER )"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, time TEXT, isLike BOOLEAN)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS ingredients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, count INTEGER, typeOfCount TEXT)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS recipe_ingredients (recipe_id INTEGER, ingredient_id INTEGER, isChecked BOOLEAN, FOREIGN KEY(recipe_id) REFERENCES recipes(id), FOREIGN KEY(ingredient_id) REFERENCES ingredients(id))"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS personalRecipe (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, time TEXT, photo TEXT, isLike BOOLEAN)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, photo TEXT, date TEXT, isSystem BOOLEAN)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS personalUser (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, photo TEXT, age INTEGER, weight INTEGER, height INTEGER, goal TEXT)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS recipe_steps (id INTEGER PRIMARY KEY AUTOINCREMENT, recipe_id INTEGER, title TEXT, description TEXT, time INTEGER, orderliness TEXT, state TEXT)"
    );
  });
};

export const showTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table'",
      [],
      (_, resultSet) => {
        const tables = resultSet.rows._array;
        console.log(tables);
      },
      (_, error) => {
        console.error("Error fetching tables:", error);
      }
    );
  });
};

export const dropTablesRecipes = () => {
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE IF EXISTS recipes`);
    tx.executeSql(`DROP TABLE IF EXISTS ingredients`);
    tx.executeSql(`DROP TABLE IF EXISTS recipe_ingredients`);
    tx.executeSql(`DROP TABLE IF EXISTS recipe_steps`);
  });
};

export const dropTablePersonalUser = () => {
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE IF EXISTS personalUser`);
  });
};

export const dropDishesMeal = () => {
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE IF EXISTS dishesMeal`);
  });
};

export const dropSteps = () => {
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE IF EXISTS recipe_steps`);
  });
};
