import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet, Modal, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  deleteRecipeInMealsByRecipeId,
  getByRecipeByMealsType,
} from "../../../db/dishesMealDBService";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export const ShowDishsOnMeal = ({ route }) => {
  const [dishsByDateAndType, setDishsByDateAndType] = useState([]);
  const [startCookingModal, setStartCookingModal] = useState(false);
  const { mealId, selectedDate } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    getByRecipeByMealsType(mealId, selectedDate).then((result) => {
      setDishsByDateAndType(result);
    });
  }, []);

  const deleteDish = (recipeId) => {
    deleteRecipeInMealsByRecipeId(recipeId, mealId).then(() => {
      console.log(dishsByDateAndType);
      console.log("dishsByDateAndType");
      let existingRecipes = dishsByDateAndType.filter(
        (dishOnMeal) =>
          dishOnMeal.id !== recipeId && recipe.typeOfMeals !== mealId
      );
      console.log("existingRecipes");
      console.log(existingRecipes);
      setDishsByDateAndType(existingRecipes);
    });
  };

  const navigateToStartCooking = (recipeId, recipeTime) => {
    navigation.navigate("PrepareForCooking", {
      recipeId: recipeId,
      recipeTime: recipeTime,
    });
    setStartCookingModal(false);
  };

  const startCooking = () => {
    setStartCookingModal(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {dishsByDateAndType.map((recipe, index) => (
          <View style={styles.dishOnMealCard} key={index}>
            <Image source={recipe.photo} style={styles.dishOnMealCardImage} />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <View>
                <Text style={styles.dishOnMealCardTitle}>{recipe.title}</Text>
                <Text style={styles.dishOnMealCardCategory}>
                  {recipe.category}
                </Text>
                <View style={styles.dishOnMealCardTime}>
                  <Entypo name="time-slot" size={25} color="#FDFAF6" />
                  <Text style={styles.dishOnMealCardTimeText}>
                    {recipe.time}
                  </Text>
                </View>
              </View>
              <View>
                <MaterialIcons
                  name="delete-outline"
                  size={35}
                  color="#FDFAF6"
                  onPress={() => deleteDish(recipe.id)}
                />
              </View>
            </View>
            <View style={styles.dishOnMealCardBtnItem}>
              <Text onPress={startCooking} style={styles.dishOnMealCardBtn}>
                Розпочати готування
              </Text>
            </View>
            {startCookingModal && (
              <Modal>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      margin: 20,
                      textAlign: "center",
                    }}
                  >
                    Вам потрібно обрати інгредієнти які у вас є, інші з`являться
                    в розділі "Корзина покупок"
                  </Text>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                    onPress={() => {
                      navigateToStartCooking(recipe.id, recipe.time);
                    }}
                  >
                    Далі
                  </Text>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                    onPress={() => {
                      setStartCookingModal(false);
                    }}
                  >
                    Назад
                  </Text>
                </View>
              </Modal>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
  startCookingModal: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
  dishOnMealCardImage: {
    width: 330,
    height: 160,
    borderRadius: 8,
  },
  dishOnMealTitle: {
    fontSize: 30,
    fontWeight: "500",
    margin: 10,
  },
  dishOnMealCard: {
    width: "90%",
    height: 330,
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#1C6758",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    margin: 6,
  },
  dishOnMealCardTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
  dishOnMealCardCategory: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
  dishOnMealCardTime: {
    flexDirection: "row",
  },
  dishOnMealCardTimeText: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
  dishOnMealCardBtn: {
    padding: 10,
    color: "#1C6758",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  dishOnMealCardBtnItem: {
    backgroundColor: "#FDFAF6",
    borderRadius: 12,
    padding: 2,
    margin: 2,
    width: "100%",
    alignSelf: "center",
  },
});
