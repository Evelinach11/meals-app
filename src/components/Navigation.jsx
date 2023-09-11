import React from "react";
import { Menu } from "./Menu";
import { Home } from "./Home";
import { Meals } from "./Meals";
import { AddUser } from "./AddUser";
import { UserAccount } from "./UserAccount";
import { BaseRecipes } from "./BaseRecipes";
import { ShoppingCart } from "./ShoppingCart";
import { FavoriteRecipe } from "./FavoriteRecipe";
import { CategoryRecipes } from "./CategoryRecipes";
import { PersonalRecipes } from "./PersonalRecipes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ShowDishsOnMeal } from "./meal-frames/ShowDishsOnMeal";
import PrepareForCooking from "./meal-frames/PrepareForCooking";

export const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="UserAccount" component={UserAccount} />
        <Stack.Screen name="Category" component={CategoryRecipes} />
        <Stack.Screen name="BaseRecipes" component={BaseRecipes} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        <Stack.Screen name="FavoriteRecipe" component={FavoriteRecipe} />
        <Stack.Screen name="PersonalRecipes" component={PersonalRecipes} />
        <Stack.Screen name="Meals" component={Meals} />
        <Stack.Screen name="ShowDishsInMealModal" component={ShowDishsOnMeal} />
        <Stack.Screen name="PrepareForCooking" component={PrepareForCooking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
