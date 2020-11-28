export enum UnitsModel {
  KGS = "kgs",
  LBS = "lbs",
}

export default class Units {
  public static getUnits(u: string | undefined): UnitsModel {
    switch (u?.toLocaleLowerCase()) {
      case "kgs":
        return UnitsModel.KGS;
      case "lbs":
        return UnitsModel.LBS;
      default:
        return UnitsModel.LBS;
    }
  }
}
