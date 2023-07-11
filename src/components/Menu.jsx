import React, { useState, useEffect } from "react";
import { getRandomQuote } from "../quotes";
import { addSelectedDay } from "../../store/slices/daySlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import moment from "moment";

export const Menu = () => {
  const navigation = useNavigation();
  const initialStartDate = moment().startOf("isoWeek");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [dates, setDates] = useState([]);
  const dispatch = useDispatch();

  const randomQuote = getRandomQuote();
  const dayOfWeek = ["Пон", "Вів", "Сер", "Чет", "П'ят", "Суб", "Нед"];
  const dateFormat = "DD";

  const updateDates = () => {
    const updatedDates = [];
    for (let i = 0; i < dayOfWeek.length; i++) {
      const newDate = startDate.clone().add(i, "day");
      updatedDates.push(newDate);
    }
    setDates(updatedDates);
  };

  useEffect(() => {
    updateDates();
  }, [startDate]);

  const isCurrentDay = (index) => {
    const currentDate = moment();
    const selectedDate = dates[index];
    return currentDate.isSame(selectedDate, "day");
  };

  const handleNextWeek = () => {
    const nextWeekStartDate = startDate.clone().add(1, "week");
    setStartDate(nextWeekStartDate);
  };

  const handlePrevWeek = () => {
    const prevWeekStartDate = startDate.clone().subtract(1, "week");
    setStartDate(prevWeekStartDate);
  };

  const redirectToOtherComponent = (index) => {
    const selectedDay = dayOfWeek[index];
    const selectedDate = dates[index]?.format(dateFormat);
    dispatch(addSelectedDay({ day: selectedDay, date: selectedDate }));
    navigation.navigate("Meals");
  };

  return (
    <View style={styles.weekdays}>
      <Text style={styles.weekdays__title}>Додай своє меню на ці дні</Text>
      <ScrollView horizontal={true}>
        <View style={styles.weekdays__item}>
          {dayOfWeek.map((day, index) => (
            <TouchableOpacity
              onPress={() => redirectToOtherComponent(index)}
              style={[
                styles.weekdays__cart,
                isCurrentDay(index) ? styles.current__day : null,
              ]}
              key={day}
            >
              <Text style={styles.weekdays__num}>
                {dates[index]?.format(dateFormat)}
              </Text>
              <Text style={styles.weekdays__text}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.weekdays__news}>
        <Text style={styles.weekdays__news}>{randomQuote}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handlePrevWeek}>
          <Text style={styles.buttonText}>Попередній тиждень</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextWeek}>
          <Text style={styles.buttonText}>Наступний тиждень</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekdays: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F7F1E5",
    alignItems: "left",
  },
  weekdays__title: {
    color: "#85A389",
    fontWeight: "bold",
    width: 250,
    margin: 20,
    fontSize: 40,
  },
  weekdays__item: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 20,
    height: "80%",
  },
  weekdays__cart: {
    justifyContent: "center",
  },
  weekdays__text: {
    color: "#F1C27B",
    fontWeight: "bold",
    justifyContent: "center",
    fontSize: 25,
    margin: 5,
  },
  weekdays__num: {
    color: "#E86A33",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    margin: 5,
  },
  current__day: {
    borderColor: "#E86A33",
    borderRadius: 25,
    borderWidth: 1,
  },
  weekdays__news: {
    flex: 5,
    backgroundColor: "#A4D0A4",
    fontWeight: "bold",
    color: "#263A29",
    fontSize: 35,
    borderRadius: 20,
    margin: 20,
  },
  button: {
    backgroundColor: "#E86A33",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "50%",
    alignItems: "center",
    marginLeft: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
