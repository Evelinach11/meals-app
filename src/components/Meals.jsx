import { useState } from "react";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {
  addMeal,
  isMealsTableEmpty,
  deleteNotSystemMealById,
  fetchByDate,
  fetchSystemMeals,
} from "../../db/mealsDBService";
import {
  breakfast,
  lunch,
  snack,
  dinner,
  notSystemPhoto,
} from "../data/meal-data";
import { deleteElementById } from "../../utilis/array-util";
import { AddMealModal } from "./meal-frames/AddMealModal.jsx";

export const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [showMenuOnDay, setShowMenuOnDay] = useState(false);
  const [showPopupAddDish, setShowPopupAddDish] = useState(false);
  const [showPopupAddMeal, setShowPopupAddMeal] = useState(false);
  const [modalDeleteRecipe, setModalDeleteRecipe] = useState(null);

  const route = useRoute();
  const selectedDate = route.params?.selectedDate;

  useEffect(() => {
    fillDefaultMeals();
    getMeals();
  }, []);

  const addPersonalMeal = () => {
    addMeal({
      title: currentTitle,
      photo: getRandomPhoto(notSystemPhoto),
      date: selectedDate,
      isSystem: false,
    }).then((meal) => {
      const existingMeals = [...meals];
      existingMeals.push(meal);
      setMeals(existingMeals);
    });
  };

  const getMeals = async () => {
    try {
      const systemMeals = await fetchSystemMeals();
      setMeals(systemMeals);

      const mealsByDate = await fetchByDate(selectedDate);
      setMeals((prevMeals) => [...prevMeals, ...mealsByDate]);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const fillDefaultMeals = () => {
    isMealsTableEmpty()
      .then((isEmpty) => {
        if (isEmpty) {
          addMeal(breakfast);
          addMeal(lunch);
          addMeal(snack);
          addMeal(dinner);
        }
      })
      .catch((error) => {
        console.error("Помилка перевірки таблиці 'meal':", error);
      });
  };

  function getRandomPhoto(array) {
    const randomPhoto = Math.floor(Math.random() * array.length);
    console.log(array[randomPhoto].photo);
    return array[randomPhoto].photo;
  }
  const showAlert = () =>
    Alert.alert("Упс...", "Цей прийом їжі видалити не можливо", [
      {
        text: "Закрити",
        style: "cancel",
      },
    ]);

  const deleteMeal = (id) => {
    deleteNotSystemMealById(id)
      .then(() => {
        let existingMeals = deleteElementById(meals, id);
        setMeals(existingMeals);
      })
      .catch(showAlert)
      .finally(closeDeleteModal);
  };

  const showDeleteModal = (mealId) => {
    setModalDeleteRecipe(mealId);
  };

  return (
    <View>
      <View style={styles.meals}>
        <View style={styles.meals__currentData}>
          <Text style={styles.meals__currentDataText}>
            Ваше меню на : {selectedDate}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.mealCardContainer}>
            {meals.map((meal, index) => (
              <View style={styles.mealCard} key={index}>
                <TouchableOpacity onLongPress={() => showDeleteModal(meal.id)}>
                  <Image source={meal.photo} style={styles.mealImg} />
                  <TouchableOpacity>
                    <Text
                      style={styles.meal}
                      onPress={() => setShowMenuOnDay(true)}
                    >
                      {meal.title}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                <View>
                  {modalDeleteRecipe === meal.id && (
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
                            Ви дійсно хочете видалити цей прийом?
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              title="Видалили"
                              color="red"
                              onPress={() => deleteMeal(meal.id)}
                            />
                            <Button
                              title="Відмінити"
                              onPress={() => setModalDeleteRecipe(false)}
                            />
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.buttonItem}>
          <TouchableOpacity style={styles.meals__add}>
            <Text
              onPress={() => setShowPopupAddMeal(true)}
              style={styles.meals__addText}
            >
              Додай прийом їжі
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.meals__add}>
            <Text
              onPress={() => setShowPopupAddDish(true)}
              style={styles.meals__addText}
            >
              Додай страву
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showMenuOnDay && (
        <View style={styles.meals__dayMenu}>
          <TouchableOpacity
            style={styles.meals__dayClose}
            onPress={() => setShowMenuOnDay(false)}
          >
            <AntDesign name="close" size={30} color="#1B1A17" />
          </TouchableOpacity>
          <Text style={styles.meals__dayMenuTitlle}>Твої страви</Text>
        </View>
      )}
      {showPopupAddDish && (
        <View style={styles.meals__addDish}>
          <View style={styles.meals__addDishTop}>
            <Text style={styles.meals__addDishTitle}>Додайте страву</Text>
            <TextInput
              style={styles.meals__addDishSearch}
              type="search"
              id="site-search"
              name="q"
              // value={newDish}
              placeholder="Пошук страви"
              // onChangeText={handleNewDishChange}
            ></TextInput>
          </View>
          <View style={styles.meals__addDishMiddle}>
            <Text style={styles.meals__addDishChoose}>
              Оберіть прийом до якого хочете додати страву
            </Text>
            <View style={styles.meals__addDishSelect}>
              <View style={styles.meals__addDishSelect}>
                <SelectDropdown
                  data={meals.map((meal) => meal.title)}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                  buttonStyle={styles.meals__addDishSelect}
                  dropdownStyle={styles.meals__addDishSelect}
                />
              </View>
            </View>
          </View>
          <View style={styles.meals__addDishAddButton}>
            <TouchableOpacity
              style={styles.meals__addDishAdd}
              onPress={addNewDish}
            >
              <Text style={styles.meals__addDishAddText}>Додати</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.meals__addDishAdd}
              onPress={() => setShowPopupAddDish(false)}
            >
              <Text style={styles.meals__addDishAddText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showPopupAddMeal && (
        <AddMealModal
          addPersonalMeal={addPersonalMeal}
          currentTitle={currentTitle}
          setCurrentTitle={setCurrentTitle}
          setShowPopupAddMeal={setShowPopupAddMeal}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  meals: { backgroundColor: "white", height: "100%", alignItems: "center" },
  meals__currentData: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  meals__currentDataText: {
    color: "#001C30",
    fontWeight: "500",
    fontSize: 30,
  },
  mealCardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 10,
  },
  mealCard: {
    borderColor: "#5D9C59",
    borderRadius: 20,
    borderWidth: 1,
    width: "45%",
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
  },
  mealImg: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  meal: {
    textAlign: "center",
    fontSize: 20,
    color: "#001C30",
    fontWeight: "bold",
  },
  buttonItem: {
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: 20,
  },
  meals__add: {
    backgroundColor: "#1B1A17",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    width: "100%",
    alignItems: "center",
  },
  meals__addText: {
    padding: 5,
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  meals__dayMenu: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "left",
  },
  meals__dayMenuTitlle: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
  },
  meals__dayMenuDish: {
    fontSize: 30,
    fontWeight: "500",
    margin: 20,
  },
  meals__dayText: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
    color: "red",
  },
  meals__dayClose: {
    margin: 20,
    alignContent: "left",
  },
  meals__addDish: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
  meals__addDishMiddle: {
    backgroundColor: "#FF8551",
    width: "90%",
    alignItems: "center",
    borderColor: "#001C30",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 50,
    padding: 10,
  },
  meals__addDishTop: {
    backgroundColor: "#2E8A99",
    alignItems: "center",
    marginTop: 50,
    width: "90%",
    borderColor: "#001C30",
    borderWidth: 1,
    borderRadius: 20,
  },
  meals__addDishClose: {
    margin: 20,
  },
  meals__addDishTitle: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 5,
  },
  meals__addDishChoose: {
    fontSize: 15,
    fontWeight: "500",
    margin: 5,
  },
  meals__addDishSearch: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#001C30",
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    color: "#1B1A17",
    width: "70%",
    margin: 10,
  },
  meals__addDishSelect: {
    width: "70%",
    backgroundColor: "#F5F5F5",
    color: "#1B1A17",
    borderRadius: 20,
  },
  meals__addDishAddButton: {
    marginTop: 50,
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: 20,
  },
  meals__addDishAddText: {
    padding: 5,
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  meals__addDishAdd: {
    backgroundColor: "#1B1A17",
    borderRadius: 20,
    margin: 2,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
});
