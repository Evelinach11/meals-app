import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Navigation } from "./src/components/Navigation";
import { createTablesIfNotExist } from "./db/dbService";
import { DataProvider } from "./src/DataContext";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

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
