import { ResistanceModel, ResistanceDBFields } from "../models/ResistanceModel";
import SQLLite, { sqlClient } from "../database/SQLLite";
import { IDatabase } from "../database/IDatabase";
import { Tables } from "../database/DBConstants";

export default class Resistance {
  private db: IDatabase;

  public constructor(sqlClient: SQLLite) {
    this.db = sqlClient;
  }

  public async addResistance(resistance: ResistanceModel) {
    console.log("Adding resistance...", resistance);
    const { type, userId, reps, weight, unit, notes } = resistance;

    const query = `INSERT INTO Resistances 
      (${ResistanceDBFields.TYPE}, 
        ${ResistanceDBFields.USER_ID}, 
        ${ResistanceDBFields.REPS}, 
        ${ResistanceDBFields.WEIGHT},
        ${ResistanceDBFields.UNIT},
        ${ResistanceDBFields.NOTES}) 
        VALUES ("${type}", ${userId}, ${reps}, ${weight}, "${unit}", "${notes}")`;

    await this.db.insert(query);
  }

  public async getResistances(): Promise<ResistanceModel[]> {
    console.log("Getting list of resistances...");
    const query = `SELECT 
      resistance_id, type, user_id, weight, reps, unit, notes 
      FROM ${Tables.RESISTANCES}
      ORDER BY resistance_id DESC`;
    const resistances = this.db.getAll(query);
    return resistances;
  }

  public async getResistanceTypes(): Promise<string[]> {
    console.log("Getting list of resistance types...");
    const query = `SELECT 
      type 
      FROM ${Tables.RESISTANCE_TYPES}`;
    const types = this.db.getAll(query);
    return types;
  }
}

export const resistanceSvc = new Resistance(sqlClient);
