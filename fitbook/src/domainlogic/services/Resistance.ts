import { ResistanceModel } from "../models/ResistanceModel";

export default class Resistance {
  public async addResistance(resistance: ResistanceModel) {
    console.log("Adding resistance...", resistance);
  }
}

export const resistanceSvc = new Resistance();
