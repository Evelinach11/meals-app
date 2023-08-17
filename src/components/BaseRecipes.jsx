import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import {
  fetchRecipes,
  addRecipe,
  markCheckedIngredientById,
  isRecipeTableEmpty,
} from "../../db/recipeDBService";
import { Entypo } from "@expo/vector-icons";
import { borch } from "../data/recipe-data";
import { getElementById } from "../../utilis/array-util";
import { View, StyleSheet, ScrollView, Text, Button } from "react-native";

export const BaseRecipes = ({ route }) => {
  const [recipes, setRecipes] = useState([]);
  const [reload, setReload] = useState(false);
  const [showRecipePopUP, setShowRecipePopUP] = useState(null);

  const { category } = route.params;

  useEffect(() => {
    fillDefaultRecipes();
    fetchRecipes()
      .then((recipesWithIngredients) => {
        const filteredRecipes = recipesWithIngredients.filter(
          (recipe) => recipe.category === category
        );
        setRecipes(filteredRecipes);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [category]);

  const fillDefaultRecipes = () => {
    isRecipeTableEmpty()
      .then((isEmpty) => {
        if (isEmpty) {
          addRecipe(borch);
        } else {
          console.log("Таблиця 'recipes' не є порожньою.");
        }
      })
      .catch((error) => {
        console.error("Помилка перевірки таблиці 'recipes':", error);
      });
  };

  const handleCheckboxChange = (ingredient, recipeId) => {
    markCheckedIngredientById(recipeId, ingredient.id, !ingredient.isChecked);
    const currentRecipe = getElementById(recipes, recipeId);
    const currentIngredients = currentRecipe.ingredients;
    const currentIngredient = getElementById(currentIngredients, ingredient.id);
    currentIngredient.isChecked = !currentIngredient.isChecked;
    setReload(!reload);
  };

  const openRecipe = (recipeId) => {
    setShowRecipePopUP(recipeId);
  };

  const closeRecipe = () => {
    setShowRecipePopUP(null);
  };

  const ingredientsList = (ingredients, recipeId) => {
    return (
      <View>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredients}>
            <Checkbox
              style={styles.checkbox}
              value={Boolean(ingredient.isChecked)}
              onValueChange={() => handleCheckboxChange(ingredient, recipeId)}
              color={"#000000"}
            />
            <Text style={styles.ingredient__name}>{ingredient.name}</Text>
            <Text style={styles.ingredient__count}>{ingredient.count}</Text>
            <Text style={styles.ingredient__typeOfCount}>
              {ingredient.typeOfCount}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {recipes.map((recipe) =>
          showRecipePopUP ? (
            showRecipePopUP === recipe.id && (
              <View>
                <View style={styles.recipe__background}>
                  <View style={styles.recipes__top}>
                    <Text style={styles.recipes__title}>{recipe.title}</Text>
                  </View>
                  <Text style={styles.recipes__time}>
                    <Entypo name="time-slot" size={24} color="black" />
                    {recipe.time}
                  </Text>
                  <Text style={styles.recipes__category}>
                    {recipe.category}
                  </Text>
                  <Text style={styles.ingredients}>
                    {ingredientsList(recipe.ingredients, recipe.id)}
                  </Text>
                </View>
                <Button title="close" onPress={closeRecipe}></Button>
              </View>
            )
          ) : (
            <View key={recipe.id} style={styles.recipe}>
              <View style={styles.recipe__background}>
                <View style={styles.recipes__top}>
                  <Text
                    style={styles.recipes__title}
                    onPress={() => {
                      openRecipe(recipe.id);
                    }}
                  >
                    {recipe.title}
                  </Text>
                </View>
                <Text style={styles.recipes__time}>
                  <Entypo name="time-slot" size={24} color="black" />
                  {recipe.time}
                </Text>
                <Text style={styles.recipes__category}>{recipe.category}</Text>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  ingredients: {
    flexDirection: "row",
  },
  ingredient__name: {
    margin: 2,
  },
  popup: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
  ingredient__count: {
    margin: 2,
  },
  ingredient__typeOfCount: {
    margin: 2,
  },

  recipe: {
    backgroundColor: "#DDDDDD",
    borderRadius: 15,
    padding: 10,
    width: "90%",
    alignSelf: "center",
    margin: 10,
  },
  recipes__top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipes__delete: {
    marginTop: 5,
  },
  recipes__ingredients: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  recipes__time: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  recipes__title: {
    fontSize: 32,
    fontWeight: "600",
  },
  recipes__category: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },

  recipe__background: {
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
});
