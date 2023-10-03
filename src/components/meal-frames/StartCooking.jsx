import {
  hasProcessState,
  stepState,
  findIndexOfProcessState,
  isAllStateComplete,
} from "../../../utilis/steps-util";
import {
  resetStatesByRecipeId,
  updateStepsByRecipeId,
  fetchStepsByRecipeId,
} from "../../../db/recipeStepsDBService";
import * as Progress from "react-native-progress";
import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

import CircularProgress from "react-native-circular-progress-indicator";
import { convertMinToMilisec } from "../../../utilis/time-util";

export const StartCooking = ({ route }) => {
  const { recipeId, recipeTime } = route.params;
  const [steps, setSteps] = useState([]);

  const [time, setTime] = useState(0);
  const [key, setKey] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    fetchStepsByRecipeId(recipeId)
      .then((result) => {
        setSteps(result);
        setCurrentStepIndex(findIndexOfProcessState(result));
        setTime(steps[currentStepIndex].time);
      })
      .catch((error) => {
        console.error("Error fetching steps:", error);
      });
  }, [currentStepIndex]);

  const completeAllSteps = isAllStateComplete(steps);
  const currentStep = steps[currentStepIndex];

  const resetCircularProgress = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      updateStepsByRecipeId(stepState.complete, recipeId, currentStep.id).then(
        () => {
          steps[currentStepIndex].state = stepState.complete;
          updateStepsByRecipeId(
            stepState.process,
            recipeId,
            steps[currentStepIndex + 1].id
          ).then(() => {
            console.log(`currentStepIndex  ${currentStepIndex}`);
            steps[currentStepIndex + 1].state = stepState.process;
            setSteps([...steps]);
            resetCircularProgress();
            setTime(steps[currentStepIndex]?.time);
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
          });
        }
      );
    } else if (currentStepIndex === steps.length - 1) {
      updateStepsByRecipeId(stepState.complete, recipeId, currentStep.id).then(
        () => {
          steps[currentStepIndex].state = stepState.complete;
          setSteps([...steps]);
          resetCircularProgress();
          setTime(steps[currentStepIndex]?.time);
        }
      );
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      resetCircularProgress();
      setTime(steps[currentStepIndex]?.time);
      setCurrentStepIndex((prevIndex) => prevIndex - 1);
    }
  };

  const resetState = () => {
    resetStatesByRecipeId(recipeId).then(() => {
      for (let i = 0; i < steps.length; i++) {
        steps[i].state = stepState.wait;
      }
      setCurrentStepIndex(0);
    });
  };

  const calculateProgress = () => {
    const cumulativeTime = steps.reduce((sum, step, index) => {
      if (index < currentStepIndex && step.state === stepState.complete) {
        return sum + step.time;
      }
      return sum;
    }, 0);

    const currentTime =
      currentStep?.state === stepState.complete || stepState.process
        ? currentStep.time
        : 0;

    return (cumulativeTime + currentTime) / recipeTime;
  };

  return (
    <View style={styles.container}>
      {steps !== null || undefined ? (
        <View>
          {completeAllSteps ? (
            <View>
              <Text>Всі кроки успішно виконано! Bon apeti</Text>
              <Text onPress={resetState}>Почати з початку</Text>
            </View>
          ) : (
            <View>
              <View style={styles.containerCircle}>
                <CircularProgress
                  key={key}
                  radius={90}
                  value={100}
                  valueSuffix="%"
                  inActiveStrokeColor={"#0478ff"}
                  progressValueColor="#0478ff"
                  activeStrokeColor="#0478ff"
                  activeStrokeSecondaryColor={"#FF6AC2"}
                  inActiveStrokeOpacity={6}
                  inActiveStrokeWidth={0.8}
                  duration={convertMinToMilisec(time)}
                />
              </View>
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
                <Text style={styles.stepTime}>
                  {steps[currentStepIndex]?.time}хв
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Повернутись"
                  onPress={prevStep}
                  disabled={currentStepIndex === 0}
                />
                <Button
                  title={
                    currentStepIndex === steps.length - 1
                      ? "Завершити"
                      : "Продовжити"
                  }
                  onPress={nextStep}
                />
              </View>

              <View style={{ width: "95%", alignSelf: "center" }}>
                <Progress.Bar progress={calculateProgress()} width={null} />
              </View>
            </View>
          )}
        </View>
      ) : (
        <Text>Load</Text>
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
  progressBar: {
    width: "100%",
    height: 20,
    backgroundColor: "#e0e0df",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4caf50",
  },

  containerCircle: {
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
  },
});
