import { Text } from "react-native";
import { getUncheckedIngredients } from "../../db/recipeDBService";
export const ShoppingCart = () => {
  getUncheckedIngredients()
    .then((uncheckedIngredients) => {
      console.log("Unchecked Ingredients:", uncheckedIngredients);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return <Text>Juu</Text>;
};
