import * as SQLite from "expo-sqlite";
import { saveStepsForRecipe } from "./recipeStepsDBService";
import { fetchStepsByRecipeId } from "./recipeStepsDBService";

const db = SQLite.openDatabase("meals.db");

export const addRecipe = (recipe) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipes (title, category, time, photo, isLike, isSystem) values (?, ?, ?, ?, ?, ?)",
        [
          recipe.title,
          recipe.category,
          recipe.time,
          recipe.photo,
          false,
          recipe.isSystem,
        ],
        (_, resultSet) => {
          const recipeId = resultSet.insertId;
          const ingredients = recipe.ingredients;

          db.transaction((tx) => {
            tx.executeSql(
              "SELECT ingredients.id, ingredients.name, ingredients.calories FROM ingredients",
              [],
              (_, resultSet) => {
                const existingIngredients = resultSet.rows._array;
                const ingredientMap = new Map(
                  existingIngredients.map((ingredient) => [
                    ingredient.name,
                    ingredient.id,
                    ingredient.calories,
                  ])
                );

                for (let i = 0; i < ingredients.length; i++) {
                  const currentIngredient = ingredients[i];
                  const ingredientId = ingredientMap.get(
                    currentIngredient.name.toLowerCase()
                  );
                  if (ingredientId) {
                    linkIngredientsToRecipe(
                      recipeId,
                      ingredientId,
                      currentIngredient.count
                    );
                  } else {
                    saveIngredientsForRecipe(
                      currentIngredient.name.toLowerCase(),
                      currentIngredient.typeOfCount,
                      currentIngredient.calories
                    )
                      .then((savedIngredient) => {
                        linkIngredientsToRecipe(
                          recipeId,
                          savedIngredient.id,
                          currentIngredient.count
                        );
                      })
                      .catch((error) => console.log(error));
                  }
                }
              }
            );
          });

          const resultSteps = [];
          const steps = recipe.steps;
          for (let i = 0; i < steps.length; i++) {
            const currentStep = steps[i];
            saveStepsForRecipe(
              recipeId,
              currentStep.title,
              currentStep.description,
              currentStep.time,
              currentStep.orderliness,
              currentStep.state
            ).then((step) => {
              resultSteps.push({
                id: step.id,
                recipe_id: recipeId,
                title: step.title,
                time: step.time,
                orderliness: step.orderliness,
                state: step.state,
              });
            });
          }

          resolve({
            id: recipeId,
            title: recipe.title,
            category: recipe.category,
            time: recipe.time,
            photo: recipe.photo,
            isLike: false,
            isSystem: recipe.isSystem,
            ingredients: ingredients,
            steps: resultSteps,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const addPersonalRecipe = (recipe) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipes (title, category, time, photo, isLike, isSystem) values (?, ?, ?, ?, ?, ?)",
        [
          recipe.title,
          recipe.category,
          recipe.time,
          recipe.photo,
          false,
          false,
        ],
        (_, resultSet) => {
          const recipeId = resultSet.insertId;
          const ingredients = recipe.ingredients;

          db.transaction((tx) => {
            tx.executeSql(
              "SELECT ingredients.id, ingredients.name, ingredients.calories FROM ingredients",
              [],
              (_, resultSet) => {
                const existingIngredients = resultSet.rows._array;
                const ingredientMap = new Map(
                  existingIngredients.map((ingredient) => [
                    ingredient.name,
                    ingredient.id,
                    ingredient.calories,
                  ])
                );

                for (let i = 0; i < ingredients.length; i++) {
                  const currentIngredient = ingredients[i];
                  const ingredientId = ingredientMap.get(
                    currentIngredient.name.toLowerCase()
                  );
                  if (ingredientId) {
                    linkIngredientsToRecipe(
                      recipeId,
                      ingredientId,
                      currentIngredient.count
                    );
                  } else {
                    saveIngredientsForRecipe(
                      currentIngredient.name.toLowerCase(),
                      currentIngredient.typeOfCount,
                      currentIngredient.calories
                    )
                      .then((savedIngredient) => {
                        linkIngredientsToRecipe(
                          recipeId,
                          savedIngredient.id,
                          currentIngredient.count
                        );
                      })
                      .catch((error) => console.log(error));
                  }
                }
              }
            );
          });

          const resultSteps = [];
          const steps = recipe.steps;
          for (let i = 0; i < steps.length; i++) {
            const currentStep = steps[i];
            saveStepsForRecipe(
              recipeId,
              `Крок ${currentStep.orderliness}`,
              currentStep.description,
              currentStep.time,
              currentStep.orderliness,
              "wait"
            ).then((step) => {
              resultSteps.push({
                id: step.id,
                recipe_id: recipeId,
                title: step.title,
                description: step.description,
                time: step.time,
                orderliness: step.orderliness,
                state: step.state,
              });
            });
          }

          resolve({
            id: recipeId,
            title: recipe.title,
            category: recipe.category,
            time: recipe.time,
            photo: recipe.photo,
            isLike: false,
            isSystem: false,
            ingredients: ingredients,
            steps: resultSteps,
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
        "SELECT ingredients.name, recipe_ingredients.count, ingredients.typeOfCount, ingredients.id, ingredients.calories, recipe_ingredients.isChecked FROM ingredients JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id WHERE recipe_ingredients.recipe_id = ?",
        [recipeId],
        (_, resultSet) => {
          const ingredientRows = resultSet.rows._array;
          const recipeIngredients = ingredientRows.map((row) => ({
            id: row.id,
            name: row.name,
            count: row.count,
            typeOfCount: row.typeOfCount,
            calories: row.calories,
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

export const fetchIngredients = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT ingredients.name, ingredients.typeOfCount, ingredients.id, ingredients.calories FROM ingredients",
        [],
        (_, resultSet) => {
          const ingredientRows = resultSet.rows._array;
          const recipeIngredients = ingredientRows.map((row) => ({
            id: row.id,
            name: row.name,
            typeOfCount: row.typeOfCount,
            calories: row.calories,
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
        "SELECT recipes.id AS recipe_id, " +
          "recipes.title, " +
          "recipes.category, " +
          "recipes.time, " +
          "recipes.photo, " +
          "recipes.isLike, " +
          "ingredients.id, " +
          "ingredients.name, " +
          "ingredients.calories, " +
          "recipe_ingredients.count, " +
          "ingredients.typeOfCount, " +
          "recipe_ingredients.isChecked " +
          "FROM recipes " +
          "LEFT JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id " +
          "LEFT JOIN ingredients ON ingredients.id = recipe_ingredients.ingredient_id " +
          "WHERE isSystem = 1",
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

export const updatePersonalRecipe = (newRecipe) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE recipes SET title = ?, category = ?, time = ?, photo = ? WHERE id = ?",
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

export const deletePersonalRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM recipes WHERE id = ? AND isSystem = 0",
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

export const deletePhotoFromRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE recipes SET photo = NULL WHERE id = ?",
        [id],
        (_, resultSet) => {
          resolve(resultSet.rowsAffected);
        },
        (_, error) => console.log(error)
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

export const getAllByPersonalRecipe = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM recipes WHERE isSystem = 0",
        null,
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const getLikeRecipe = (isLike) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pecipes WHERE isLike = 1",
        [isLike],
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => {
          console.error("Error executing SQL query:", error);
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

export const getUncheckedIngredients = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT i.name FROM ingredients AS i JOIN recipe_ingredients AS ri ON i.id = ri.ingredient_id WHERE ri.isChecked = ?",
        [false],
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

export const markLikePersonalRecipe = (id, isLike) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recipes SET isLike = ?  WHERE id = ? ",
      [isLike, id],
      (_, resultSet) => {},
      (_, error) => {
        console.error("Error executing SQL query:", error);
      }
    );
  });
};

const saveIngredientsForRecipe = (name, typeOfCount, calories) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO ingredients (name, typeOfCount, calories) values (?, ?, COALESCE(?, ?))",
        [name, typeOfCount, calories, 0],
        (_, resultSet) => {
          resolve({
            id: resultSet.insertId,
            category: name,
            time: typeOfCount,
            calories: calories,
          });
        },
        (_, error) => console.log(error)
      );
    });
  });
};

export const isCategoryTableEmpty = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) AS count FROM categories",
        [],
        (_, resultSet) => {
          const count = resultSet.rows._array[0].count;
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

export const markLikeRecipe = (id, isLike) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recipes SET isLike = ?  WHERE id = ? ",
      [isLike, id],
      (_, resultSet) => {},
      (_, error) => {
        console.error("Error executing SQL query:", error);
      }
    );
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

const linkIngredientsToRecipe = (recipeId, ingredientId, count) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, isChecked, count) VALUES (?, ?, ?, ?)",
      [recipeId, ingredientId, false, count],
      (_, resultSet) => {},
      (_, error) => console.log(error)
    );
  });
};

const groupRecipesWithIngredients = async (data) => {
  const recipesMap = new Map();

  const stepFetchPromises = [];

  data.forEach((row) => {
    const {
      recipe_id,
      title,
      category,
      time,
      photo,
      isLike,
      id,
      name,
      count,
      calories,
      typeOfCount,
      isChecked,
    } = row;

    if (recipesMap.has(recipe_id)) {
      recipesMap.get(recipe_id).ingredients.push({
        id,
        name,
        count,
        calories,
        typeOfCount,
        isChecked,
      });
    } else {
      recipesMap.set(recipe_id, {
        id: recipe_id,
        title,
        category,
        time,
        photo,
        isLike,
        ingredients: [{ id, name, count, calories, typeOfCount, isChecked }],
      });
    }

    const stepFetchPromise = fetchStepsByRecipeId(recipe_id);
    stepFetchPromises.push(stepFetchPromise);
  });

  const stepResults = await Promise.all(stepFetchPromises);

  stepResults.forEach((result, index) => {
    const recipeId = data[index].recipe_id;
    const recipe = recipesMap.get(recipeId);
    if (recipe) {
      recipe.steps = result;
    }
  });

  return Array.from(recipesMap.values());
};
