import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { enableMapSet } from "immer";
import { resistanceReducer } from "./resistance";
import { statusReducer } from "./status";
import { profileReducer } from "./profiles";

enableMapSet();

export const rootReducer = combineReducers({
  resistance: resistanceReducer,
  ...statusReducer,
  profiles: profileReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const reduxStore = createStore(rootReducer, applyMiddleware(thunkMiddleware));

  return reduxStore;
}

export const store = configureStore();
