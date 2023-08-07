import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import * as SQLite from "expo-sqlite";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

import {
  fetchRecipes,
  createTablesIfNotExist,
  addRecipe,
  deleteRecipeById,
  isRecipeTableEmpty,
} from "../../db/recipeDBService";

export const BaseRecipes = () => {
  const db = SQLite.openDatabase("meals.db");
  const [recipes, setRecipes] = useState([]);
  const [showIngredients, setShowIngredients] = useState(null);
  const [checked, setChecked] = useState();

  const openIngredients = (recipeId) => {
    setShowIngredients(recipeId);
  };

  const closeIngredients = () => {
    setShowIngredients(null);
  };

  const borch = {
    title: "Борщ",
    category: "Перші страви",
    time: "60хв",
    ingredients: [
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
    ],
  };

  const pumpkinCreamSoup = {
    title: "Крем-суп з гарбуза",
    category: "Перші страви",
    time: "40 хв",
    ingredients: [
      { name: "Гарбуз", count: 600, typeOfCount: "г" },
      { name: "Цибуля ріпчаста", count: 1, typeOfCount: "шт" },
      { name: "Морквина", count: 1, typeOfCount: "шт" },
      { name: "Часник", count: 2, typeOfCount: "зубчики" },
      { name: "Імбир", count: 1, typeOfCount: "смужка" },
      { name: "Сливки 20%", count: 200, typeOfCount: "мл" },
      { name: "Бульйон", count: 500, typeOfCount: "мл" },
      { name: "Масло вершкове", count: 2, typeOfCount: "ст. л" },
      { name: "Сіль", count: 0.5, typeOfCount: "ч. л" },
      { name: "Мелений перець", count: 0.5, typeOfCount: "ч. л" },
      { name: "Горіхи грецькі (парені)", count: 50, typeOfCount: "г" },
      { name: "Зелень (петрушка)", count: "за смаком", typeOfCount: "" },
    ],
  };

  useEffect(() => {
    // removeIngredientswithRecipe().then(() => {
    //   console.log("ok");
    // });
    // removeIngredients().then(() => {
    //   console.log("ok2");
    // });
    createTablesIfNotExist();
    fillDefaultRecipes();
    fetchRecipes()
      .then((recipesWithIngredients) => {
        setRecipes(recipesWithIngredients);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

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

  const ingredientsList = (ingredients) => {
    return (
      <View>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredients}>
            <Pressable
              style={[styles.checkboxBase, checked && styles.checkboxChecked]}
              onPress={() => setChecked(!checked)}
            >
              {checked && <Ionicons name="checkmark" size={24} color="white" />}
            </Pressable>
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

  const showRecipes = () => {
    return recipes.map((recipe) => (
      <View key={recipe.id} style={styles.recipe}>
        <View style={styles.recipe__background}>
          <View style={styles.recipes__top}>
            <Text style={styles.recipes__title}>{recipe.title}</Text>
            <AntDesign
              name="delete"
              size={24}
              color="black"
              style={styles.recipes__delete}
              onPress={() => deleteRecipeById(recipe.id)}
            />
          </View>
          <Text style={styles.recipes__time}>
            <Entypo name="time-slot" size={24} color="black" /> {recipe.time}
          </Text>
          <Text style={styles.recipes__category}>{recipe.category}</Text>
          {showIngredients === recipe.id && (
            <View>
              <Text style={styles.ingredients}>
                {ingredientsList(recipe.ingredients)}
              </Text>
              <Text
                style={styles.recipes__ingredients}
                onPress={closeIngredients}
              >
                Приховати інгредієнти
              </Text>
            </View>
          )}
          <Text
            style={styles.recipes__ingredients}
            onPress={() => {
              openIngredients(recipe.id);
            }}
          >
            Показати інгредієнти
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView>{showRecipes()}</ScrollView>
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
  ingredient__count: {
    margin: 2,
  },
  ingredient__typeOfCount: {
    margin: 2,
  },
  recipes__ingredientsPop: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "left",
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
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "black",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
});
