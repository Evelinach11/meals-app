export const addCategoryForBaseRecipe = (category) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO categories (name) VALUES (?)",
      [category.name],
      (_, resultSet) => {
        console.log("Дані успішно додані до бази даних!");
      },
      (_, error) => console.log(error)
    );
  });
};

export const getCategoryForBaseRecipe = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories",
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
