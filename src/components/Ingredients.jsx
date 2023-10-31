import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
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
      <FlatList
        data={ingredients}
        renderItem={(ingredient) => {
          return (
            <View style={styles.ingredientList} key={ingredient.item.id}>
              <Text style={styles.ingredientCount}>{ingredient.item.id}.</Text>
              <Text style={styles.ingredientName}>
                {ingredient.item.name.charAt(0).toUpperCase() +
                  ingredient.item.name.slice(1)}
              </Text>
            </View>
          );
        }}
      />
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
