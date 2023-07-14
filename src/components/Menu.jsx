import moment from "moment";
import "moment/locale/uk";
import React, { useState, useEffect } from "react";
import { getRandomQuote } from "../quotes";
import { addSelectedDay } from "../../store/slices/daySlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export const Menu = () => {
  const navigation = useNavigation();
  const initialStartDate = moment().startOf("isoWeek");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [currentMonth, setCurrentMonth] = useState(
    moment().locale("uk").format("MMMM")
  );
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
    setCurrentMonth(startDate.format("MMMM").toUpperCase());
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
    const selectedMonth = startDate.format("MM").toUpperCase();
    dispatch(
      addSelectedDay({
        day: selectedDay,
        date: selectedDate,
        month: selectedMonth,
      })
    );

    navigation.navigate("Meals");
  };

  return (
    <View style={styles.weekdays}>
      <Text style={styles.weekdays__title}>Додай своє меню на ці дні</Text>
      <View style={styles.weekdays__item}>
        <Text style={styles.weekdays__month}>{currentMonth}</Text>
        <View style={styles.weekdays__days}>
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
              <Text style={styles.weekdays__day}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.weekdays__quoteCard}>
          <Text style={styles.weekdays__quote}>{randomQuote}</Text>
          <Image
            style={styles.weekdays__quoteImg}
            source={require("../../img/lemon.png")}
          />
        </View>
      </View>

      <View style={styles.buttonItem}>
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
    alignItems: "center",
  },
  weekdays__title: {
    color: "#1B1A17",
    fontWeight: "500",
    width: "90%",
    marginTop: 10,
    textAlign: "right",
    fontSize: 35,
  },
  weekdays__month: {
    color: "#1B1A17",
    fontWeight: "bold",
    width: "90%",
    marginHorizontal: 10,
    fontSize: 20,
    marginVertical: 5,
  },
  weekdays__item: {
    flex: 1,
    flexDirection: "column",
    width: "90%",
    marginHorizontal: 20,
  },
  weekdays__days: {
    borderColor: "#001C30",
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#FAAB78",
    borderRadius: 20,
    marginBottom: 10,
  },
  weekdays__cart: {
    justifyContent: "center",
  },
  weekdays__day: {
    color: "#1B1A17",
    fontWeight: "bold",
    justifyContent: "center",
    fontSize: 25,
    margin: 5,
    paddingBottom: 15,
  },
  weekdays__num: {
    color: "#1B1A17",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    paddingTop: 15,
    margin: 5,
  },
  weekdays__quoteImg: {
    flex: 3,
    width: 320,
    height: 300,
  },
  current__day: {
    borderColor: "#001C30",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
  },
  weekdays__quoteCard: {
    borderColor: "#001C30",
    borderWidth: 1,
    borderRadius: 20,
    flex: 1,
    backgroundColor: "#90A17D",
    color: "white",
    borderRadius: 20,
  },
  weekdays__quote: {
    flex: 1,
    fontSize: 23,
    padding: 10,
    paddingVertical: 20,
    color: "white",
    fontWeight: "bold",
  },
  buttonItem: {
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: 20,
  },
  button: {
    backgroundColor: "#1B1A17",
    borderRadius: 60,
    padding: 10,
    margin: 2,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    padding: 5,
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});
