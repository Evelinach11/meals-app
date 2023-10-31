import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchIngredients } from "../../db/recipeDBService";

export const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients().then((ing) => {
      setIngredients(ing);
    });
  }, []);

  return (
    <View>
      <Text>Ingredients</Text>
      {ingredients.map((ing) => (
        <View key={ing.id}>
          <Text>{ing.id}</Text>
          <Text>{ing.name.charAt(0).toUpperCase() + ing.name.slice(1)}</Text>
        </View>
      ))}
    </View>
  );
};
