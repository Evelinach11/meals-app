import React from "react";
import {
  getMealsTime,
  addMealsTime,
  getDish,
  addDish,
} from "../services/service";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  TextInput,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useSelector } from "react-redux";
import { selectSelectedDay } from "../../store/slices/daySlice";

export const Meals = () => {
  const [showPopupAddMeal, setShowPopupAddMeal] = useState(false);
  const [showMenuOnDay, setShowMenuOnDay] = useState(false);
  const [showPopupAddDish, setShowPopupAddDish] = useState(false);
  const [newMeal, setNewMeal] = useState("");
  const [newDish, setNewDish] = useState("");
  const selectedDay = useSelector(selectSelectedDay);
  const selectedDate = selectedDay.date;
  const selectedMonth = selectedDay.month;

  const openPopupAddMeal = () => {
    setShowPopupAddMeal(true);
  };

  const closePopupAddMeal = () => {
    setShowPopupAddMeal(false);
  };

  const openMenuOnDay = () => {
    setShowMenuOnDay(true);
  };

  const closeMenuOnDay = () => {
    setShowMenuOnDay(false);
  };

  const openPopupAddDish = () => {
    setShowPopupAddDish(true);
  };

  const closePopupAddDish = () => {
    setShowPopupAddDish(false);
  };

  const handleNewMealChange = (value) => {
    setNewMeal(value);
  };

  const handleNewDishChange = (value) => {
    setNewDish(value);
  };

  const addNewMeal = () => {
    addMealsTime(newMeal);
    console.log(newMeal);
    setNewMeal("");
  };
  const addNewDish = () => {
    addDish(newDish);
    setNewDish("");
  };

  return (
    <View>
      <View style={styles.meals}>
        <View style={styles.meals__currentData}>
          <Text style={styles.meals__currentDataText}>
            Твої прийоми їжі на {selectedDate}.{selectedMonth}
          </Text>
        </View>
        <View style={styles.mealCardContainer}>
          {getMealsTime().map((meal, index) => (
            <View style={styles.mealCard} key={index}>
              <Image source={meal.photo} style={styles.mealImg} />
              <TouchableOpacity>
                <Text style={styles.meal} onPress={openMenuOnDay}>
                  {meal.time}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.buttonItem}>
          <TouchableOpacity style={styles.meals__add}>
            <Text onPress={openPopupAddMeal} style={styles.meals__addText}>
              Додай прийом їжі
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.meals__add}>
            <Text onPress={openPopupAddDish} style={styles.meals__addText}>
              Додай страву
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showMenuOnDay && (
        <View style={styles.meals__dayMenu}>
          <TouchableOpacity
            style={styles.meals__dayClose}
            onPress={closeMenuOnDay}
          >
            <AntDesign name="close" size={30} color="#1B1A17" />
          </TouchableOpacity>
          <Text style={styles.meals__dayMenuTitlle}>Твої страви</Text>
          {getDish().map((dish, index) => (
            <Text style={styles.meals__dayMenuDish} key={index}>
              {dish}
            </Text>
          ))}
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
              value={newDish}
              placeholder="Пошук страви"
              onChangeText={handleNewDishChange}
            ></TextInput>
          </View>
          <View style={styles.meals__addDishMiddle}>
            <Text style={styles.meals__addDishChoose}>
              Оберіть прийом до якого хочете додати страву
            </Text>
            <View style={styles.meals__addDishSelect}>
              <View style={styles.meals__addDishSelect}>
                <SelectDropdown
                  data={getMealsTime().map((meal) => meal.time)}
                  onSelect={(selectedItem) => {
                    console.log(selectedItem);
                  }}
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
              onPress={closePopupAddDish}
            >
              <Text style={styles.meals__addDishAddText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showPopupAddMeal && (
        <View style={styles.meals__addMeal}>
          <View style={styles.meals__addMealItem}>
            <Text style={styles.meals__addMealTitle}>Назва прийому їжі</Text>
            <TextInput
              style={styles.meals__addMealInput}
              type="text"
              placeholder={"enterName"}
              value={newMeal}
              onChangeText={handleNewMealChange}
            />
          </View>
          <View style={styles.meals__addMealAddButton}>
            <TouchableOpacity
              style={styles.meals__addMealAdd}
              onPress={addNewMeal}
            >
              <Text style={styles.meals__addMealAddText}>Додати</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.meals__addMealAdd}
              onPress={closePopupAddMeal}
            >
              <Text style={styles.meals__addMealAddText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  meals: { backgroundColor: "white", height: "100%", alignItems: "center" },
  meals__currentData: {
    marginTop: 50,
    marginHorizontal: 30,
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
  meals__addMeal: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
  meals__addMealItem: {
    backgroundColor: "#F97B22",
    width: "90%",
    alignItems: "center",
    borderColor: "#001C30",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 50,
    padding: 10,
  },
  meals__addMealTitle: {
    color: "#001C30",
    fontSize: 25,
    fontWeight: "600",
    padding: 10,
  },
  meals__addMealInput: {
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
  meals__addMealAddButton: {
    marginTop: 50,
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: 20,
  },
  meals__addMealAddText: {
    padding: 5,
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  meals__addMealAdd: {
    backgroundColor: "#1B1A17",
    borderRadius: 20,
    margin: 2,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
});
