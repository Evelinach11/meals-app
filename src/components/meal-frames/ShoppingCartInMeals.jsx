import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

import { getUncheckedIngredientsByRecipeId } from "../../../db/recipeDBService";
export const ShoppingCartInMeals = ({ route }) => {
  const [uncheckedIngredients, setUncheckedIngredients] = useState([]);
  const { recipeId } = route.params;

  useEffect(() => {
    getUncheckedIngredientsByRecipeId(recipeId)
      .then((result) => {
        setUncheckedIngredients(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [recipeId]);

  return (
    <View style={styles.uncheckedIngredients}>
      <Text style={styles.uncheckedIngredients__title}>
        Інгредієнти яких вам не вистачає
      </Text>
      {uncheckedIngredients.map((ingredient) => (
        <Text style={styles.uncheckedIngredients__list} key={ingredient.id}>
          <Entypo name="dot-single" size={24} color="black" />
          {ingredient}
        </Text>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  uncheckedIngredients: {
    backgroundColor: "#FAF1E6",
    height: 800,
  },
  uncheckedIngredients__title: {
    fontSize: 25,
    margin: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  uncheckedIngredients__list: {
    fontSize: 20,
    margin: 10,
    fontWeight: "500",
  },
});
