import Units, { UnitsModel } from "./UnitsModel";

export interface ResistanceModel {
  type: string;
  userId: number;
  weight: number;
  reps: number;
  unit: UnitsModel;
  notes: string;
  createdDate: string;
}

export interface ResistanceDBModel {
  type: string;
  userId: number;
  weight: number;
  reps: number;
  unit: string;
  notes: string;
  createdDate: string;
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
  CREATED_DATE = "created_date",
}

export default class Resistance {
  public static toDbModel(x: ResistanceFormModel): ResistanceDBModel {
    const r: ResistanceDBModel = {
      type: "",
      userId: 0,
      weight: 0,
      reps: 0,
      unit: Units.getUnits(undefined),
      notes: "",
      createdDate: "",
    };

    if (x === undefined) return r;

    return {
      type: x.type,
      userId: 1,
      weight: Number(x.weight),
      reps: Number(x.reps),
      unit: x.unit,
      notes: x.notes,
      createdDate: new Date().toISOString(),
    };
  }

  public static fromDbModel(x: ResistanceDBModel): ResistanceModel {
    const r: ResistanceModel = {
      type: "",
      userId: 0,
      weight: 0,
      reps: 0,
      unit: Units.getUnits(undefined),
      notes: "",
      createdDate: "",
    };

    if (x === undefined) return r;
    const dateOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };

    const parsedDate = Date.parse(x[ResistanceDBFields.CREATED_DATE]);
    const createdDate = new Intl.DateTimeFormat("en-US", dateOptions).format(parsedDate);

    return {
      type: x[ResistanceDBFields.TYPE],
      userId: x[ResistanceDBFields.USER_ID],
      weight: Number(x[ResistanceDBFields.WEIGHT]),
      reps: Number(x[ResistanceDBFields.REPS]),
      unit: Units.getUnits(x[ResistanceDBFields.UNIT]),
      notes: x[ResistanceDBFields.NOTES],
      createdDate,
    };
  }
}
