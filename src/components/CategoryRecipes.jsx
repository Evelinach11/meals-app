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
import {
  addCategoryForBaseRecipe,
  getCategoryForBaseRecipe,
} from "../../db/recipeDBService";
import { categoriesForBaseRecipe } from "../data/recipe-data";
import { isCategoryTableEmpty } from "../../db/recipeDBService";

export const CategoryRecipes = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const navigateToCategory = (categoryName) => {
    navigation.navigate("BaseRecipes", { category: categoryName });
  };

  useEffect(() => {
    isCategoryTableEmpty().then((isEmpty) => {
      if (isEmpty) {
        categoriesForBaseRecipe.forEach((category) => {
          addCategoryForBaseRecipe(category);
        });
        setCategories(categoriesForBaseRecipe);
      } else {
        getCategoryForBaseRecipe().then((result) => {
          setCategories(result);
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
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
  container: {
    flex: 1,
    marginTop: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginStart: 8,
  },
  categoryItem: {
    backgroundColor: "#1C6758",
    marginVertical: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: "30%",
    height: 200,
    margin: 5,
  },
  categoryText: {
    color: "#FDFAF6",
    fontWeight: "800",
    textAlign: "center",
    fontSize: 18,
    padding: 18,
    marginTop: 60,
  },
  categoryBack: {
    height: 200,
  },
});
