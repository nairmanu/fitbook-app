import { AppState, AppStateStatus } from "react-native";
import RNSQLite from "react-native-sqlite-storage";
import DatabaseInitialization from "./DatabaseInitialization";
import { IDatabase } from "./IDatabase";

export default class SQLLite implements IDatabase {
  private static readonly FILE_NAME = "FitbookDB.db";
  private databaseInstance: RNSQLite.SQLiteDatabase | undefined;
  private appState: AppStateStatus = "active";

  public constructor() {
    console.log("[db] Adding listener to handle app state changes");
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  public async insert(query: string): Promise<any> {
    return this.getDatabase().then(db =>
      db.executeSql(query).then(([results]) => {
        const { insertId } = results;
        console.log(`[db] New entry added to db"! InsertId: ${insertId}`);
      })
    );
  }

  public async getOne(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async getAll(query: string): Promise<any[]> {
    console.log("[db] Fetching lists from the db...");
    return this.getDatabase()
      .then(db =>
        // Get all the lists, ordered by newest lists first
        db.executeSql(query)
      )
      .then(([results]) => {
        if (results === undefined) {
          return [];
        }

        let data: Array<any> = [];
        results.rows.raw().forEach(row => {
          data.push(row);
        });

        return data;
      });
  }
  public async deleteOne(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  private async getDatabase(): Promise<RNSQLite.SQLiteDatabase> {
    if (this.databaseInstance !== undefined) {
      return Promise.resolve(this.databaseInstance);
    }
    // otherwise: open the database first
    return this.open();
  }

  private async open(): Promise<RNSQLite.SQLiteDatabase> {
    RNSQLite.DEBUG(true);
    RNSQLite.enablePromise(true);

    if (this.databaseInstance) {
      console.log("[db] Database is already open: returning the existing instance");
      return this.databaseInstance;
    }

    // Otherwise, create a new instance
    const db = await RNSQLite.openDatabase({
      name: SQLLite.FILE_NAME,
      location: "default",
    });
    console.log("[db] Database open!");

    // Perform any database initialization or updates, if needed
    const databaseInitialization = new DatabaseInitialization();
    await databaseInitialization.updateDatabaseTables(db);

    this.databaseInstance = db;
    return db;
  }

  private async close(): Promise<void> {
    if (this.databaseInstance === undefined) {
      console.log("[db] No need to close DB again - it's already closed");
      return;
    }
    const status = await this.databaseInstance.close();
    console.log("[db] Database closed.");
    this.databaseInstance = undefined;
  }

  private handleAppStateChange(nextAppState: AppStateStatus) {
    if (this.appState === "active" && nextAppState.match(/inactive|background/)) {
      // App has moved from the foreground into the background (or become inactive)
      console.log("[db] App has gone to the background - closing DB connection.");
      this.close();
    }
    this.appState = nextAppState;
  }
}

export const sqlClient = new SQLLite();
