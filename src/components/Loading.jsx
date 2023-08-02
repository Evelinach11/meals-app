import React from "react";
import { StyleSheet, Text, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Loading() {
  return (
    <LinearGradient
      colors={["#FFF6F4", "#FFA41B", "#F86F03"]}
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
