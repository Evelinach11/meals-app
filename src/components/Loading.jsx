import React from "react";
import { StyleSheet, Text, StatusBar, View } from "react-native";

export default function Loading() {
  return (
    <View colors={["#146C94", "#19A7CE", "#AFD3E2"]} style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Text style={styles.text}>Завантаження...</Text>
    </View>
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
