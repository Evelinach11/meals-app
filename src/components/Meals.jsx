import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
import { useState } from "react";
import { useData } from "../DataContext";
import React, { useEffect } from "react";
import { add } from "../../db/dishesMealDBService";
import { useRoute } from "@react-navigation/native";
import { fetchRecipes } from "../../db/recipeDBService";
import { useNavigation } from "@react-navigation/native";
import { deleteElementById } from "../../utilis/array-util";
import { AddMealModal } from "./meal-frames/AddMealModal.jsx";
import { DeleteMealModal } from "./meal-frames/DeleteMealModal";
import { AddDishToMealModal } from "./meal-frames/AddDishToMealModal";

export const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [mealWithDish, setMealWithDish] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [modalDeleteMeal, setModalDeleteMeal] = useState(null);
  const [showPopupAddDish, setShowPopupAddDish] = useState(false);
  const [showPopupAddMeal, setShowPopupAddMeal] = useState(false);

  const { selectedMealId } = useData();
  const { selectedRecipeId } = useData();
  const { recipes, setRecipes } = useData();

  const route = useRoute();
  const navigation = useNavigation();

  const selectedDate = route.params?.selectedDate;

  useEffect(() => {
    fillDefaultMeals();
    getMeals();
    fetchRecipes()
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
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

  const addDishToMeal = () => {
    if (selectedRecipeId === null || selectedMealId === null) {
      alert("please select all fields");
    } else {
      add({
        date: selectedDate,
        typeOfMeals: selectedMealId,
        recipe_id: selectedRecipeId,
      }).then((meal) => {
        const existingMeals = [...mealWithDish];
        existingMeals.push(meal);
        setMealWithDish(existingMeals);
        console.log(mealWithDish);
      });
    }
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
      .finally(() => showDeleteModal(false));
  };

  const showDeleteModal = (mealId) => {
    setModalDeleteMeal(mealId);
  };

  const navigateToDishesInTheMealModal = (mealId) => {
    navigation.navigate("ShowDishsInMealModal", {
      mealId: mealId,
      selectedDate: selectedDate,
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.mealsCurrentData}>
          <Text style={styles.mealsCurrentDataText}>{selectedDate}</Text>
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
                      onPress={() => {
                        navigateToDishesInTheMealModal(meal.id);
                      }}
                    >
                      {meal.title}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                <View>
                  {modalDeleteMeal === meal.id && (
                    <DeleteMealModal
                      deleteMeal={deleteMeal}
                      meal={meal}
                      setModalDeleteMeal={setModalDeleteMeal}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.buttonItem}>
          <TouchableOpacity style={styles.mealsButton}>
            <Text
              onPress={() => setShowPopupAddMeal(true)}
              style={styles.mealsButtonText}
            >
              Додай прийом їжі
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mealsButton}>
            <Text
              onPress={() => setShowPopupAddDish(true)}
              style={styles.mealsButtonText}
            >
              Додай страву
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showPopupAddDish && (
        <AddDishToMealModal
          addDishToMeal={addDishToMeal}
          setShowPopupAddDish={setShowPopupAddDish}
          recipes={recipes}
          meals={meals}
        />
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
  container: {
    backgroundColor: "#1C6758",
    height: "100%",
    alignItems: "center",
  },
  mealsCurrentData: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  mealsCurrentDataText: {
    color: "#FDFAF6",
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
    borderRadius: 20,
    width: "45%",
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: "#FDFAF6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  mealImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
  },
  meal: {
    textAlign: "center",
    fontSize: 20,
    color: "#1C6758",
    fontWeight: "bold",
  },
  buttonItem: {
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: 20,
  },
  mealsButton: {
    backgroundColor: "#FDFAF6",
    borderRadius: 12,
    padding: 10,
    margin: 10,
    width: "100%",
    alignItems: "center",
  },
  mealsButtonText: {
    padding: 5,
    color: "#1C6758",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});
