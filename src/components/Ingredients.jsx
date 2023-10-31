import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchIngredients } from "../../db/recipeDBService";

export const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients().then((ing) => {
      setIngredients(ing);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Інгредієнти</Text>
      {ingredients.map((ing) => (
        <View style={styles.ingredientList} key={ing.id}>
          <Text style={styles.ingredientCount}>{ing.id}.</Text>
          <Text style={styles.ingredientName}>
            {ing.name.charAt(0).toUpperCase() + ing.name.slice(1)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D0E7D2",
    height: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: 600,
    margin: 8,
    color: "#183D3D",
  },
  ingredientList: {
    flexDirection: "row",
    margin: 8,
  },
  ingredientCount: {
    marginRight: 2,
    fontSize: 22,
    fontWeight: 500,
    color: "#183D3D",
  },
  ingredientName: {
    marginRight: 2,
    fontSize: 22,
    fontWeight: 400,
    color: "#183D3D",
  },
});
