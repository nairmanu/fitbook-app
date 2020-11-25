import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "../screens/dashboard/Dashboard";
import Resistance from "../screens/resistance/Resistance";
import Workout from "../screens/workout/Workout";

const BottomTab = createBottomTabNavigator();
const AppNavigator: React.FC = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Dashboard} />
      <BottomTab.Screen name="Resistance" component={Resistance} />
      <BottomTab.Screen name="Workout" component={Workout} />
    </BottomTab.Navigator>
  );
};

export default AppNavigator;
