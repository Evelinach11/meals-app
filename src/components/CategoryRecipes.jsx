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
    <View style={styles.container}>
      <ScrollView>
        {categories.map((category) => (
          <View style={styles.categoryItem} key={category.id}>
            <TouchableOpacity onPress={() => navigateToCategory(category.name)}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: "#1C6758",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 15,
    width: "90%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  categoryText: {
    color: "#FDFAF6",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 24,
    padding: 18,
  },
});
