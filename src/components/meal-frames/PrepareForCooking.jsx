import {
  fetchIngredientsbyRecipeId,
  markCheckedIngredientById,
} from "../../../db/recipeDBService";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { useData } from "../../DataContext";
import { View, Text, StyleSheet, Alert } from "react-native";
import { getElementById } from "../../../utilis/array-util";

export default PrepareForCooking = ({ route }) => {
  const [recipeWithIngredients, setRecipeWithIngredients] = useState([]);

  const { recipes } = useData();
  const { recipeId } = route.params;

  useEffect(() => {
    fetchIngredientsbyRecipeId(recipeId)
      .then((ingredients) => {
        setRecipeWithIngredients(ingredients);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [recipeId]);

  const handleCheckboxChange = (ingredient, recipeId) => {
    markCheckedIngredientById(recipeId, ingredient.id, !ingredient.isChecked);
    const currentRecipe = getElementById(recipes, recipeId);
    const currentIngredients = currentRecipe.ingredients;
    const currentIngredient = getElementById(currentIngredients, ingredient.id);
    currentIngredient.isChecked = !currentIngredient.isChecked;
    const updatedIngredients = recipeWithIngredients.map((item) => {
      if (item.id === ingredient.id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setRecipeWithIngredients(updatedIngredients);
  };

  const allCheckboxesChecked = () => {
    recipeWithIngredients.every((ingredient) => ingredient.isChecked)
      ? Alert.alert("Вперед...", "У вас є всі інгредієнти", [
          {
            text: "Продовжуєм",
            style: "cancel",
          },
        ])
      : Alert.alert("Упс...", "У вас недостатньо інгредієнтів для готування", [
          {
            text: "Закрити",
            style: "cancel",
          },
        ]);
  };

  return (
    <View>
      {recipeWithIngredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredients}>
          <Checkbox
            style={styles.checkbox}
            value={ingredient.isChecked}
            onValueChange={() => handleCheckboxChange(ingredient, recipeId)}
            color={"#000000"}
          />
          <Text style={styles.ingredient}>{ingredient.name}</Text>
          <Text style={styles.ingredient}>{ingredient.count}</Text>
          <Text style={styles.ingredient}>{ingredient.typeOfCount}</Text>
        </View>
      ))}
      <Text
        style={{ fontSize: 30, textAlign: "center" }}
        onPress={allCheckboxesChecked}
      >
        Далі
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  ingredients: {
    flexDirection: "row",
    margin: 10,
  },
  ingredient: {
    margin: 2,
  },
});
