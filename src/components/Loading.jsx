import React from "react";
import { StyleSheet, Text, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Loading() {
  return (
    <LinearGradient
      colors={["#eeaeca", "#5D9C59", "#eeaeca"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content"></StatusBar>
      <Text style={styles.text}>Завантаження...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#ACBCFF",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
  },
});
