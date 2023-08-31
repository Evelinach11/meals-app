import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { useState } from "react";
import {
  updateUser,
  deletePhotoFromProfileById,
} from "../../db/personalUserDBService";
import { useData } from "../DataContext";
import { goals } from "../data/user-data";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const UserAccount = () => {
  const { users, setUsers } = useData();
  const [currentAge, setCurrentAge] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [editedUserId, setEditedUserId] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentHeight, setCurrentHeight] = useState("");
  const [modalDeletePhoto, setModalDeletePhoto] = useState(null);

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

  const updatePersonalUser = (id) => {
    updateUser({
      currentName: currentName,
      currentPhoto: currentPhoto,
      currentAge: currentAge,
      currentWeight: currentWeight,
      currentHeight: currentHeight,
      currentGoal: selectedGoal,
      id: id,
    })
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id
              ? {
                  ...user,
                  name: updatedUser.name,
                  photo: updatedUser.photo,
                  age: updatedUser.age,
                  height: updatedUser.height,
                  weight: updatedUser.weight,
                  goal: updatedUser.goal,
                }
              : user
          )
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setIsEditMode(false));
  };

  const deleteUserPhoto = (id) => {
    deletePhotoFromProfileById(id).then((rowsAffected) => {
      if (rowsAffected > 0) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, photo: null } : user
          )
        );
        setCurrentPhoto(null);
      }
    });
  };

  const enterEditMode = (id, user) => {
    setIsEditMode(true);
    setEditedUserId(id);
    setCurrentName(user.name);
    setCurrentAge(user.age);
    setCurrentPhoto(user.photo);
    setCurrentHeight(user.height);
    setCurrentWeight(user.weight);
    setSelectedGoal(user.goal);
  };

  const exitEditMode = () => {
    setIsEditMode(false);
  };

  const showDeleteModal = (userId) => {
    setModalDeletePhoto(userId);
  };

  return (
    <View>
      {users.map((user, index) => (
        <View key={index} style={styles.user}>
          {isEditMode && editedUserId === user.id ? (
            <View style={styles.user__update}>
              <View style={styles.user__update__addPhotoBtn}>
                {user.photo ? (
                  <>
                    <Image
                      source={{ uri: user.photo }}
                      style={styles.user__account__photo}
                    />

                    <View style={styles.user__account__editIcon}>
                      <MaterialCommunityIcons
                        name="account-edit"
                        size={30}
                        color="black"
                        onPress={() => showDeleteModal(user.id)}
                      />
                    </View>
                  </>
                ) : (
                  <Button title="Оберіть зображення" onPress={pickImage} />
                )}
              </View>
              {modalDeletePhoto === user.id && (
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
                        Ви дійсно хочете видалити фото?
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                          title="Так"
                          onPress={() => deleteUserPhoto(user.id)}
                        />
                        <Button
                          title="Ні"
                          onPress={() => setModalDeletePhoto(false)}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              )}
              <Text style={styles.user__update__titleAdd}>
                Заповніть поля своїми даними
              </Text>
              <View>
                <ScrollView>
                  <TextInput
                    style={styles.user__update__input}
                    value={currentName}
                    placeholder="Ім`я"
                    onChangeText={setCurrentName}
                    placeholderTextColor="black"
                  />
                  <TextInput
                    style={styles.user__update__input}
                    value={currentAge}
                    placeholder="Вік"
                    onChangeText={setCurrentAge}
                    placeholderTextColor="black"
                  />
                  <TextInput
                    style={styles.user__update__input}
                    value={currentWeight}
                    placeholder="Вага"
                    onChangeText={setCurrentWeight}
                    placeholderTextColor="black"
                  />
                  <TextInput
                    style={styles.user__update__input}
                    value={currentHeight}
                    placeholder="Зріст"
                    onChangeText={setCurrentHeight}
                    placeholderTextColor="black"
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
                    buttonStyle={styles.user__update__goal__btn}
                    dropdownStyle={styles.user__update__goal__dropDown}
                  />
                  <Text
                    style={styles.user__update__save}
                    onPress={() => updatePersonalUser(user.id)}
                  >
                    Зберегти
                  </Text>
                  <MaterialCommunityIcons
                    name="keyboard-backspace"
                    size={29}
                    color="black"
                    onPress={exitEditMode}
                    style={styles.user__update__close}
                  />
                </ScrollView>
              </View>
            </View>
          ) : (
            <View style={styles.user__account}>
              <View>
                <View style={styles.user__account__editBtn__card}>
                  <AntDesign
                    onPress={() => enterEditMode(user.id, users)}
                    style={styles.user__account__editBtn}
                    name="edit"
                    size={30}
                    color="black"
                  />
                </View>
                <View>
                  <Image
                    source={{ uri: user.photo }}
                    style={styles.user__account__photo}
                  />
                  <Text style={styles.user__account__name}>{user.name}</Text>
                </View>
              </View>

              <View style={styles.user__account__dataItem}>
                <Text style={styles.user__account__dataText}>Ціль</Text>
                <Text style={styles.user__account__goal}>{user.goal}</Text>
              </View>
              <View style={styles.user__account__dataItem}>
                <Text style={styles.user__account__dataText}>Вік</Text>
                <Text style={styles.user__account__data}>{user.age}</Text>
              </View>
              <View style={styles.user__account__dataItem}>
                <Text style={styles.user__account__dataText}>Вага</Text>
                <Text style={styles.user__account__data}>{user.weight}</Text>
              </View>
              <View style={styles.user__account__dataItem}>
                <Text style={styles.user__account__dataText}>Зріст</Text>
                <Text style={styles.user__account__data}>{user.height}</Text>
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    alignItems: "center",
    backgroundColor: "#FAF1E6",
  },
  user__account: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  user__account__photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
  },
  user__account__editIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 100,
    alignSelf: "center",
    position: "absolute",
    top: 170,
    left: 85,
  },
  user__account__name: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    margin: 6,
  },
  user__account__dataItem: {
    flexDirection: "row",
    width: 300,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 12,
    backgroundColor: "#FDFAF6",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  user__account__data: {
    fontSize: 20,
    fontWeight: "800",
  },
  user__account__dataText: {
    fontSize: 20,
    fontWeight: "400",
  },
  user__account__goal: {
    fontSize: 20,
    fontWeight: "700",
    width: "70%",
    textAlign: "right",
  },
  user__update: {
    marginTop: 20,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  user__update__input: {
    alignSelf: "center",
    fontSize: 16,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#FDFAF6",
    width: "90%",
    margin: 10,
  },
  user__update__titleAdd: {
    fontSize: 29,
    fontWeight: "400",
    textAlign: "center",
  },
  user__account__editBtn__card: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 300,
    marginBottom: 5,
    padding: 20,
  },
  user__account__editBtn: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  user__update__goal__btn: {
    margin: 10,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#FDFAF6",
  },
  user__update__goal__dropDown: {
    borderRadius: 20,
    width: "90%",
  },
  user__update__save: {
    margin: 20,
    textAlign: "center",
    fontSize: 29,
    fontWeight: "500",
  },
  user__update__close: {
    textAlign: "center",
  },
});
