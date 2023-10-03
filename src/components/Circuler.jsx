import React from "react";
import { View, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { convertMinToMilisec } from "../../utilis/time-util";

export const Circuler = () => {
  const time = 1;

  return (
    <View style={styles.container}>
      <CircularProgress
        radius={90}
        value={100}
        valueSuffix="%"
        inActiveStrokeColor={"#6499E9"}
        inActiveStrokeOpacity={6}
        inActiveStrokeWidth={0.2}
        duration={convertMinToMilisec(time)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
