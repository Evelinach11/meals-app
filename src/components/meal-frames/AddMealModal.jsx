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
    backgroundColor: "#FAF1E6",
    width: "90%",
    alignItems: "center",
    borderColor: "#064420",
    borderWidth: 1,
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
    margin: 10,
  },
  meals__addMealAddText: {
    padding: 5,
    color: "#FDFAF6",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  meals__addMealAdd: {
    backgroundColor: "#1C6758",
    borderRadius: 20,
    margin: 2,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
});
