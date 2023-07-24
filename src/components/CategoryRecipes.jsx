import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export const CategoryRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const db = SQLite.openDatabase("meals.db");

  useEffect(() => {
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

    addRecipe();
    fetchRecipes();
  }, []);

  const deleteRecipe = (recipeId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM recipes WHERE id = ?",
        [recipeId],
        () => {
          console.log("delete");
          // Recipe deleted successfully
          fetchRecipes(); // Refresh the recipe list after deletion
        },
        (_, error) => console.log(error)
      );
    });
  };

  const showRecipes = () => {
    return recipes.map((recipe) => (
      <View key={recipe.id}>
        <AntDesign
          name="delete"
          size={24}
          color="black"
          onPress={() => deleteRecipe(recipe.id)}
        />
        <Text style={styles.recipes__title}>{recipe.title}</Text>
        <Text style={styles.recipes__title}>Категорія: {recipe.category}</Text>
        <Text style={styles.recipes__title}>
          Час приготування: {recipe.time}
        </Text>
        <Text style={styles.recipes__title}>Інгредієнти:</Text>
        <IngredientsList recipeId={recipe.id} />
      </View>
    ));
  };

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
        {ingredients.map((ingredient, index) => (
          <View key={index}>
            <Text>{ingredient}</Text>
          </View>
        ))}
      </View>
    );
  };

  const fetchRecipes = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT recipes.id AS recipe_id, recipes.title, recipes.category, recipes.time, ingredients.name, ingredients.count, ingredients.typeOfCount FROM recipes LEFT JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id LEFT JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id",
        null,
        (_, resultSet) => {
          const data = resultSet.rows._array;
          const recipesWithIngredients = groupRecipesWithIngredients(data);
          setRecipes(recipesWithIngredients);
        },
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
                  { name: "Цибуля репчаста", count: 1, typeOfCount: "шт" },
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

  const route = useRoute();
  const { categorys } = route.params;

  const filterCategory = recipes.filter(
    (recipe) => recipe.category === categorys
  );

  return (
    <View>
      <ScrollView>{showRecipes()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
