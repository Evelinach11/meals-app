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
