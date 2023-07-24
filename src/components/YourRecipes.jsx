import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import * as SQLite from "expo-sqlite";

export const YourRecipes = () => {
  const db = SQLite.openDatabase("meals.db");
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, time TEXT, photo TEXT)"
      );
    });
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM recipes",
          null,
          (_, resultSet) => setRecipes(resultSet.rows._array),
          (_, error) => console.log(error)
        );
      },
      null,
      () => setIsLoading(false)
    );
  }, []);

  const addRecipe = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipes (title, category, time) values (?, ?, ?)",
        [currentName, currentCategory, currentTime],
        (_, resultSet) => {
          let existingRecipes = [...recipes];
          existingRecipes.push({
            id: resultSet.insertId,
            title: currentName,
            category: currentCategory,
            time: currentTime,
          });
          setRecipes(existingRecipes);
          setCurrentName("");
          setCurrentCategory("");
          setCurrentTime("");
        },
        (_, error) => console.log(error)
      );
    });
  };

  const deleteRecipe = (id) => {
    console.log(id);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM recipes WHERE id = ?",
        [id],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingRecipes = [...recipes].filter(
              (recipe) => recipe.id !== id
            );
            setRecipes(existingRecipes);
          }
        },
        (_, error) => console.log(error)
      );
    });
  };

  const updateRecipe = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE recipes SET title = ?, category = ?, time = ? WHERE id = ?",
        [currentName, currentCategory, currentTime, id],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingRecipes = [...recipes];
            const indexToUpdate = existingRecipes.findIndex(
              (recipe) => recipe.id === id
            );
            existingRecipes[indexToUpdate].title = currentName;
            existingRecipes[indexToUpdate].category = currentCategory;
            existingRecipes[indexToUpdate].time = currentTime;
            setRecipes(existingRecipes);
            setCurrentName("");
            setCurrentCategory("");
            setCurrentTime("");
          }
        },
        (_, error) => console.log(error)
      );
    });
  };

  const showRecipes = () => {
    return recipes.map((recipe) => {
      return (
        <View key={recipe.id}>
          <Text style={styles.recipes__title}>{recipe.title}</Text>
          <Text style={styles.recipes__title}>{recipe.time}</Text>
          <Text style={styles.recipes__title}>{recipe.category}</Text>
          <Button
            title="Delete Recipe"
            onPress={() => deleteRecipe(recipe.id)}
          />
          <Button
            title="Update Recipe"
            onPress={() => updateRecipe(recipe.id)}
          />
        </View>
      );
    });
  };

  if (isLoading) {
    return <Text style={styles.recipes__title}>Loading</Text>;
  }

  return (
    <View>
      <TextInput
        style={styles.recipes__title}
        value={currentName}
        placeholder="Recipe name"
        onChangeText={setCurrentName}
      />
      <TextInput
        style={styles.recipes__title}
        value={currentCategory}
        placeholder="Recipe category"
        onChangeText={setCurrentCategory}
      />
      <TextInput
        style={styles.recipes__title}
        value={currentTime}
        placeholder="Recipe time"
        onChangeText={setCurrentTime}
      />
      <Button title="Add Recipe" onPress={addRecipe} />
      {showRecipes()}
    </View>
  );
};

const styles = StyleSheet.create({
  recipes__title: {
    color: "#1B1A17",
    fontSize: 30,
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
    fontSize: 10,
    margin: 10,
  },
});
