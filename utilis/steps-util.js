export const stepState = {
  wait: "wait",
  process: "process",
  complete: "complete",
};
export const hasProcessState = (array) => {
  if (array === undefined || array === null || array.length === 0) {
    console.log("steps array empty or undefined");
    return false;
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i].state === stepState.process) {
      console.log("step array has process state");
      return true;
    }
  }

  return false;
};

export const findIndexOfProcessState = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].state === stepState.process) {
      console.log(i);
      return i;
    }
  }
  return 0;
};

export const isAllStateComplete = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].state !== stepState.complete) {
      console.log("not all steps completed");
      return false;
    }
  }
  console.log("all state is complete");
  return true;
};
