import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { React, useState } from "react";
import { useData } from "../DataContext";
import { goals } from "../data/user-data";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { addPersonalUser } from "../../db/personalUserDBService";

export const AddUser = () => {
  const { users, setUsers } = useData();
  const [currentAge, setCurrentAge] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentHeight, setCurrentHeight] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const addUser = () => {
    addPersonalUser(
      currentName,
      currentPhoto,
      currentAge,
      currentWeight,
      currentHeight,
      selectedGoal
    ).then((user) => {
      const existingUsers = [...users];
      existingUsers.push(user);
      setUsers((existingUsers) => [...existingUsers, user]);
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCurrentPhoto(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.addUser}>
        <Text style={styles.addUser__title}>Заповніть поля своїми даними</Text>
        <View style={styles.addPhotoBtn}>
          <Button title="Виберіть зображення" onPress={pickImage} />
          {currentPhoto && (
            <Image
              source={{ uri: currentPhoto }}
              style={styles.addUser__photo}
            />
          )}
        </View>
        <TextInput
          style={styles.addUser__input}
          value={currentName}
          placeholder="Ім`я"
          onChangeText={setCurrentName}
        />
        <TextInput
          style={styles.addUser__input}
          value={currentAge}
          placeholder="Вік"
          onChangeText={setCurrentAge}
        />
        <TextInput
          style={styles.addUser__input}
          value={currentWeight}
          placeholder="Вага"
          onChangeText={setCurrentWeight}
        />
        <TextInput
          style={styles.addUser__input}
          value={currentHeight}
          placeholder="Зріст"
          onChangeText={setCurrentHeight}
        />
        <SelectDropdown
          data={goals}
          onSelect={(selectedItem) => setSelectedGoal(selectedItem)}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
          defaultButtonText="Виберіть вашу мету"
          renderDropdownIcon={() => (
            <FontAwesome name="caret-down" size={18} color="#333" />
          )}
          buttonStyle={styles.addUser__goal__btn}
          dropdownStyle={styles.addUser__goal__dropDown}
        />

        <Button title="Додати" onPress={addUser} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  addUser: {
    margin: 20,
  },
  addUser__input: {
    alignSelf: "center",
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#001C30",
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    color: "#1B1A17",
    width: "100%",
    margin: 15,
  },
  addUser__title: {
    fontSize: 25,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "600",
    width: "100%",
    marginTop: 10,
  },
  addUser__photo: {
    width: "100%",
    height: 175,
    marginBottom: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  addUser__goal__btn: {
    width: "100%",
  },
  addUser__goal__dropDown: {
    borderRadius: 20,
    width: "90%",
  },
});
