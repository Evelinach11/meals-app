import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <FontAwesome
          style={styles.icon}
          name="navicon"
          size={30}
          color="#007AFF"
        />
      </TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.text}>Enjoy your meals</Text>
      </View>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={toggleMenu}>
            <AntDesign
              style={styles.icon}
              name="close"
              size={30}
              color="#007AFF"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.list}>Рецепти</Text>
            <Text
              style={styles.list}
              onPress={() => {
                navigation.navigate("Menu");
              }}
            >
              Меню
            </Text>
            <Text style={styles.list}>Твої рецепти</Text>
            <Text style={styles.list}>Корзина покупок</Text>
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
  icon: {
    margin: 20,
  },
  text: {
    color: "#007AFF",
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    flex: 1,
  },
  list: {
    color: "#007AFF",
    fontSize: 40,
    margin: 20,
    fontWeight: "bold",
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
