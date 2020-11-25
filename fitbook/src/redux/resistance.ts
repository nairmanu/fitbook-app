import produce from "immer";
import { Action, ActionsUnion } from "./actionHelpers";

interface ResistanceState {
  resistances: string[];
}

export const getInitialResistanceState = (): ResistanceState => {
  return {
    resistances: [],
  };
};

export enum ResistanceActionNames {
  FETCH_RESISTANCE = "FETCH_RESISTANCE",
  RECEIVE_RESISTANCE_LIST = "RECEIVE_RESISTANCE_LIST",
}

export const resistanceActions = {
  receiveResistance: (resistances: string[]): Action => ({
    type: ResistanceActionNames.RECEIVE_RESISTANCE_LIST,
    payload: { resistances },
  }),
};

export type Actions = ActionsUnion<typeof resistanceActions>;

export const resistanceReducer = (
  state: ResistanceState = getInitialResistanceState(),
  action: Actions
): ResistanceState => {
  switch (action.type) {
    case ResistanceActionNames.RECEIVE_RESISTANCE_LIST: {
      const { resistances } = action.payload;
      return produce(state, draft => {
        draft.resistances = resistances;
      });
    }
    default:
      return state;
  }
};
