import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, StyleSheet, Button } from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("meals.db");

export const DataBase = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  useEffect(() => {
    fetchRecipes();
    addRecipe();
  }, []);
  const openPopupIng = (recipeId) => {
    setSelectedRecipeId(selectedRecipeId === recipeId ? null : recipeId);
  };

  const closePopupIng = (recipeId) => {
    setSelectedRecipeId((prevId) => (prevId === recipeId ? null : recipeId));
  };

  //done
  const fetchRecipes = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT recipes.id AS recipe_id, recipes.title, recipes.category, recipes.time, ingredients.name, ingredients.count, ingredients.typeOfCount FROM recipes LEFT JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id LEFT JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id",
        null,
        (_, resultSet) => {
          const data = resultSet.rows._array;
          const recipesWithIngredients = groupRecipesWithIngredients(data);
          //   setRecipes(recipesWithIngredients);
          return recipesWithIngredients;
        },
        (_, error) => console.log(error)
      );
    });
  };
  //done
  const addRecipe = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM recipes WHERE title = ? AND category = ?",
        ["Борщ", "Першістрави"],
        (_, resultSet) => {
          const { rows } = resultSet;
          if (rows.length === 0) {
            tx.executeSql(
              "INSERT INTO recipes (title, category, time) VALUES (?, ?, ?)",
              ["Борщ", "Першістрави", "60 хв"],
              (_, result) => {
                const recipeId = result.insertId;
                const ingredientsForBorscht = [
                  { name: "Вода", count: 2, typeOfCount: "л" },
                  {
                    name: "Cвинина або яловичина",
                    count: 400,
                    typeOfCount: "г",
                  },
                  { name: "Картопля", count: 4, typeOfCount: "шт" },
                  { name: "Буряк", count: 2, typeOfCount: "шт" },
                  { name: "Морква", count: 2, typeOfCount: "шт" },
                  { name: "Цибуля", count: 3, typeOfCount: "шт" },
                  {
                    name: "Капуста білокачанна свіжа",
                    count: 300,
                    typeOfCount: "г",
                  },
                  { name: "Томатна паста", count: 2, typeOfCount: "ст. л" },
                  { name: "Соняшникова олія", count: 4, typeOfCount: "ст. л" },
                  { name: "Лимонна кислота", count: 4, typeOfCount: "ч. л" },
                  { name: "Сіль", count: 1, typeOfCount: "ч. л" },
                  { name: "Лавровий лист", count: 1, typeOfCount: "шт" },
                  { name: "Зелень", count: 100, typeOfCount: "г" },
                ];
                addIngredientsToRecipe(recipeId, ingredientsForBorscht);
              },
              (_, error) => console.log(error)
            );
          }
        },
        (_, error) => console.log(error)
      );

      tx.executeSql(
        "SELECT * FROM recipes WHERE title = ? AND category = ?",
        ["Мімоза", "Салат"],
        (_, resultSet) => {
          const { rows } = resultSet;
          if (rows.length === 0) {
            tx.executeSql(
              "INSERT INTO recipes (title, category, time) VALUES (?, ?, ?)",
              ["Мімоза", "Салат", "20 хв"],
              (_, result) => {
                const recipeId = result.insertId;
                const ingredientsForMimosa = [
                  {
                    name: "Риба консервована в маслі",
                    count: 240,
                    typeOfCount: "г",
                  },
                  { name: "Картопля", count: 3, typeOfCount: "шт" },
                  { name: "Яйця курячі", count: 3, typeOfCount: "шт" },
                  { name: "Морквина", count: 1, typeOfCount: "шт" },
                  { name: "Цибуля ріпчаста", count: 1, typeOfCount: "шт" },
                  { name: "Майонез", count: 1, typeOfCount: "ст.л" },
                ];
                addIngredientsToRecipe(recipeId, ingredientsForMimosa);
              },
              (_, error) => console.log(error)
            );
          }
        },
        (_, error) => console.log(error)
      );
    });
  };

  const addIngredientsToRecipe = (recipeId, ingredients) => {
    db.transaction((tx) => {
      ingredients.forEach((ingredient) => {
        tx.executeSql(
          "INSERT INTO ingredients (name, count, typeOfCount) VALUES (?, ?, ?)",
          [ingredient.name, ingredient.count, ingredient.typeOfCount],
          (_, resultSet) => {
            const ingredientId = resultSet.insertId;
            linkRecipeWithIngredient(recipeId, ingredientId);
          },
          (_, error) => console.log(error)
        );
      });
    });
  };

  const linkRecipeWithIngredient = (recipeId, ingredientId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)",
        [recipeId, ingredientId],
        (_, resultSet) => {},
        (_, error) => console.log(error)
      );
    });
  };

  const groupRecipesWithIngredients = (data) => {
    const recipesMap = new Map();

    data.forEach((row) => {
      const { recipe_id, title, category, time, name, count, typeOfCount } =
        row;

      if (recipesMap.has(recipe_id)) {
        recipesMap
          .get(recipe_id)
          .ingredients.push({ name, count, typeOfCount });
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
  //done
  const showRecipes = () => {
    return (
      <View>
        <View style={styles.recipes__container}>
          {recipes.map((recipe) => (
            <View key={recipe.id}>
              {selectedRecipeId === recipe.id ? (
                <View>
                  <IngredientsList style={styles.popUp} recipeId={recipe.id} />
                  <Button
                    title="close"
                    onPress={() => closePopupIng(recipe.id)}
                  />
                </View>
              ) : (
                <View style={styles.recipes__card}>
                  <AntDesign
                    name="delete"
                    size={24}
                    color="black"
                    onPress={() => deleteRecipe(recipe.id)}
                  />
                  <Text
                    onPress={() => openPopupIng(recipe.id)}
                    style={styles.recipes__title}
                  >
                    {recipe.title}
                  </Text>
                  <Text style={styles.recipes__category}>
                    Категорія: {recipe.category}
                  </Text>
                  <Text style={styles.recipes__time}>Час приготування:</Text>
                  <Text style={styles.recipes__time}>{recipe.time}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

  //done
  const IngredientsList = ({ recipeId }) => {
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT ingredients.name, ingredients.count, ingredients.typeOfCount FROM ingredients JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id WHERE recipe_ingredients.recipe_id = ?",
          [recipeId],
          (_, resultSet) => {
            const ingredientRows = resultSet.rows._array;
            const recipeIngredients = ingredientRows.map(
              (row) => `${row.name} - ${row.count} ${row.typeOfCount}`
            );
            setIngredients(recipeIngredients);
          },
          (_, error) => console.log(error)
        );
      });
    }, [recipeId]);

    return (
      <View>
        <Text>Інгредієнти</Text>
        {ingredients.map((ingredient, index) => (
          <View key={index}>
            <Text>{ingredient}</Text>
          </View>
        ))}
      </View>
    );
  };

  const deleteRecipe = (recipeId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM recipes WHERE id = ?",
        [recipeId],
        () => {
          console.log("delete");
          fetchRecipes();
        },
        (_, error) => console.log(error)
      );
    });
  };

  return <View style={styles.container}>{showRecipes()}</View>;
};

const styles = StyleSheet.create({
  recipes__container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 10,
  },
  recipes__card: {
    borderColor: "#5D9C59",
    borderRadius: 20,
    borderWidth: 1,
    width: 150,
    height: 150,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    alignItems: "left",
  },
  recipes__title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  recipes__category: {
    fontSize: 20,
    fontWeight: "600",
  },
  recipes__time: {},
  popUp: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
});
