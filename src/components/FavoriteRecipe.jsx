import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getLikeRecipe } from "../../db/recipeDBService";

export const FavoriteRecipe = () => {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);

  useEffect(() => {
    getLikeRecipe().then((result) => {
      setFavoriteRecipe(result);
    });
  }, []);

  return (
    <View>
      {favoriteRecipe.map((recipe) => {
        return (
          <View style={styles.recipes__card}>
            <Image
              source={{ uri: recipe.photo }}
              style={styles.recipes__addedPhoto}
            />
            <View style={styles.recipes__top}>
              <Text style={styles.recipes__title}>{recipe.title}</Text>
              <Text style={styles.recipes__category}>{recipe.category}</Text>
              <View style={styles.recipes__timeItem}>
                <Entypo name="time-slot" size={25} color="black" />
                <Text style={styles.recipes__time}>{recipe.time}хв</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  recipes__card: {
    borderRadius: 20,
    width: "80%",
    margin: 10,
    marginHorizontal: 35,
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
  },
  recipes__addedPhoto: {
    width: "100%",
    height: 175,
    marginBottom: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  recipes__category: {
    color: "#1B1A17",
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  recipes__title: {
    color: "#1B1A17",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  recipes__mainTitle: {
    color: "#1B1A17",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "left",
  },
  recipes__timeItem: {
    flexDirection: "row",
    alignSelf: "center",
  },
  recipes__time: {
    color: "#1B1A17",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
});
