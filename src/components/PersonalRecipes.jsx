import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import {
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import {
  addPersonalRecipe,
  getAllByPersonalRecipe,
  deletePersonalRecipeById,
  deletePhotoFromRecipeById,
  markLikePersonalRecipe,
  updatePersonalRecipe,
} from "../../db/recipeDBService";
import { useData } from "../DataContext";
import * as ImagePicker from "expo-image-picker";
import { getElementById, deleteElementById } from "../../utilis/array-util";

export const PersonalRecipes = () => {
  const { personalRecipes, setPersonalRecipes } = useData();
  const [reload, setReload] = useState(false);
  const [addStepInput, setAddStepInput] = useState(false);
  const [addIngredientsInput, setAddIngredientsInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [currentName, setCurrentName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");
  const [editedRecipeId, setEditedRecipeId] = useState(null);
  const [modalDeleteRecipe, setModalDeleteRecipe] = useState(null);
  const [showAddPersonalRecipe, setShowAddPersonalRecipe] = useState(false);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedTypeOfCount, setSelectedTypeOfCount] = useState("г");

  const typeOfCountIngredient = ["г", "л"];

  useEffect(() => {
    getAllByPersonalRecipe().then((result) => {
      setPersonalRecipes(result);
      setIsLoading(!isLoading);
    });
  }, []);

  const addRecipe = () => {
    addPersonalRecipe({
      title: currentName,
      category: currentCategory,
      time: currentTime,
      photo: currentPhoto,
      isSystem: false,
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name,
        count: ingredient.quantity,
        typeOfCount: selectedTypeOfCount,
        calories: ingredient.calories,
      })),
      steps: steps.map((step, index) => ({
        orderliness: index + 1,
        description: step,
        time: 5,
      })),
    }).then((recipe) => {
      const existingRecipes = [...personalRecipes];
      existingRecipes.push(recipe);
      setPersonalRecipes(existingRecipes);
      setCurrentName("");
      setCurrentCategory("");
      setCurrentTime("");
      setCurrentPhoto(null);
      setSteps([""]);
    });
  };
  const handleTypeOfCountSelection = (selectedItem, index) => {
    setSelectedTypeOfCount(selectedItem);
  };

  const updateRecipe = (id) => {
    updatePersonalRecipe({
      currentName: currentName,
      currentCategory: currentCategory,
      currentTime: currentTime,
      currentPhoto: currentPhoto,
      id: id,
    })
      .then((updatedRecipe) => {
        let existingRecipe = getElementById(personalRecipes, id);
        existingRecipe.title = updatedRecipe.title;
        existingRecipe.category = updatedRecipe.category;
        existingRecipe.time = updatedRecipe.time;
        existingRecipe.photo = updatedRecipe.photo;
      })
      .catch((error) => console.log(error))
      .finally(() => setIsEditMode(false));
  };

  const deleteRecipe = (id) => {
    deletePersonalRecipeById(id).then(() => {
      let existingRecipes = deleteElementById(personalRecipes, id);
      setPersonalRecipes(existingRecipes);
    });
  };

  const deletePhotoFromRecipe = (id) => {
    deletePhotoFromRecipeById(id).then((rowsAffected) => {
      if (rowsAffected > 0) {
        setPersonalRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id ? { ...recipe, photo: null } : recipe
          )
        );
        setCurrentPhoto(null);
      }
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCurrentPhoto(result.assets[0].uri);
    }
  };

  const handleFavoritePress = (recipe) => {
    markLikePersonalRecipe(recipe.id, !Boolean(recipe.isLike));
    recipe.isLike = !recipe.isLike;
    setReload(!reload);
  };

  const showEditModal = (recipeId) => {
    setEditModal(recipeId);
  };

  const showDeleteModal = (recipeId) => {
    setModalDeleteRecipe(recipeId);
  };

  const enterEditMode = (id, recipe) => {
    setEditedRecipeId(id);
    setIsEditMode(true);
    setCurrentName(recipe.title);
    setCurrentCategory(recipe.category);
    setCurrentTime(recipe.time);
    setCurrentPhoto(recipe.photo);
  };

  const exitEditMode = () => {
    setIsEditMode(false);
  };

  const openAddStepModal = () => {
    setAddStepInput(true);
  };
  const addInput = () => {
    setSteps([...steps, ""]);
  };

  const openAddIngredientsModal = () => {
    setAddIngredientsInput(true);
  };

  const handleIngredientChange = (index, key, text) => {
    const updatedInputsIng = [...ingredients];
    updatedInputsIng[index][key] = text;
    setIngredients(updatedInputsIng);
  };

  const addInputIng = () => {
    setIngredients([...ingredients, { name: "", quantity: "", calories: "" }]);
  };

  const showRecipes = () => {
    return personalRecipes.map((recipe) => {
      return (
        <ScrollView key={recipe.id}>
          <View style={styles.recipes__card}>
            {isEditMode && editedRecipeId === recipe.id ? (
              <>
                {recipe.photo ? (
                  <>
                    <Image
                      source={{ uri: recipe.photo }}
                      style={styles.recipes__editPhoto}
                    />
                    <Button
                      title="Видалити фото"
                      onPress={() => deletePhotoFromRecipe(recipe.id)}
                    />
                  </>
                ) : (
                  <Button
                    title="Оберіть зображення до рецепту"
                    onPress={pickImage}
                  />
                )}

                <TextInput
                  style={styles.recipe__input}
                  value={currentName}
                  onChangeText={setCurrentName}
                  placeholder="Назва рецепту"
                />
                <TextInput
                  style={styles.recipe__input}
                  value={currentCategory}
                  onChangeText={setCurrentCategory}
                  placeholder="Категорія рецепту"
                />
                <TextInput
                  style={styles.recipe__input}
                  value={currentTime}
                  onChangeText={setCurrentTime}
                  placeholder="Час для приготування"
                />

                <Button
                  title="Зберегти рецепт"
                  onPress={() => updateRecipe(recipe.id)}
                />
                <Button title="Закрити" onPress={exitEditMode} />
              </>
            ) : (
              <>
                <TouchableOpacity>
                  <View>
                    <Image
                      source={{ uri: recipe.photo }}
                      style={styles.recipes__addedPhoto}
                    />
                    <TouchableOpacity>
                      <View style={styles.recipes__top}>
                        <Text
                          style={styles.recipes__title}
                          onLongPress={() => showEditModal(recipe.id)}
                        >
                          {recipe.title}
                        </Text>
                        <View style={styles.recipes__timeItem}>
                          <Entypo name="time-slot" size={25} color="black" />
                          <Text style={styles.recipes__time}>
                            {recipe.time}хв
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.recipes__category}>
                      {recipe.category}
                    </Text>
                  </View>
                </TouchableOpacity>
                {editModal === recipe.id && (
                  <View style={styles.recipes__edit}>
                    <View style={styles.recipes__btn}>
                      <Feather
                        name="edit-2"
                        size={25}
                        color="black"
                        onPress={() => enterEditMode(recipe.id, recipe)}
                      />
                      <AntDesign
                        name="delete"
                        size={25}
                        color="black"
                        onPress={() => showDeleteModal(recipe.id)}
                      />
                      <AntDesign
                        name="back"
                        size={24}
                        color="black"
                        onPress={() => setEditModal(false)}
                      />
                      <TouchableOpacity
                        onPress={() => handleFavoritePress(recipe)}
                      >
                        <FontAwesome
                          name={Boolean(recipe.isLike) ? "heart" : "heart-o"}
                          size={24}
                          color={Boolean(recipe.isLike) ? "red" : "black"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {modalDeleteRecipe === recipe.id && (
                  <Modal transparent={true}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 20,
                          borderRadius: 10,
                          width: "80%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            marginBottom: 20,
                            textAlign: "center",
                          }}
                        >
                          Ви дійсно хочете видалити цей рецепт?
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            title="Так"
                            onPress={() => deleteRecipe(recipe.id)}
                          />
                          <Button
                            title="Ні"
                            onPress={() => setModalDeleteRecipe(false)}
                          />
                        </View>
                      </View>
                    </View>
                  </Modal>
                )}
              </>
            )}
          </View>
        </ScrollView>
      );
    });
  };

  if (isLoading) {
    return <Text style={styles.recipes__title}>Loading</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View style={styles.recipe__container}>
          <View style={styles.recipesTop}>
            <Ionicons
              name="add"
              size={30}
              color="black"
              onPress={() => setShowAddPersonalRecipe(true)}
            />
            <Text style={styles.recipes__mainTitle}>Ваші рецепти</Text>
          </View>
          <View style={styles.recipes__item}>
            <ScrollView>
              <View>{showRecipes()}</View>
            </ScrollView>
          </View>
          {showAddPersonalRecipe && (
            <View style={styles.recipes__addPesonalRecipePopup}>
              <ScrollView style={styles.recipes__addPesonalRecipePopupScroll}>
                <Ionicons
                  name="close"
                  size={24}
                  color="black"
                  style={styles.recipes__closeAddRecipeIcon}
                  onPress={() => setShowAddPersonalRecipe(false)}
                />
                <Text style={styles.recipes__titleAdd}>
                  Щоб додати ваш рецепт заповніть відповідні поля та натисніть
                  "Додати рецепт"
                </Text>
                <View style={styles.recipes__addPhotoBtn}>
                  <Button title="Виберіть зображення" onPress={pickImage} />
                  {currentPhoto && (
                    <Text style={styles.recipes__titleAdd}>
                      Зображення обрано
                    </Text>
                  )}
                </View>
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

                {addStepInput && (
                  <View style={styles.stepModal}>
                    <View>
                      {steps.map((input, index) => (
                        <TextInput
                          key={index}
                          value={input}
                          style={styles.recipe__input}
                          placeholder="Крок"
                          onChangeText={(text) => {
                            const updatedInputs = [...steps];
                            updatedInputs[index] = text;
                            setSteps(updatedInputs);
                          }}
                        />
                      ))}
                    </View>
                    <AntDesign
                      style={{ marginHorizontal: 20, marginBottom: 15 }}
                      name="plus"
                      size={24}
                      color="white"
                      onPress={addInput}
                    />
                  </View>
                )}

                {addIngredientsInput && (
                  <View style={styles.stepModal}>
                    <View>
                      {ingredients.map((input, index) => (
                        <View key={index} style={styles.recipe__inputContainer}>
                          <TextInput
                            value={input.name}
                            style={styles.recipe__input}
                            placeholder="Інгредієнт"
                            onChangeText={(text) =>
                              handleIngredientChange(index, "name", text)
                            }
                          />
                          <View
                            style={{
                              flexDirection: "row",
                              width: "82%",
                              marginLeft: 6,
                            }}
                          >
                            <TextInput
                              value={input.quantity}
                              style={{
                                fontSize: 16,
                                padding: 12,
                                borderWidth: 0.8,
                                borderColor: "#A9A9A9",
                                borderRadius: 8,
                                backgroundColor: "#F1F6F9",
                                color: "#1B1A17",
                                width: "70%",
                                margin: 12,
                              }}
                              placeholder="Кількість"
                              onChangeText={(text) =>
                                handleIngredientChange(index, "quantity", text)
                              }
                            />

                            <SelectDropdown
                              data={typeOfCountIngredient}
                              onSelect={handleTypeOfCountSelection}
                              buttonTextAfterSelection={(selectedItem, index) =>
                                selectedItem
                              }
                              rowTextForSelection={(item, index) => item}
                              defaultButtonText="г чи л"
                              buttonStyle={{
                                fontSize: 16,
                                padding: 12,
                                borderWidth: 0.8,
                                borderColor: "#A9A9A9",
                                borderRadius: 8,
                                backgroundColor: "#F1F6F9",
                                width: "30%",
                                margin: 12,
                              }}
                            />
                          </View>
                          <TextInput
                            value={input.calories}
                            style={styles.recipe__input}
                            placeholder="Ккал/100г"
                            onChangeText={(text) =>
                              handleIngredientChange(index, "calories", text)
                            }
                          />
                        </View>
                      ))}
                    </View>
                    <AntDesign
                      style={{ marginHorizontal: 20, marginBottom: 15 }}
                      name="plus"
                      size={24}
                      color="white"
                      onPress={addInputIng}
                    />
                  </View>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#2876f9",
                      padding: 12,
                      borderRadius: 8,
                      flex: 1,
                      margin: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: "white",
                        textAlign: "center",
                      }}
                      onPress={openAddStepModal}
                    >
                      Додати кроки
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#2876f9",
                      padding: 12,
                      borderRadius: 8,

                      flex: 1,
                      margin: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: "white",
                        textAlign: "center",
                      }}
                      onPress={openAddIngredientsModal}
                    >
                      Додати інгредієнти
                    </Text>
                  </View>
                </View>
                <View>
                  <Button
                    style={{
                      fontSize: 24,
                      fontWeight: 400,
                      alignSelf: "center",
                      margin: 30,
                    }}
                    onPress={addRecipe}
                    title="Додати рецепт"
                  />
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  recipesTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginTop: 10,
  },
  recipes__item: {
    margin: 10,
  },
  recipe__container: {
    width: "100%",
    height: 800,
  },
  recipes__card: {
    width: "80%",
    margin: 10,
    marginHorizontal: 35,
    backgroundColor: "#F5F5F5",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  recipes__top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
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
  },
  recipes__time: {
    color: "#1B1A17",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  recipes__btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
  },
  recipes__edit: {
    borderTopWidth: 0.4,
    borderTopColor: "#B4B4B3",
  },
  recipes__editPhoto: {
    width: "100%",
    height: 175,
    marginBottom: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  recipes__closeAddRecipeIcon: {
    marginVertical: 10,
  },
  recipes__addPhotoBtn: {
    alignSelf: "center",
    marginTop: 10,
  },
  addDish__select: {
    width: 100,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F1F6F9",
  },
  recipe__input: {
    alignSelf: "center",
    fontSize: 16,
    padding: 15,
    borderWidth: 0.8,
    borderColor: "#A9A9A9",
    borderRadius: 8,
    backgroundColor: "#F1F6F9",
    color: "#1B1A17",
    width: "90%",
    margin: 12,
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
    height: 90,
    marginTop: 10,
  },

  recipes__addPesonalRecipePopup: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F5F5F5",
    alignItems: "left",
    paddingHorizontal: 20,
  },
  recipes__addPesonalRecipePopupScroll: {
    width: "100%",
  },
  stepModal: {
    width: "100%",
    backgroundColor: "#A9A9A9",
    borderRadius: 8,
    margin: 2,
  },
});
