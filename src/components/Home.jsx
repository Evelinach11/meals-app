import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome
            style={styles.topIcon}
            name="navicon"
            size={30}
            color="#1B1A17"
          />
        </TouchableOpacity>
        <View>
          <Image
            style={styles.topImg}
            source={require("../../img/avocado.png")}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomTitle}>Welcome to Mealsy</Text>
        <Text style={styles.bottomLogin}>
          Login to personalize your experience
        </Text>
        <Text style={styles.bottomAuth}>with IOS</Text>
        <Text style={styles.bottomAuth}>facebook</Text>
        <Text style={styles.bottomAuth}>google</Text>
      </View>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={toggleMenu}>
            <AntDesign
              style={styles.icon}
              name="close"
              size={30}
              color="#1B1A17"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.listItem}>
              <Image
                style={styles.listImg}
                source={require("../../img/pizza.png")}
              />
              <Text
                onPress={() => {
                  navigation.navigate("Recipes");
                }}
                style={styles.list}
              >
                Рецепти
              </Text>
            </View>
            <View style={styles.listItem}>
              <Image
                style={styles.listImg}
                source={require("../../img/ice-cream.png")}
              />
              <Text
                onPress={() => {
                  navigation.navigate("Menu");
                }}
                style={styles.list}
              >
                Меню
              </Text>
            </View>
            <View style={styles.listItem}>
              <Image
                style={styles.listImg}
                source={require("../../img/apple.png")}
              />
              <Text
                onPress={() => {
                  navigation.navigate("YourRecipes");
                }}
                style={styles.list}
              >
                Твої рецепти
              </Text>
            </View>
            <View style={styles.listItem}>
              <Image
                style={styles.listImg}
                source={require("../../img/money.png")}
              />
              <Text style={styles.list}>Корзина покупок</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topIcon: {
    margin: 20,
  },
  topImg: {
    width: 300,
    height: 300,
    margin: 30,
  },
  bottomTitle: {
    color: "#1B1A17",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  top: {
    flex: 1,
    backgroundColor: "#F97B22",
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    paddingBottom: 50,
  },
  bottom: {
    flex: 1,
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#5D9C59",
    backgroundColor: "#B5C99A",
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
  },
  list: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#1B1A17",
    padding: 30,
  },
  listImg: {
    width: 80,
    height: 80,
  },
  bottomLogin: {
    fontSize: 17,
    color: "grey",
  },
  bottomAuth: {
    margin: 10,
    fontSize: 30,
    borderColor: "#1B1A17",
    borderWidth: 1,
    borderRadius: 20,
    width: "50%",
    textAlign: "center",
    fontWeight: "500",
    padding: 2,
  },
  menu: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
});
