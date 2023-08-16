import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Navigation } from "./src/components/Navigation";
import { createTablesIfNotExist } from "./db/dbService";

export default function App() {
  useEffect(() => {
    createTablesIfNotExist();
  }, []);

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
