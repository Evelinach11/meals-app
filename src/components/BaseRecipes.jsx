import {
  fetchRecipes,
  addRecipe,
  isRecipeTableEmpty,
  deleteRecipeById,
} from "../../db/recipeDBService";
import { useData } from "../DataContext";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { borch, ceasarSalad } from "../data/recipe-data";
import React, { useEffect, useState } from "react";
import { deleteElementById } from "../../utilis/array-util";
import { View, StyleSheet, ScrollView, Text, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { markLikeRecipe } from "../../db/recipeDBService";

export const BaseRecipes = ({ route }) => {
  const { recipes, setRecipes } = useData();
  const [reload, setReload] = useState(false);
  const [caloriesCount, setCaloriesCount] = useState();
  const [showRecipePopUP, setShowRecipePopUP] = useState(null);

  const { category } = route.params;

  useEffect(() => {
    isRecipeTableEmpty()
      .then((isEmpty) => {
        if (isEmpty) {
          addRecipe(borch);
          addRecipe(ceasarSalad);
          setReload(!reload);
        } else {
          fetchRecipes()
            .then((recipesWithIngredients) => {
              const filteredRecipes = recipesWithIngredients.filter(
                (recipe) => recipe.category === category
              );

              setRecipes(filteredRecipes);
            })
            .catch((error) => {
              console.error("Error fetching recipes:", error);
            });
          console.log("Таблиця 'recipes' не є порожньою.");
        }
      })
      .catch((error) => {
        console.error("Помилка перевірки таблиці 'recipes':", error);
      });
  }, [reload]);

  const deleteRecipe = (id) => {
    deleteRecipeById(id).then(() => {
      let existingRecipes = deleteElementById(recipes, id);
      setRecipes(existingRecipes);
    });
  };

  const openRecipe = (recipeId) => {
    setShowRecipePopUP(recipeId);
  };

  const closeRecipe = () => {
    setShowRecipePopUP(null);
  };

  const countCalories = (recipeIng) => {
    return recipeIng.reduce((totalCalories, ingredient) => {
      setCaloriesCount(totalCalories);
      return totalCalories + (ingredient.count / 100) * ingredient.calories;
    }, 0);
  };

  const showDeleteModal = (recipeId) => {
    Alert.alert(
      "Підтвердити видалення",
      "Ви впевнені, що хочете видалити базовий рецепт?",
      [
        {
          text: "Закрити",
          style: "cancel",
        },
        {
          text: "Видалити",
          onPress: () => deleteRecipe(recipeId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleFavoritePress = (recipe) => {
    markLikeRecipe(recipe.id, !Boolean(recipe.isLike));
    recipe.isLike = !recipe.isLike;
    setReload(!reload);
  };

  const ingredientsList = (ingredients) => {
    return (
      <View>
        {ingredients.map((ingredient) => (
          <View key={ingredient.id} style={styles.ingredients}>
            <Text style={styles.ingredientName}>
              {ingredient.name.charAt(0).toUpperCase() +
                ingredient.name.slice(1)}
            </Text>
            <Text style={styles.ingredientCount}>{ingredient.count}</Text>
            <Text style={styles.ingredientTypeOfCount}>
              {ingredient.typeOfCount}
            </Text>
            <Text style={styles.ingredientTypeOfCount}>
              {ingredient.calories}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {recipes.map((recipe) =>
          showRecipePopUP ? (
            showRecipePopUP === recipe.id && (
              <View style={styles.recipeDescription}>
                <AntDesign
                  name="left"
                  size={30}
                  color="#040D12"
                  onPress={closeRecipe}
                  style={{ marginBottom: 10 }}
                />
                <View>
                  <TouchableOpacity>
                    <Image
                      source={recipe.photo}
                      style={styles.recipeImageFull}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                    width: 350,
                  }}
                >
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <View
                    style={{
                      backgroundColor: "#183D3D",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: "#FDFAF6",
                      }}
                      onPress={() => {
                        const calculatedCalories = countCalories(
                          recipe.ingredients
                        );
                        setCaloriesCount(calculatedCalories);
                      }}
                    >
                      Підрахувати ккал
                    </Text>
                    {caloriesCount > 0 && (
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#FDFAF6",
                          textAlign: "center",
                        }}
                      >
                        {Math.floor(caloriesCount)}
                      </Text>
                    )}
                  </View>
                </View>

                <Text style={styles.recipeTime}>
                  <Entypo name="time-slot" size={24} color="#040D12" />
                  {recipe.time}
                </Text>

                <Text style={styles.recipeCategory}>{recipe.category}</Text>
                <Text style={styles.ingredients}>
                  {ingredientsList(recipe.ingredients, recipe.id)}
                </Text>
              </View>
            )
          ) : (
            <View style={styles.recipeCard}>
              <View>
                <Image source={recipe.photo} style={styles.recipeImage} />
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={styles.recipeTitle}
                  onPress={() => {
                    openRecipe(recipe.id);
                  }}
                >
                  {recipe.title}
                </Text>
                <Text style={styles.recipeCategory}>{recipe.category}</Text>
                <View style={styles.timeContainer}>
                  <Entypo name="time-slot" size={18} color="#040D12" />
                  <Text style={styles.recipeTime}>{recipe.time}</Text>
                </View>
              </View>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name="delete"
                  size={28}
                  color="black"
                  onPress={() => showDeleteModal(recipe.id)}
                />
                <TouchableOpacity onPress={() => handleFavoritePress(recipe)}>
                  <FontAwesome
                    name={Boolean(recipe.isLike) ? "heart" : "heart-o"}
                    size={28}
                    color={Boolean(recipe.isLike) ? "red" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
  },
  ingredients: {
    flexDirection: "row",
    marginVertical: 8,
  },
  ingredientName: {
    margin: 2,
    fontSize: 22,
    fontWeight: "600",
  },
  ingredientCount: {
    margin: 2,
    fontSize: 22,
    fontWeight: "600",
  },
  ingredientTypeOfCount: {
    margin: 2,
    fontSize: 22,
    fontWeight: "600",
  },
  recipeCard: {
    height: 150,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FDFAF6",
    width: "95%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    margin: 10,
    alignSelf: "center",
  },
  recipeDescription: {
    backgroundColor: "#93B1A6",
    padding: 22,
  },
  recipeTime: {
    fontSize: 18,
    fontWeight: "500",
    padding: 1,
    color: "#040D12",
  },
  recipeTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "#040D12",
  },
  recipeCategory: {
    fontSize: 22,
    fontWeight: "400",
    color: "#7D7C7C",
  },
  recipeImage: {
    flex: 1,
    width: 120,
    borderRadius: 8,
    margin: 10,
  },
  recipeImageFull: {
    height: 200,
    width: 350,
    borderRadius: 8,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    marginRight: 10,
  },
  textContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },
  timeContainer: {
    flexDirection: "row",
  },
});
