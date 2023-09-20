import { useData } from "../../DataContext";
import SelectDropdown from "react-native-select-dropdown";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const AddDishToMealModal = ({
  meals,
  recipes,
  addDishToMeal,
  setShowPopupAddDish,
}) => {
  const { setSelectedRecipeId, setSelectedMealId } = useData();

  return (
    <View style={styles.addDish}>
      <View>
        <Text style={styles.addDish__title}>Додайте страву</Text>
        <View style={styles.addDish__select}>
          <SelectDropdown
            data={recipes.map((recipe) => {
              return recipe;
            })}
            buttonTextAfterSelection={(selectedRecipe) => {
              setSelectedRecipeId(selectedRecipe.id);
              return selectedRecipe.title;
            }}
            rowTextForSelection={(recipes) => {
              return recipes.title;
            }}
            buttonStyle={styles.addDish__select}
            dropdownStyle={styles.addDish__select__btn}
            defaultButtonText="Оберіть страву"
          />
        </View>
        <Text style={styles.addDish__title}>
          Оберіть прийом до якого хочете додати страву
        </Text>
        <View style={styles.addDish__select}>
          <SelectDropdown
            data={meals.map((meal) => {
              return meal;
            })}
            buttonTextAfterSelection={(selectedMeal) => {
              setSelectedMealId(selectedMeal.id);
              return selectedMeal.title;
            }}
            rowTextForSelection={(meals) => {
              return meals.title;
            }}
            buttonStyle={styles.addDish__select}
            dropdownStyle={styles.addDish__select__btn}
            defaultButtonText="Оберіть прийом їжі"
          />
        </View>
      </View>
      <View style={styles.addDish__buttons}>
        <TouchableOpacity style={styles.addDish__btn}>
          <Text style={styles.addDish__btn__text} onPress={addDishToMeal}>
            Додати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addDish__btn}
          onPress={() => setShowPopupAddDish(false)}
        >
          <Text style={styles.addDish__btn__text}>Закрити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addDish: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#3D8361",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addDish__close: {
    margin: 20,
  },
  addDish__title: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#FDFAF6",
  },
  addDish__select: {
    width: "90%",
    backgroundColor: "#FDFAF6",
    borderRadius: 12,
    alignItems: "center",
  },
  addDish__select__btn: {
    width: "90%",
    backgroundColor: "#E4EFE7",
    borderRadius: 12,
  },
  addDish__buttons: {
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: 20,
  },
  addDish__btn: {
    backgroundColor: "#FDFAF6",
    borderRadius: 12,
    padding: 10,
    margin: 10,
    width: "100%",
    alignItems: "center",
  },
  addDish__btn__text: {
    padding: 5,
    color: "#3D8361",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});
