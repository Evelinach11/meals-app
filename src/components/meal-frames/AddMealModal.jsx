import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

export const AddMealModal = ({
  addPersonalMeal,
  currentTitle,
  setCurrentTitle,
  setShowPopupAddMeal,
}) => {
  return (
    <View style={styles.meals__addMeal}>
      <View style={styles.meals__addMealItem}>
        <View style={styles.meals__addMealItem__top}>
          <Text style={styles.meals__addMealTitle}>Назва прийому їжі</Text>
          <TextInput
            style={styles.meals__addMealInput}
            type="text"
            placeholder={"Введіть назву"}
            value={currentTitle}
            onChangeText={setCurrentTitle}
          />
        </View>
        <View style={styles.meals__addMealAddButton}>
          <TouchableOpacity
            style={styles.meals__addMealAdd}
            onPress={addPersonalMeal}
          >
            <Text style={styles.meals__addMealAddText}>Додати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.meals__addMealAdd}
            onPress={() => setShowPopupAddMeal(false)}
          >
            <Text style={styles.meals__addMealAddText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  meals__addMeal: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FDFAF6",
    alignItems: "center",
  },
  meals__addMealItem: {
    backgroundColor: "#3D8361",
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
    height: "90%",
    flexDirection: "column",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  meals__addMealItem__top: {
    width: "90%",
    alignItems: "center",
  },
  meals__addMealTitle: {
    color: "#FDFAF6",
    fontSize: 25,
    fontWeight: "600",
    margin: 15,
  },
  meals__addMealInput: {
    fontSize: 16,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    color: "#1B1A17",
    width: "100%",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  meals__addMealAddButton: {
    marginTop: 50,
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: 10,
  },
  meals__addMealAddText: {
    padding: 5,
    color: "#3D8361",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  meals__addMealAdd: {
    backgroundColor: "#FDFAF6",
    borderRadius: 12,
    padding: 10,
    margin: 10,
    width: "100%",
    alignItems: "center",
  },
});
