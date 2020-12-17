import produce from "immer";
import { Style, ThemeName } from "../styles/style";
import { Action, ActionsUnion, RootState } from "./actionHelpers";

interface ProfileState {
  isDarkMode: boolean;
}

export const getInitialProfileState = (): ProfileState => {
  return {
    isDarkMode: Style.getCurrentTheme() === ThemeName.DARK,
  };
};

export enum ProfileActionNames {
  FETCH_MODE = "FETCH_MODE",
  RECEIVE_MODE = "RECEIVE_MODE",
}

export const profileActions = {
  receiveProfile: (isDarkMode: boolean): Action => ({
    type: ProfileActionNames.RECEIVE_MODE,
    payload: isDarkMode,
  }),
};

export type Actions = ActionsUnion<typeof profileActions>;

export const profileReducer = (state: ProfileState = getInitialProfileState(), action: Actions): ProfileState => {
  switch (action.type) {
    case ProfileActionNames.RECEIVE_MODE: {
      const isDarkMode = action.payload;
      return produce(state, draft => {
        draft.isDarkMode = isDarkMode;
      });
    }
    default:
      return state;
  }
};

const getProfileState = (state: RootState) => state.profiles;
const checkIsDarkMode = (state: RootState) => getProfileState(state).isDarkMode;

export const profileSelectors = {
  getProfileState,
  checkIsDarkMode,
};
