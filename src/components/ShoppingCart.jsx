import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getUncheckedIngredients } from "../../db/recipeDBService";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

export const ShoppingCart = () => {
  const [uncheckedIngredients, setUncheckedIngredients] = useState([]);

  useEffect(() => {
    getUncheckedIngredients()
      .then((result) => {
        const uniqueIngredients = [...new Set(result)];
        setUncheckedIngredients(uniqueIngredients);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <ScrollView>
      <View style={styles.uncheckedIngredients}>
        {uncheckedIngredients.map((ingredient) => (
          <Text style={styles.uncheckedIngredients__list} key={ingredient.id}>
            <Entypo name="dot-single" size={24} color="black" />
            {ingredient}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  uncheckedIngredients: {
    backgroundColor: "#FAF1E6",
  },
  uncheckedIngredients__list: {
    fontSize: 20,
    margin: 10,
    fontWeight: "500",
  },
});
