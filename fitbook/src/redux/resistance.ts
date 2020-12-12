import { ActionCreator, Dispatch, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import produce from "immer";
import { Action, ActionsUnion, RootState } from "./actionHelpers";
import { AppState } from ".";
import { statusActions } from "./status";
import ResistanceService, { resistanceSvc } from "../domainlogic/services/Resistance";
import { ResistanceFormModel, ResistanceModel } from "../domainlogic/models/ResistanceModel";

interface ResistanceState {
  types: string[];
  resistances: ResistanceModel[];
  selectedType?: string;
}

export const getInitialResistanceState = (): ResistanceState => {
  return {
    types: [],
    resistances: [],
  };
};

export enum ResistanceActionNames {
  FETCH_RESISTANCE = "FETCH_RESISTANCE",
  RECEIVE_RESISTANCE_LIST = "RECEIVE_RESISTANCE_LIST",
  ADD_RESISTANCE = "ADD_RESISTANCE",
  FETCH_RESSISTANCE_TYPES = "FETCH_RESSISTANCE_TYPES",
  RECEIVE_REISTANCE_TYPES = "RECEIVE_REISTANCE_TYPES",
}

export const resistanceActions = {
  receiveResistance: (resistances: ResistanceModel[]): Action => ({
    type: ResistanceActionNames.RECEIVE_RESISTANCE_LIST,
    payload: { resistances },
  }),
  addResistance: (data: ResistanceModel) => ({
    type: ResistanceActionNames.ADD_RESISTANCE,
    payload: data,
  }),
  receiveResistanceTypes: (types: Record<string, string>[]): Action => ({
    type: ResistanceActionNames.RECEIVE_REISTANCE_TYPES,
    payload: types,
  }),
};

export type Actions = ActionsUnion<typeof resistanceActions>;

export type ThunkActionCreator = ActionCreator<ThunkAction<void, AppState, ResistanceService, Actions>>;
export type ThunkActionDispatch = ThunkDispatch<AppState, ResistanceService, AnyAction>;

export const createResistance: ThunkActionCreator = (data: ResistanceFormModel) => async (
  dispatch: Dispatch & ThunkActionDispatch,
  getState: () => AppState
) => {
  dispatch(statusActions.setPending(ResistanceActionNames.ADD_RESISTANCE));
  const r = await resistanceSvc.addResistance(data);
  dispatch(statusActions.resetPending(ResistanceActionNames.ADD_RESISTANCE));
  dispatch(getResistanceList());
};

export const getResistanceList: ThunkActionCreator = () => async (dispatch: Dispatch, getState: () => AppState) => {
  dispatch(statusActions.setPending(ResistanceActionNames.FETCH_RESISTANCE));
  const r = await resistanceSvc.getResistances();
  dispatch(statusActions.resetPending(ResistanceActionNames.FETCH_RESISTANCE));
  dispatch(resistanceActions.receiveResistance(r));
};

export const getResistanceTypeList: ThunkActionCreator = () => async (dispatch: Dispatch) => {
  dispatch(statusActions.setPending(ResistanceActionNames.FETCH_RESSISTANCE_TYPES));
  const r = await resistanceSvc.getResistanceTypes();
  dispatch(statusActions.resetPending(ResistanceActionNames.FETCH_RESSISTANCE_TYPES));
  dispatch(resistanceActions.receiveResistanceTypes(r));
};

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
    case ResistanceActionNames.RECEIVE_REISTANCE_TYPES: {
      const data: Record<string, string>[] = action.payload;
      const types = data.map(d => d.type).sort();
      return produce(state, draft => {
        draft.types = types;
      });
    }
    default:
      return state;
  }
};

const getResistanceState = (state: RootState) => state.resistance;
const getResistances = (state: RootState) => getResistanceState(state).resistances;
const getResistanceTypes = (state: RootState) => getResistanceState(state).types;

export const resistanceSelectors = {
  getResistanceState,
  getResistances,
  getResistanceTypes,
};
