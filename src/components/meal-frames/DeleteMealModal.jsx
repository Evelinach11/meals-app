import { View, Text, Modal, Button } from "react-native";
export const DeleteMealModal = ({ deleteMeal, meal, setModalDeleteMeal }) => {
  return (
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
              onPress={() => setModalDeleteMeal(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
