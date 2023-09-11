import {
  fetchRecipes,
  addRecipe,
  isRecipeTableEmpty,
  deleteRecipeById,
} from "../../db/recipeDBService";
import { useData } from "../DataContext";
import { Entypo } from "@expo/vector-icons";
import { peasantSoup } from "../data/recipe-data";
import React, { useEffect, useState } from "react";
import { deleteElementById } from "../../utilis/array-util";
import { View, StyleSheet, ScrollView, Text, Button } from "react-native";

export const BaseRecipes = ({ route }) => {
  const { recipes, setRecipes } = useData();
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
          addRecipe(peasantSoup);
        } else {
          console.log("Таблиця 'recipes' не є порожньою.");
        }
      })
      .catch((error) => {
        console.error("Помилка перевірки таблиці 'recipes':", error);
      });
  };

  const deleteRecipe = (id) => {
    deleteRecipeById(id).then(() => {
      let existingRecipes = deleteElementById(recipes, id);
      setRecipes(existingRecipes);
    });
  };

  const openRecipe = (recipeId) => {
    setShowRecipePopUP(recipeId);
  };

  const closeRecipe = () => {
    setShowRecipePopUP(null);
  };
  const ingredientsList = (ingredients) => {
    return (
      <View>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredients}>
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
                  <Text style={styles.recipes__title}>{recipe.title}</Text>
                  <Text style={styles.recipes__time}>
                    <Entypo name="time-slot" size={24} color="#FDFAF6" />
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
            <View key={recipe.id} style={styles.recipe__card__container}>
              <View style={styles.recipe__card}>
                <Text
                  style={styles.recipes__title}
                  onPress={() => {
                    openRecipe(recipe.id);
                  }}
                >
                  {recipe.title}
                </Text>

                <Text style={styles.recipes__time}>
                  <Entypo name="time-slot" size={24} color="#FDFAF6" />
                  {recipe.time}
                </Text>

                <Text
                  // onPress={() => deleteRecipe(recipe.id)}
                  style={styles.recipes__category}
                >
                  {recipe.category}
                </Text>
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
  recipe__background: {
    backgroundColor: "pink",
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
  recipe__card__container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 8,
  },
  recipe__card: {
    borderColor: "#1C6758",
    borderRadius: 20,
    borderWidth: 1,
    width: "45%",
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: "#1C6758",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
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
    color: "#FDFAF6",
  },
  recipes__title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#FDFAF6",
  },
  recipes__category: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#FDFAF6",
  },
});
