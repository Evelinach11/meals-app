import React from "react";
import {
  getMealsTime,
  addMealsTime,
  getDish,
  addDish,
} from "../services/service";
import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
        <View style={styles.meals__currentdata}>
          <Text style={styles.meals__currentText}>{selectedDay.day}</Text>
          <Text style={styles.meals__currentText}>{selectedDate}</Text>
        </View>
        {getMealsTime().map((meal, index) => (
          <Text style={styles.meal} key={index} onPress={openMenuOnDay}>
            {meal}
          </Text>
        ))}
        <TouchableOpacity style={styles.meals__add} onPress={openPopupAddMeal}>
          <Text style={styles.meals__addText}>Додай прийом їжі</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.meals__add} onPress={openPopupAddDish}>
          <Text style={styles.meals__addText}>Додай страву</Text>
        </TouchableOpacity>
      </View>
      {showMenuOnDay && (
        <View style={styles.meals__dayMenu}>
          <Text style={styles.meals__dayMenuTitlle}>Твоя страва</Text>
          {getDish().map((dish, index) => (
            <Text style={styles.meals__dayMenuDish} key={index}>
              {dish}
            </Text>
          ))}
          <Button
            style={styles.meals__dayMenuClose}
            title="close"
            onPress={closeMenuOnDay}
          >
            close
          </Button>
        </View>
      )}
      {showPopupAddDish && (
        <View style={styles.meals__addDish}>
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
          <Text style={styles.meals__addDishChoose}>
            Оберіть прийом до якого хочете додати страву
          </Text>
          <Picker style={styles.meals__addDishSelect}>
            {getMealsTime().map((meal, index) => (
              <Picker.Item
                key={index}
                label={meal}
                value={meal}
                style={styles.meals__addDishSelect}
              />
            ))}
          </Picker>
          <Button
            style={styles.meals__addDishAdd}
            title="add"
            onPress={addNewDish}
          >
            add
          </Button>
          <Button
            style={styles.meals__addDishClose}
            title="close"
            onPress={closePopupAddDish}
          >
            close
          </Button>
        </View>
      )}
      {showPopupAddMeal && (
        <View style={styles.meals__addMeal}>
          <Text style={styles.meals__addMealTitle}>nameAddMealTitle</Text>
          <TextInput
            style={styles.meals__addMealInput}
            type="text"
            placeholder={"enterName"}
            value={newMeal}
            onChangeText={handleNewMealChange}
          />
          <Button
            style={styles.meals__addMealAdd}
            title="add"
            onPress={addNewMeal}
          >
            add
          </Button>
          <Button
            style={styles.meals__addMealClose}
            title="close"
            onPress={closePopupAddMeal}
          >
            close
          </Button>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  meals: { backgroundColor: "white", height: "100%" },
  meals__currentdata: {
    margin: 10,
    borderColor: "#007AFF",
    borderRadius: 20,
    borderWidth: 1,
    width: 90,
    padding: 15,
  },
  meals__currentText: {
    color: "#007AFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  meal: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#007AFF",
    margin: 10,
  },
  meals__add: {
    borderColor: "#007AFF",
    borderRadius: 25,
    borderWidth: 1,
    margin: 10,
    width: 150,
    borderRadius: 10,
  },
  meals__addText: {
    color: "#007AFF",
    fontSize: 14,
    padding: 10,
  },
  meals__dayMenu: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
  meals__dayMenuTitle: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
  },
  meals__dayMenuDish: {
    fontSize: 50,
    fontWeight: "bold",
    margin: 20,
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
  meals__addDishTitle: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
  },
  meals__addDishChoose: {
    fontSize: 16,
    marginBottom: 5,
  },
  meals__addDishSearch: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 4,
    color: "#007AFF",
    paddingRight: 30,
    width: "70%",
    marginBottom: 20,
  },
  meals__addDishSelect: {
    width: "70%",
    marginBottom: 50,
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
  meals__addMealTitle: {
    marginTop: 40,
    color: "#007AFF",
    fontSize: 14,
    padding: 10,
  },
  meals__addMealInput: {
    marginBottom: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#007AFF",
    borderRadius: 10,
    width: "50%",
  },
  meals__addMealAdd: {
    borderColor: "#007AFF",
    borderRadius: 30,
    borderWidth: 1,
  },
  meals__addMealClose: {
    borderColor: "#007AFF",
    borderRadius: 25,
    borderWidth: 1,
  },
});
