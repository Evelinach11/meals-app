import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCategoryForBaseRecipe } from "../../db/recipeDBService";

export const CategoryRecipes = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const navigateToCategory = (categoryName) => {
    navigation.navigate("BaseRecipes", { category: categoryName });
  };

  useEffect(() => {
    getCategoryForBaseRecipe().then((result) => {
      setCategories(result);
    });
  }, []);

  return (
    <View>
      <ScrollView>
        <Text style={styles.recipes__title}>Categorys</Text>
        {categories.map((category) => (
          <View style={styles.item} key={category.id}>
            <TouchableOpacity onPress={() => navigateToCategory(category.name)}>
              <Text style={styles.category}>{category.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  recipes__title: {
    color: "#1B1A17",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  item: {
    backgroundColor: "#FAF1E6",
    alignSelf: "center",
    alignItems: "center",
    margin: 8,
    width: "90%",
    borderColor: "#1C6758",
    borderWidth: 1,
    borderRadius: 20,
  },
  category: {
    color: "#1B1A17",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    margin: 20,
  },
});
