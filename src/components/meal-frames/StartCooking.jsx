import {
  hasProcessState,
  stepState,
  findIndexOfProcessState,
  isAllStateComplete,
} from "../../../utilis/steps-util";
import {
  fetchStepsByRecipeId,
  resetStatesByRecipeId,
  updateStepsByRecipeId,
} from "../../../db/recipeStepsDBService";
import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export const StartCooking = ({ route }) => {
  const { recipeId } = route.params;
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    fetchStepsByRecipeId(recipeId)
      .then((result) => {
        setSteps(result);
        const processIndex = findIndexOfProcessState(result);
        if (processIndex > -1) {
          setCurrentStepIndex(processIndex);
        } else {
          setCurrentStepIndex(0);
        }
        hasProcessState(steps);
      })
      .catch((error) => {
        console.error("Error fetching steps:", error);
      });
  }, [recipeId]);

  const completeAllSteps = isAllStateComplete(steps);

  const currentStep = steps[currentStepIndex];

  const nextStep = () => {
    updateStepsByRecipeId(stepState.complete, recipeId, currentStep.id).then(
      () => {
        if (currentStepIndex < steps.length - 1) {
          steps[currentStepIndex].state = stepState.complete;
          updateStepsByRecipeId(
            stepState.process,
            recipeId,
            steps[currentStepIndex + 1].id
          ).then(() => {
            if (currentStepIndex <= steps.length - 1) {
              steps[currentStepIndex + 1].state = stepState.process;
            }
          });
          setSteps(steps);
        }
        setCurrentStepIndex((prevIndex) => prevIndex + 1);
      }
    );
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prevIndex) => prevIndex - 1);
    }
  };

  const resetState = () => {
    resetStatesByRecipeId(recipeId).then(() => {
      for (let i = 0; i < steps.length; i++) {
        steps[i].state = stepState.wait;
      }
    });
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <View style={styles.container}>
      {completeAllSteps ? (
        <View>
          <Text>Всі кроки успішно виконано! Bon apeti</Text>
          <Text onPress={resetState}>Почати з початку</Text>
        </View>
      ) : (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.stepOrderliness}>
              Крок {steps[currentStepIndex]?.orderliness}/{steps.length}
            </Text>
            <Text style={styles.stepTitle}>
              {steps[currentStepIndex]?.title}
            </Text>
            <Text style={styles.stepDescription}>
              {steps[currentStepIndex]?.description}
            </Text>
            <Text style={styles.stepTime}>{steps[currentStepIndex]?.time}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Повернутись"
              onPress={prevStep}
              disabled={currentStepIndex === 0}
            />
            {isLastStep ? (
              <Button title="Завершити" />
            ) : (
              <Button
                title="Продовжити"
                onPress={nextStep}
                disabled={currentStepIndex === steps.length - 1}
              />
            )}
          </View>
        </View>
      )}
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
