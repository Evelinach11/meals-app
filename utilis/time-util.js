export const convertMinToSec = (min) => {
  return min * 60;
};

export const convertSecToMiliSec = (sec) => {
  return sec * 1000;
};

export const convertMinToMilisec = (min) => {
  return convertSecToMiliSec(convertMinToSec(min));
};

export const convertSecToMin = (sec) => {
  return sec / 60;
};

export const convertMiliSecToMin = (sec) => {
  return sec / 1000;
};
