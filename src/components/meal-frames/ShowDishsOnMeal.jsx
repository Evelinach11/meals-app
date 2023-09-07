import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getByRecipeByMealsType } from "../../../db/dishesMealDBService";

export const ShowDishsOnMeal = ({ route }) => {
  const [dishsByDateAndType, setDishsByDateAndType] = useState([]);
  const { mealId, selectedDate } = route.params;

  useEffect(() => {
    getByRecipeByMealsType(mealId, selectedDate).then((result) => {
      setDishsByDateAndType(result);
    });
  }, []);

  return (
    <View style={styles.meals__dayMenu}>
      <Text style={styles.meals__dayMenuTitlle}>Твої страви</Text>
      {dishsByDateAndType.map((recipe, index) => (
        <View key={index}>
          <Text>{recipe.title}</Text>
          <Text>{recipe.category}</Text>
          <Text>{recipe.time}</Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  meals__dayMenu: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "left",
  },
});
