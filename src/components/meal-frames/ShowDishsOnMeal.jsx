import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getByRecipeByMealsType } from "../../../db/dishesMealDBService";
import { Entypo } from "@expo/vector-icons";

export const ShowDishsOnMeal = ({ route }) => {
  const [dishsByDateAndType, setDishsByDateAndType] = useState([]);
  const { mealId, selectedDate } = route.params;

  useEffect(() => {
    getByRecipeByMealsType(mealId, selectedDate).then((result) => {
      setDishsByDateAndType(result);
    });
  }, []);

  return (
    <View style={styles.dishOnMeal__container}>
      <Text style={styles.dishOnMeal__title}>Твої страви</Text>
      {dishsByDateAndType.map((recipe, index) => (
        <View style={styles.dishOnMeal__card} key={index}>
          <Text style={styles.dishOnMeal__card__title}>{recipe.title}</Text>
          <Text style={styles.dishOnMeal__card__category}>
            {recipe.category}
          </Text>
          <View style={styles.dishOnMeal__card__time}>
            <Entypo name="time-slot" size={25} color="#FDFAF6" />
            <Text style={styles.dishOnMeal__card__time__text}>
              {recipe.time}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  dishOnMeal__container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
  dishOnMeal__title: {
    fontSize: 30,
    fontWeight: "500",
    margin: 10,
  },
  dishOnMeal__card: {
    width: "90%",
    height: 120,
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#064420",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  dishOnMeal__card__title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
  dishOnMeal__card__category: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
  dishOnMeal__card__time: {
    flexDirection: "row",
  },
  dishOnMeal__card__time__text: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
});
