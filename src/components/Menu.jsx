import React from "react";
import { getRandomQuote } from "../quotes";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import {
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
} from "../data/local-config-data";

export const Menu = () => {
  const navigation = useNavigation();
  const randomQuote = getRandomQuote();

  const handleDayPress = (day) => {
    navigation.navigate("Meals", { selectedDate: day.dateString });
  };

  LocaleConfig.locales["ua"] = {
    monthNames: monthNames,
    monthNamesShort: monthNamesShort,
    dayNames: dayNames,
    dayNamesShort: dayNamesShort,
    today: "Сьогодні",
  };

  LocaleConfig.defaultLocale = "ua";

  return (
    <View style={styles.weekdays}>
      <View style={styles.weekdays__item__title}>
        <Text style={styles.weekdays__title}>Додай своє меню на ці дні</Text>
      </View>
      <Calendar style={styles.weekdays__calendar} onDayPress={handleDayPress} />
      <View style={styles.weekdays__item}>
        <View style={styles.weekdays__quoteCard}>
          <Text style={styles.weekdays__quote}>{randomQuote}</Text>
          <Image
            style={styles.weekdays__quoteImg}
            source={require("../../img/lemon.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekdays: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  weekdays__item__title: {
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  weekdays__title: {
    color: "#1B1A17",
    fontWeight: "300",
    width: 350,
    paddingTop: 10,
    marginTop: 20,
    textAlign: "center",
    fontSize: 30,
    backgroundColor: "#A2CDB0",
  },
  weekdays__calendar: {
    width: 350,
    backgroundColor: "#A2CDB0",
  },
  weekdays__item: {
    flex: 1,
    flexDirection: "column",
    width: "90%",
    marginHorizontal: 20,
  },
  weekdays__quoteImg: {
    width: 320,
    height: 230,
  },
  weekdays__quoteCard: {
    backgroundColor: "#A2CDB0",
    color: "white",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  weekdays__quote: {
    fontSize: 23,
    textAlign: "center",
    paddingVertical: 20,
    color: "white",
  },
});
