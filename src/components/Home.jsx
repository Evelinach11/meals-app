import { useData } from "../DataContext";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { React, useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getPersonalUserById } from "../../db/personalUserDBService";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();
  const { users, setUsers } = useData();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (users.length === 0) {
      const timeout = setTimeout(() => {
        navigation.navigate("AddUser");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [users]);

  useEffect(() => {
    getPersonalUserById().then((result) => {
      setUsers(result);
    });
  }, []);

  return (
    <View style={styles.container__home}>
      <View style={styles.home__top}>
        <View>
          <Image
            style={styles.home__top__img}
            source={require("../../img/background.jpg")}
          />
        </View>
        <TouchableOpacity
          style={styles.home__top__icon__container}
          onPress={toggleMenu}
        >
          <FontAwesome
            style={styles.home__top__icon}
            name="navicon"
            size={35}
            color="#FAF1E6"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.home__bottom}>
        <Text style={styles.home__bottom__title}>Welcome to Mealsy</Text>
      </View>

      {showMenu && (
        <View style={styles.home__menu}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons
              style={styles.home__menu__icon}
              name="chevron-back"
              size={30}
              color="#FAF1E6"
            />
          </TouchableOpacity>
          <View>
            {users.map((user, index) => (
              <View key={index} style={styles.user}>
                <Image
                  source={{ uri: user.photo }}
                  style={styles.home__menu__user__photo}
                />
                <Text
                  style={styles.home__menu__user__name}
                  onPress={() => {
                    navigation.navigate("UserAccount");
                  }}
                >
                  {user.name}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.home__menu__bottom__border}></View>
          <TouchableOpacity>
            <View style={styles.home__menu__item}>
              <MaterialIcons
                style={styles.home__menu__item__icon}
                name="restaurant-menu"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("Category");
                }}
                style={styles.home__menu__item__text}
              >
                Рецепти
              </Text>
            </View>
            <View style={styles.home__menu__item}>
              <MaterialIcons
                style={styles.home__menu__item__icon}
                name="food-bank"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("Menu");
                }}
                style={styles.home__menu__item__text}
              >
                Меню
              </Text>
            </View>

            <View style={styles.home__menu__item}>
              <Ionicons
                style={styles.home__menu__item__icon}
                name="fast-food"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("PersonalRecipes");
                }}
                style={styles.home__menu__item__text}
              >
                Твої рецепти
              </Text>
            </View>

            <View style={styles.home__menu__item}>
              <Entypo
                style={styles.home__menu__item__icon}
                name="shopping-basket"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("ShoppingCart");
                }}
                style={styles.home__menu__item__text}
              >
                Корзина покупок
              </Text>
            </View>

            <View style={styles.home__menu__item}>
              <MaterialIcons
                style={styles.home__menu__item__icon}
                name="favorite"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("FavoriteRecipe");
                }}
                style={styles.home__menu__item__text}
              >
                Улюблені рецепти
              </Text>
            </View>
            <View style={styles.home__menu__bottom__border}></View>
            <View style={styles.home__menu__item}>
              <Ionicons
                name="settings"
                size={30}
                style={styles.home__menu__item__icon}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("");
                }}
                style={styles.home__menu__item__text}
              >
                Налаштування
              </Text>
            </View>
            <View style={styles.home__menu__item}>
              <MaterialCommunityIcons
                name="food-variant"
                style={styles.home__menu__item__icon}
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("");
                }}
                style={styles.home__menu__item__text}
              >
                Калорії
              </Text>
            </View>
            <View style={styles.home__menu__item}>
              <MaterialCommunityIcons
                name="newspaper"
                style={styles.home__menu__item__icon}
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("");
                }}
                style={styles.home__menu__item__text}
              >
                Новини
              </Text>
            </View>
            <View style={styles.home__menu__bottom__border}></View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container__home: {
    flex: 1,
    flexDirection: "column",
  },
  home__top__icon: {
    margin: 20,
  },
  home__top__img: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    opacity: 0.5,
    resizeMode: "cover",
  },
  home__top__icon__container: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  home__bottom__title: {
    color: "#1C6758",
    fontSize: 60,
    margin: 20,
    fontWeight: "bold",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  home__top: {
    flex: 3,
    backgroundColor: "#1C6758",
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  home__bottom: {
    flex: 1,
    alignItems: "center",
  },
  home__menu__item: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 6,
  },
  home__menu__bottom__border: {
    backgroundColor: "#FAF1E6",
    width: "80%",
    height: 1,
    opacity: 0.2,
    marginStart: 30,
  },
  home__menu__item__text: {
    fontWeight: "400",
    fontSize: 20,
    color: "#F2E3DB",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  home__menu__item__icon: {
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  home__menu__icon: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  home__menu: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1C6758",
  },
  user: { alignItems: "center" },
  home__menu__user__photo: {
    width: "25%",
    height: 100,
    borderRadius: 150,
  },
  home__menu__user__name: {
    color: "#F2E3DB",
    fontSize: 30,
    marginBottom: 18,
    fontWeight: "500",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
});
