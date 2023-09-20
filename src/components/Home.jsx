import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Animated, {
  Easing,
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useData } from "../DataContext";
import { AntDesign } from "@expo/vector-icons";
import { React, useState, useEffect } from "react";
import { State } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getPersonalUserById } from "../../db/personalUserDBService";

export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();
  const { users, setUsers } = useData();
  const { height } = useWindowDimensions();

  const y = useSharedValue(height);

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

  const unlockGestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      y.value = event.absoluteY;
    },
    onEnd: (event) => {
      if (event.velocityY < -500) {
        runOnJS(toggleMenu)();
        y.value = withTiming(0, { easing: Easing.linear });
      } else if (event.velocityY > 500) {
        y.value = withTiming(height, { easing: Easing.linear });
      } else if (y.value < height / 2 || event.velocityY < -500) {
        runOnJS(toggleMenu)();
        y.value = withTiming(0, { easing: Easing.linear });
      } else {
        y.value = withTiming(height, { easing: Easing.linear });
      }
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.homeBanner}>
        <View>
          <Image
            style={styles.homeImg}
            source={require("../../img/background.jpg")}
          />
        </View>
      </View>
      <View style={styles.homeTitle}>
        <Text style={styles.homeTitleText}>Welcome to Mealsy</Text>
        <AntDesign name="totop" size={34} color="#1C6758" />
        <PanGestureHandler
          onGestureEvent={unlockGestureHandler}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state === State.END) {
              console.log("end");
            }
          }}
        >
          <Animated.View
            style={styles.panGestureContainerUnlock}
          ></Animated.View>
        </PanGestureHandler>
      </View>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons
              style={styles.menuIcon}
              name="chevron-back"
              size={30}
              color="#FAF1E6"
            />
          </TouchableOpacity>
          <View>
            {users.map((user, index) => (
              <View key={index} style={styles.user}>
                <Image source={{ uri: user.photo }} style={styles.userPhoto} />
                <Text
                  style={styles.userName}
                  onPress={() => {
                    navigation.navigate("UserAccount");
                  }}
                >
                  {user.name}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.menuBorderBottom}></View>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <MaterialIcons
                style={styles.menuItemIcon}
                name="restaurant-menu"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("Category");
                }}
                style={styles.menuItemText}
              >
                Рецепти
              </Text>
            </View>
            <View style={styles.menuItem}>
              <MaterialIcons
                style={styles.menuItemIcon}
                name="food-bank"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("Menu");
                }}
                style={styles.menuItemText}
              >
                Меню
              </Text>
            </View>

            <View style={styles.menuItem}>
              <Ionicons
                style={styles.menuItemIcon}
                name="fast-food"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("PersonalRecipes");
                }}
                style={styles.menuItemText}
              >
                Твої рецепти
              </Text>
            </View>

            <View style={styles.menuItem}>
              <Entypo
                style={styles.menuItemIcon}
                name="shopping-basket"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("ShoppingCart");
                }}
                style={styles.menuItemText}
              >
                Корзина покупок
              </Text>
            </View>

            <View style={styles.menuItem}>
              <MaterialIcons
                style={styles.menuItemIcon}
                name="favorite"
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("FavoriteRecipe");
                }}
                style={styles.menuItemText}
              >
                Улюблені рецепти
              </Text>
            </View>
            <View style={styles.menuBorderBottom}></View>
            <View style={styles.menuItem}>
              <Ionicons
                name="settings"
                size={30}
                style={styles.menuItemIcon}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("");
                }}
                style={styles.menuItemText}
              >
                Налаштування
              </Text>
            </View>
            <View style={styles.menuItem}>
              <MaterialCommunityIcons
                name="food-variant"
                style={styles.menuItemIcon}
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("");
                }}
                style={styles.menuItemText}
              >
                Калорії
              </Text>
            </View>
            <View style={styles.menuItem}>
              <MaterialCommunityIcons
                name="newspaper"
                style={styles.menuItemIcon}
                size={30}
                color="#FAF1E6"
              />
              <Text
                onPress={() => {
                  navigation.navigate("");
                }}
                style={styles.menuItemText}
              >
                Новини
              </Text>
            </View>
            <View style={styles.menuBorderBottom}></View>
          </TouchableOpacity>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  panGestureContainerUnlock: {
    position: "absolute",
    width: "100%",
    height: 600,
    bottom: 0,
    left: 0,
    transform: [
      {
        translateY: 100,
      },
    ],
  },
  homeImg: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    opacity: 0.5,
    resizeMode: "cover",
  },
  homeTitleText: {
    color: "#1C6758",
    marginBottom: 10,
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  homeBanner: {
    flex: 3,
    backgroundColor: "#1C6758",
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  homeTitle: {
    flex: 1,
    alignItems: "center",
  },
  menu: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1C6758",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 6,
  },
  menuBorderBottom: {
    backgroundColor: "#FAF1E6",
    width: "80%",
    height: 1,
    opacity: 0.2,
    marginStart: 30,
  },
  menuItemText: {
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
  menuItemIcon: {
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
  menuIcon: {
    marginHorizontal: 20,
    marginTop: 10,
  },

  user: { alignItems: "center" },
  userPhoto: {
    width: "25%",
    height: 100,
    borderRadius: 150,
  },
  userName: {
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
