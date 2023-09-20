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
    <View style={styles.container}>
      <Text style={styles.weekdaysTitle}>Додай своє меню на ці дні</Text>
      <Calendar style={styles.weekdaysCalendar} onDayPress={handleDayPress} />
      <View style={styles.weekdaysQuoteCard}>
        <Text style={styles.weekdaysQuote}>{randomQuote}</Text>
        <Image
          style={styles.weekdaysQuoteImg}
          source={require("../../img/lemon.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1C6758",
  },
  weekdaysTitle: {
    color: "#fff",
    fontWeight: "400",
    width: 350,
    margin: 18,
    textAlign: "center",
    fontSize: 30,
  },
  weekdaysCalendar: {
    borderRadius: 12,
    width: 350,
    height: 320,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  weekdaysQuoteImg: {
    width: 320,
    height: 230,
  },
  weekdaysQuoteCard: {
    width: 350,
    backgroundColor: "#fff",
    borderTopEndRadius: 12,
    borderTopLeftRadius: 12,
    height: 400,
    margin: 10,
  },
  weekdaysQuote: {
    fontSize: 23,
    textAlign: "center",
    paddingVertical: 12,
    color: "#000",
    width: "90%",
    alignSelf: "center",
  },
});
