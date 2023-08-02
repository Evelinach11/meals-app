import { Menu } from "./Menu";
import { Home } from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Meals } from "./Meals";
import { CategoryRecipes } from "./CategoryRecipes";
import { YourRecipes } from "./YourRecipes";
import { BaseRecipes } from "./BaseRecipes";

export const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Recipes" component={BaseRecipes} />
        <Stack.Screen name="Category" component={CategoryRecipes} />
        <Stack.Screen name="YourRecipes" component={YourRecipes} />
        <Stack.Screen name="Meals" component={Meals} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
