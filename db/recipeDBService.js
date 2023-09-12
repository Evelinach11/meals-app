import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("meals.db");

export const addRecipe = (recipe) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipes (title, category, time, isLike) values (?, ?, ?, ?)",
        [recipe.title, recipe.category, recipe.time, false],
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
            isLike: false,
            ingredients: ingredients,
          });
        },
        (_, error) => console.log(error)
      );
    });
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

export const fetchIngredientsbyRecipeId = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT ingredients.name, ingredients.count, ingredients.typeOfCount, ingredients.id, recipe_ingredients.isChecked FROM ingredients JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id WHERE recipe_ingredients.recipe_id = ?",
        [recipeId],
        (_, resultSet) => {
          const ingredientRows = resultSet.rows._array;
          const recipeIngredients = ingredientRows.map((row) => ({
            id: row.id,
            name: row.name,
            count: row.count,
            typeOfCount: row.typeOfCount,
            isChecked: Boolean(row.isChecked),
          }));
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

export const fetchRecipes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT recipes.id AS recipe_id, recipes.title, recipes.category, recipes.time, ingredients.id,ingredients.name, ingredients.count, ingredients.typeOfCount, recipe_ingredients.isChecked FROM recipes LEFT JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id LEFT JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id",
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
export const getUncheckedIngredientsByRecipeId = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT i.name FROM ingredients AS i JOIN recipe_ingredients AS ri ON i.id = ri.ingredient_id WHERE ri.isChecked = ? AND ri.recipe_id = ?",
        [false, recipeId],
        (_, resultSet) => {
          const uncheckedIngredients = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            uncheckedIngredients.push(resultSet.rows.item(i).name);
          }
          resolve(uncheckedIngredients);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
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

export const markCheckedIngredientById = (
  recipeId,
  ingredientId,
  isChecked
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recipe_ingredients SET isChecked = ?  WHERE recipe_id = ? AND ingredient_id = ? ",
      [isChecked, recipeId, ingredientId],
      (_, resultSet) => {},
      (_, error) => {
        console.error("Error executing SQL query:", error);
      }
    );
  });
};

export const removeIngredients = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM ingredients",
        [],
        (_, resultSet) => {
          resolve(true);
        },
        (_, error) => {
          console.log(error);
          reject(error);
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
          resolve(true);
        },
        (_, error) => {
          console.log(error);
          reject(error);
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

const linkIngredientsToRecipe = (recipeId, ingredientId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, isChecked) VALUES (?, ?, ?)",
      [recipeId, ingredientId, false],
      (_, resultSet) => {},
      (_, error) => console.log(error)
    );
  });
};

const groupRecipesWithIngredients = (data) => {
  const recipesMap = new Map();
  data.forEach((row) => {
    const {
      recipe_id,
      title,
      category,
      time,
      id,
      name,
      count,
      typeOfCount,
      isChecked,
    } = row;

    if (recipesMap.has(recipe_id)) {
      recipesMap
        .get(recipe_id)
        .ingredients.push({ id, name, count, typeOfCount, isChecked });
    } else {
      recipesMap.set(recipe_id, {
        id: recipe_id,
        title,
        category,
        time,
        ingredients: [{ id, name, count, typeOfCount, isChecked }],
      });
    }
  });
  return Array.from(recipesMap.values());
};
