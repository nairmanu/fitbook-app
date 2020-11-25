import React from "react";
import { Root } from "native-base";
import AppNavigator from "./navigators/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <Root>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Root>
  );
};

export default App;
