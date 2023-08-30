import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // const [currentName, setCurrentName] = useState("");
  // const [currentAge, setCurrentAge] = useState("");
  // const [currentWeight, setCurrentWeight] = useState("");
  // const [currentHeight, setCurrentHeight] = useState("");
  // const [selectedGoal, setSelectedGoal] = useState("");

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        // currentName,

        // currentAge,
        // currentWeight,
        // currentHeight,
        // selectedGoal,
        // setCurrentAge,
        // setCurrentHeight,

        // setSelectedGoal,
        // setCurrentWeight,
        // setCurrentName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
