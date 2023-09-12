import { Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getUncheckedIngredientsByRecipeId } from "../../db/recipeDBService";

export const ShoppingCart = ({ route }) => {
  const [uncheckedIngredients, setUncheckedIngredients] = useState();
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
      <Text>{uncheckedIngredients}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  uncheckedIngredients: {
    flexDirection: "row",
    margin: 10,
  },
});
