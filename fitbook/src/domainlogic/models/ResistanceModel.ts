import Units, { UnitsModel } from "./UnitsModel";

export interface ResistanceModel {
  type: string;
  userId: number;
  weight: number;
  reps: number;
  unit: UnitsModel;
  notes: string;
}

export interface ResistanceFormModel {
  type: string;
  weight: string;
  reps: string;
  unit: string;
  notes: string;
}

export enum ResistanceDBFields {
  TYPE = "type",
  USER_ID = "user_id",
  WEIGHT = "weight",
  REPS = "reps",
  UNIT = "unit",
  NOTES = "notes",
}

export default class Resistance {
  public static fromFormModel(x: ResistanceFormModel): ResistanceModel {
    const r: ResistanceModel = {
      type: "",
      userId: 0,
      weight: 0,
      reps: 0,
      unit: Units.getUnits(undefined),
      notes: "",
    };

    if (x === undefined) return r;

    return {
      type: x.type,
      userId: 1,
      weight: Number(x.weight),
      reps: Number(x.reps),
      unit: Units.getUnits(x.unit),
      notes: x.notes,
    };
  }
}
