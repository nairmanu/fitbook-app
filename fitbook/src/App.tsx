import React from "react";
import { Root } from "native-base";
import { Provider } from "react-redux";
import AppNavigator from "./navigators/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

import { store } from "./redux/index";
import AppInit from "./AppInit";

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <Provider store={store}>
      <AppInit>
        <Root>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </Root>
      </AppInit>
    </Provider>
  );
};

export default App;
