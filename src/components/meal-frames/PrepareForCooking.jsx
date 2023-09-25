import {
  fetchIngredientsbyRecipeId,
  markCheckedIngredientById,
} from "../../../db/recipeDBService";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { useData } from "../../DataContext";
import { useNavigation } from "@react-navigation/native";
import { getElementById } from "../../../utilis/array-util";
import { View, Text, StyleSheet, Alert } from "react-native";

export default PrepareForCooking = ({ route }) => {
  const [recipeWithIngredients, setRecipeWithIngredients] = useState([]);
  const { recipes } = useData();
  const { recipeId } = route.params;
  const navigation = useNavigation();

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
            onPress: () => navigateToStartCooking(),
            style: "cancel",
          },
        ])
      : Alert.alert("Упс...", "У вас недостатньо інгредієнтів для готування", [
          {
            text: "Закрити",
            onPress: () => navigateToShoppingCartInMeal(),
            style: "cancel",
          },
        ]);
  };

  const navigateToShoppingCartInMeal = () => {
    navigation.navigate("ShoppingCartInMeals", {
      recipeId,
    });
  };

  const navigateToStartCooking = () => {
    navigation.navigate("StartCooking", {
      recipeId,
    });
  };

  return (
    <View style={styles.container}>
      {recipeWithIngredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredients}>
          <Checkbox
            style={styles.checkbox}
            value={ingredient.isChecked}
            onValueChange={() => handleCheckboxChange(ingredient, recipeId)}
            color={"#1C6758"}
          />
          <Text style={styles.ingredient}>{ingredient.name}</Text>
          <Text style={styles.ingredient}>{ingredient.count}</Text>
          <Text style={styles.ingredient}>{ingredient.typeOfCount}</Text>
        </View>
      ))}
      <View style={styles.nextBtnItem}>
        <Text style={styles.nextBtn} onPress={allCheckboxesChecked}>
          Далі
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "#FDFAF6",
    height: "100%",
  },
  ingredients: {
    flexDirection: "row",
    margin: 10,
  },
  ingredient: {
    margin: 2,
    fontSize: 23,
    fontWeight: "600",
    alignSelf: "center",
  },
  checkbox: {
    width: 28,
    height: 28,
  },
  nextBtnItem: {
    backgroundColor: "#1C6758",
    borderRadius: 12,
    padding: 10,
    margin: 12,
    alignItems: "center",
  },
  nextBtn: {
    padding: 5,
    color: "#FDFAF6",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});
