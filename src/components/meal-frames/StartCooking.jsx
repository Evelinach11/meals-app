import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { fetchStepsByRecipeId } from "../../../db/recipeStepsDBService";

export const StartCooking = ({ route }) => {
  const { recipeId } = route.params;
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    fetchStepsByRecipeId(recipeId)
      .then((result) => {
        setSteps(result);
      })
      .catch((error) => {
        console.error("Error fetching steps:", error);
      });
  }, [recipeId]);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.stepOrderliness}>
          Крок {steps[currentStepIndex]?.orderliness}
        </Text>
        <Text style={styles.stepTitle}>{steps[currentStepIndex]?.title}</Text>
        <Text style={styles.stepDescription}>
          {steps[currentStepIndex]?.description}
        </Text>
        <Text style={styles.stepTime}>{steps[currentStepIndex]?.time}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Повернутись"
          onPress={goToPreviousStep}
          disabled={currentStepIndex === 0}
        />
        {isLastStep ? (
          <Button
            title="Завершити"
            onPress={() => console.log("Finish button pressed")}
          />
        ) : (
          <Button
            title="Продовжити"
            onPress={goToNextStep}
            disabled={currentStepIndex === steps.length - 1}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  titleContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  stepOrderliness: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  stepTime: {
    fontSize: 14,
    color: "#777",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
