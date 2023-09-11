import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  deleteRecipeInMealsById,
  getByRecipeByMealsType,
} from "../../../db/dishesMealDBService";
import { deleteElementById } from "../../../utilis/array-util";

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

  const deleteDish = (id) => {
    deleteRecipeInMealsById(id).then(() => {
      let existingRecipes = deleteElementById(dishsByDateAndType, id);
      setDishsByDateAndType(existingRecipes);
    });
  };

  const navigateToStartCooking = (recipeId) => {
    navigation.navigate("PrepareForCooking", {
      recipeId: recipeId,
    });
    setStartCookingModal(false);
  };

  const startCooking = () => {
    setStartCookingModal(true);
  };

  return (
    <View style={styles.dishOnMeal__container}>
      <Text style={styles.dishOnMeal__title}>Твої страви</Text>
      {dishsByDateAndType.map((recipe, index) => (
        <View style={styles.dishOnMeal__card} key={index}>
          <Text style={styles.dishOnMeal__card__title}>{recipe.title}</Text>
          <Text style={styles.dishOnMeal__card__category}>
            {recipe.category}
          </Text>
          <View style={styles.dishOnMeal__card__time}>
            <Entypo name="time-slot" size={25} color="#FDFAF6" />
            <Text style={styles.dishOnMeal__card__time__text}>
              {recipe.time}
            </Text>
          </View>
          <View style={styles.dishOnMeal__card__btn__item}>
            <Text
              style={styles.dishOnMeal__card__btn}
              onPress={() => deleteDish(recipe.id)}
            >
              Видалити
            </Text>
          </View>
          <View style={styles.dishOnMeal__card__btn__item}>
            <Text onPress={startCooking} style={styles.dishOnMeal__card__btn}>
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
                  Вам потрібно обрати інгредієнти які у вас є, інші з`являться в
                  розділі "Корзина покупок"
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                  onPress={() => {
                    navigateToStartCooking(recipe.id);
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
  );
};
const styles = StyleSheet.create({
  dishOnMeal__container: {
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
  dishOnMeal__title: {
    fontSize: 30,
    fontWeight: "500",
    margin: 10,
  },
  dishOnMeal__card: {
    width: "90%",
    height: 200,
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#1C6758",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    margin: 2,
  },
  dishOnMeal__card__title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
  dishOnMeal__card__category: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
  dishOnMeal__card__time: {
    flexDirection: "row",
  },
  dishOnMeal__card__time__text: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FDFAF6",
  },
  dishOnMeal__card__btn: {
    padding: 10,
    color: "#1C6758",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  dishOnMeal__card__btn__item: {
    backgroundColor: "#E4EFE7",
    width: "90%",
    margin: 1,
    borderRadius: 20,
    alignSelf: "center",
  },
});
