import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

export const CategoryRecipes = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const navigateToCategory = (category) => {
    navigation.navigate("Category", { category });
  };

  const db = SQLite.openDatabase("meals.db");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO categories (name) VALUES (?), (?), (?), (?), (?), (?), (?), (?)",
        [
          "Перші страви",
          "Салати",
          "Гарніри",
          "Риба",
          "М'ясні страви",
          "Десерти",
          "Напої",
          "Соуси та заправки",
        ],
        (_, resultSet) => {
          console.log("Дані успішно додані до бази даних!");
        },
        (_, error) => console.log(error)
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories",
        null,
        (_, resultSet) => {
          const data = resultSet.rows._array;
          setCategories(data);
        },
        (_, error) => console.log(error)
      );
    });
  }, []);

  return (
    <View>
      <Text style={styles.recipes__title}>Categorys</Text>
      {categories.map((category) => (
        <View style={styles.item} key={category.id}>
          <TouchableOpacity onPress={() => navigateToCategory(category)}>
            <Text style={styles.category}>{category.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
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
    backgroundColor: "#F1A661",
    alignSelf: "center",
    alignItems: "center",
    margin: 10,
    width: "90%",
    borderColor: "#001C30",
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
