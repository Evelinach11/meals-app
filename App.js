import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Navigation } from "./src/components/Navigation";
import { createTablesIfNotExist } from "./db/dbService";
import { DataProvider } from "./src/DataContext";

export default function App() {
  useEffect(() => {
    createTablesIfNotExist();
  }, []);

  return (
    <DataProvider>
      <Navigation />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
