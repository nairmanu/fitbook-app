import { ActionCreator, Dispatch, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import produce from "immer";
import { Action, ActionsUnion, RootState } from "./actionHelpers";
import { AppState } from ".";
import { statusActions } from "./status";
import ResistanceService, { resistanceSvc } from "../domainlogic/services/Resistance";
import { ResistanceModel } from "../domainlogic/models/ResistanceModel";

interface ResistanceState {
  resistances: ResistanceModel[];
}

export const getInitialResistanceState = (): ResistanceState => {
  return {
    resistances: [],
  };
};

export enum ResistanceActionNames {
  FETCH_RESISTANCE = "FETCH_RESISTANCE",
  RECEIVE_RESISTANCE_LIST = "RECEIVE_RESISTANCE_LIST",
  ADD_RESISTANCE = "ADD_RESISTANCE",
}

export const resistanceActions = {
  receiveResistance: (resistances: string[]): Action => ({
    type: ResistanceActionNames.RECEIVE_RESISTANCE_LIST,
    payload: { resistances },
  }),
  addResistance: (data: ResistanceModel) => ({
    type: ResistanceActionNames.ADD_RESISTANCE,
    payload: data,
  }),
};

export type Actions = ActionsUnion<typeof resistanceActions>;

export type ThunkActionCreator = ActionCreator<ThunkAction<void, AppState, ResistanceService, Actions>>;
export type ThunkActionDispatch = ThunkDispatch<AppState, ResistanceService, AnyAction>;

// export const createResistance: ThunkActionCreator = (data: AddResistanceModel) => async (
//   dispatch: Dispatch,
//   getState: () => AppState
// ) => {
//   dispatch(statusActions.setPending(ResistanceActionNames.ADD_RESISTANCE));
//   const r = await resistanceSvc.addResistance(data);
//   dispatch(statusActions.resetPending(ResistanceActionNames.ADD_RESISTANCE));
// };

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
    case ResistanceActionNames.ADD_RESISTANCE: {
      return produce(state, draft => {
        draft.resistances.push(action.payload);
      });
    }
    default:
      return state;
  }
};

const getResistanceState = (state: RootState) => state.resistance;
const getResistances = (state: RootState) => getResistanceState(state).resistances;

export const resistanceSelectors = {
  getResistanceState,
  getResistances,
};
