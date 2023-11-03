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
import {
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import {
  addPersonalRecipe,
  deletePersonalRecipeById,
  getAllByPersonalRecipe,
  markLikePersonalRecipe,
  updatePersonalRecipe,
  deletePhotoFromRecipeById,
} from "../../db/personalRecipeDBService";
import * as ImagePicker from "expo-image-picker";
import { getElementById, deleteElementById } from "../../utilis/array-util";

export const PersonalRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [reload, setReload] = useState(false);
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

  useEffect(() => {
    getAllByPersonalRecipe().then((result) => {
      setRecipes(result);
      setIsLoading(!isLoading);
    });
  }, []);

  const addRecipe = () => {
    addPersonalRecipe(
      currentName,
      currentCategory,
      currentTime,
      currentPhoto
    ).then((recipe) => {
      const existingRecipes = [...recipes];
      existingRecipes.push(recipe);
      setRecipes(existingRecipes);
    });
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
        let existingRecipe = getElementById(recipes, id);
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
      let existingRecipes = deleteElementById(recipes, id);
      setRecipes(existingRecipes);
    });
  };

  const deletePhotoFromRecipe = (id) => {
    deletePhotoFromRecipeById(id).then((rowsAffected) => {
      if (rowsAffected > 0) {
        setRecipes((prevRecipes) =>
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

  const showRecipes = () => {
    return recipes.map((recipe) => {
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
                  <Image
                    source={{ uri: currentPhoto }}
                    style={styles.recipes__addedPhoto}
                  />
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
                  >
                    Додати інгредієнти
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  color: "#2876f9",
                  alignSelf: "center",
                  margin: 30,
                }}
                onPress={addRecipe}
              >
                Додати рецепт
              </Text>
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
  recipe__input: {
    alignSelf: "center",
    fontSize: 16,
    padding: 12,
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
});
