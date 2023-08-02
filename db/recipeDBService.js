import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("meals.db");

export const fetchRecipes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT recipes.id AS recipe_id, recipes.title, recipes.category, recipes.time, ingredients.name, ingredients.count, ingredients.typeOfCount FROM recipes LEFT JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id LEFT JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id",
        null,
        (_, resultSet) => {
          const data = resultSet.rows._array;
          const recipesWithIngredients = groupRecipesWithIngredients(data);
          resolve(recipesWithIngredients);
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
};

export const isRecipeTableEmpty = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) AS count FROM recipes",
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

export const addRecipe = (recipe) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipes (title, category, time) values (?, ?, ?)",
        [recipe.title, recipe.category, recipe.time],
        (_, resultSet) => {
          const ingredients = recipe.ingredients;
          for (let i = 0; i < ingredients.length; i++) {
            let currentIngredient = ingredients[i];
            saveIngredientsForRecipe(
              currentIngredient.name,
              currentIngredient.count,
              currentIngredient.typeOfCount
            )
              .then((savedIngredient) => {
                linkIngredientsToRecipe(resultSet.insertId, savedIngredient.id);
              })
              .catch((error) => console.log(error));
          }
          resolve({
            id: resultSet.insertId,
            title: recipe.title,
            category: recipe.category,
            time: recipe.time,
            ingredients: ingredients,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

const linkIngredientsToRecipe = (recipeId, ingredientId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)",
      [recipeId, ingredientId],
      (_, resultSet) => {},
      (_, error) => console.log(error)
    );
  });
};

const saveIngredientsForRecipe = (name, count, typeOfCount) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO ingredients (name, count, typeOfCount) values (?, ?, ?)",
        [name, count, typeOfCount],
        (_, resultSet) => {
          resolve({
            id: resultSet.insertId,
            title: count,
            category: name,
            time: typeOfCount,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const removeIngredients = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM ingredients",
        [],
        (_, resultSet) => {
          // If needed, you can handle the result of the DELETE query here
          resolve(true); // Resolve the promise when the deletion is successful
        },
        (_, error) => {
          console.log(error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });
};
export const removeIngredientswithRecipe = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM recipe_ingredients",
        [],
        (_, resultSet) => {
          // If needed, you can handle the result of the DELETE query here
          resolve(true); // Resolve the promise when the deletion is successful
        },
        (_, error) => {
          console.log(error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });
};
export const deleteRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT ingredient_id FROM recipe_ingredients WHERE recipe_id = ?",
        [id],
        (_, resultSet) => {
          const ingredientIds = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            ingredientIds.push(resultSet.rows.item(i).ingredient_id);
          }
          console.log(ingredientIds);
          tx.executeSql(
            "DELETE FROM recipes WHERE id = ?",
            [id],
            (_, recipeDeleteResult) => {
              console.log(`Deleted recipe with id = ${id}`);
              resolve(id);
              if (ingredientIds.length > 0) {
                tx.executeSql(
                  "DELETE FROM ingredients WHERE id IN (?)",
                  [ingredientIds],
                  (_, ingredientsDeleteResult) => {
                    console.log(
                      `Deleted associated ingredients for recipe with id = ${id}`
                    );
                  },
                  (_, error) =>
                    console.log("Error deleting ingredients:", error)
                );
              }
              tx.executeSql(
                "DELETE FROM recipe_ingredients WHERE recipe_id = ?",
                [id],
                (_, linkDeleteResult) => {
                  console.log(
                    `Deleted ingredient links for recipe with id = ${id}`
                  );
                },
                (_, error) =>
                  console.log("Error deleting ingredient links:", error)
              );
            },
            (_, error) => console.log(`Cannot delete recipe with id = ${id}`)
          );
        },
        (_, error) =>
          console.log("Error fetching associated ingredient IDs:", error)
      );
    });
  });
};

// export const deleteRecipeById = (id) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "DELETE FROM recipes WHERE id = ?",
//         [id],
//         (_, resultSet) => {
//           console.log(`deleted recipe with id = ${id}`);
//           resolve(id);
//         },
//         (_, error) => console.log(`cannot delete recipe with id = ${id}`)
//       );
//     });
//   });
// };

export const fetchIngredientsbyRecipeId = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT ingredients.name, ingredients.count, ingredients.typeOfCount FROM ingredients JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id WHERE recipe_ingredients.recipe_id = ?",
        [recipeId],
        (_, resultSet) => {
          const ingredientRows = resultSet.rows._array;
          const recipeIngredients = ingredientRows.map(
            (row) => `${row.name} - ${row.count} ${row.typeOfCount}`
          );
          resolve(recipeIngredients);
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
};

export const createTablesIfNotExist = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, time TEXT)"
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS ingredients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, count INTEGER, typeOfCount TEXT)"
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS recipe_ingredients (recipe_id INTEGER, ingredient_id INTEGER, FOREIGN KEY(recipe_id) REFERENCES recipes(id), FOREIGN KEY(ingredient_id) REFERENCES ingredients(id))"
    );
  });
};

const groupRecipesWithIngredients = (data) => {
  const recipesMap = new Map();

  data.forEach((row) => {
    const { recipe_id, title, category, time, name, count, typeOfCount } = row;

    if (recipesMap.has(recipe_id)) {
      recipesMap.get(recipe_id).ingredients.push({ name, count, typeOfCount });
    } else {
      recipesMap.set(recipe_id, {
        id: recipe_id,
        title,
        category,
        time,
        ingredients: [{ name, count, typeOfCount }],
      });
    }
  });

  return Array.from(recipesMap.values());
};