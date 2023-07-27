import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import ImagePicker from "react-native-image-picker";

import {
  addPersonalRecipe,
  deletePersonalRecipeById,
} from "../../db/personalRecipeDBService";
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
        "CREATE TABLE IF NOT EXISTS personalRecipe (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, time TEXT, photo TEXT)"
      );
    });
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM personalRecipe",
          null,
          (_, resultSet) => setRecipes(resultSet.rows._array),
          (_, error) => console.log(error)
        );
      },
      null,
      () => setIsLoading(false)
    );
  }, []);

  const openImagePicker = () => {
    const options = {
      title: "Виберіть фото для рецепту",
      mediaType: "photo",
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("Ви скасували вибір фото");
      } else if (response.error) {
        console.log("Сталась помилка: ", response.error);
      } else {
        // response.uri містить URI фото, яке користувач обрав або зняв
        console.log("URI фото: ", response.uri);
      }
    });
  };

  const addRecipe = () => {
    addPersonalRecipe(currentName, currentCategory, currentTime).then(
      (recipe) => {
        const existingRecipes = [...recipes];
        existingRecipes.push(recipe);
        setRecipes(existingRecipes);
      }
    );
  };

  const deleteRecipe = (id) => {
    console.log(id);
    deletePersonalRecipeById(id)
      .then(() => {
        let existingRecipes = [...recipes].filter((recipe) => recipe.id !== id);
        setRecipes(existingRecipes);
      })
      .catch((error) => console.log(error));
  };

  const updateRecipe = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE personalRecipe SET title = ?, category = ?, time = ? WHERE id = ?",
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
        <View style={styles.recipes__item} key={recipe.id}>
          <ScrollView>
            <Text style={styles.recipes__title}>{recipe.title}</Text>
            <View style={styles.recipes__timeItem}>
              <Entypo name="time-slot" size={24} color="black" />
              <Text style={styles.recipes__time}>{recipe.time}хв</Text>
            </View>
            <Text style={styles.recipes__category}>{recipe.category}</Text>
            <View style={styles.recipes__btn}>
              <Button
                title="Видалити рецепт"
                onPress={() => deleteRecipe(recipe.id)}
              />
              <Button
                title="Змінити рецепт"
                onPress={() => updateRecipe(recipe.id)}
              />
            </View>
          </ScrollView>
        </View>
      );
    });
  };

  if (isLoading) {
    return <Text style={styles.recipes__title}>Loading</Text>;
  }

  return (
    <View style={styles.recipe__AddInput}>
      <Text style={styles.recipes__titleAdd}>
        Щоб додати ваш рецепт заповніть відповідні поля та натисніть "Додати
        рецепт"
      </Text>
      <TextInput
        style={styles.recipe__input}
        value={currentName}
        placeholder="Назва рецепту"
        onChangeText={setCurrentName}
      />
      <TextInput
        style={styles.recipe__input}
        value={currentCategory}
        placeholder="Категорія рецепту"
        onChangeText={setCurrentCategory}
      />
      <TextInput
        style={styles.recipe__input}
        value={currentTime}
        placeholder="Час для приготування"
        onChangeText={setCurrentTime}
      />
      <Button title="Обрати фото" onPress={openImagePicker} />
      <Button title="Додати рецепт" onPress={addRecipe} />
      <Text style={styles.recipes__titleAdd}>Ваші рецепти</Text>
      <ScrollView>{showRecipes()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  recipes__title: {
    color: "#1B1A17",
    fontSize: 30,
    fontWeight: "500",
    textAlign: "left",
    marginBottom: 10,
  },
  recipe__AddInput: {
    alignSelf: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    width: "90%",
    borderColor: "#001C30",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#F4D19B",
  },
  recipes__item: {
    alignSelf: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    width: "100%",
    borderColor: "#001C30",
    backgroundColor: "#D7E9F7",
    borderWidth: 1,
    borderRadius: 20,
  },
  recipes__category: {
    color: "#1B1A17",
    fontWeight: "500",

    fontSize: 18,
    marginBottom: 10,
  },
  recipes__timeItem: {
    flexDirection: "row",
  },
  recipes__time: {
    color: "#1B1A17",
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  recipes__btn: {
    flexDirection: "row",
  },
  recipe__input: {
    alignSelf: "center",
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#001C30",
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    color: "#1B1A17",
    width: "100%",
    margin: 15,
  },
  recipes__titleRecipes: {
    fontSize: 15,
    alignSelf: "center",
  },
  recipes__titleAdd: {
    fontSize: 25,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "600",
    width: "100%",
    marginTop: 10,
  },
});
