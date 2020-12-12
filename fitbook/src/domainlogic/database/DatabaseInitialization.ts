import RNSQLite from "react-native-sqlite-storage";

export default class DatabaseInitialization {
  // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
  // This should be called each time the database is opened.
  public async updateDatabaseTables(database: RNSQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 0;
    console.log("[dbInit] Beginning database updates...");

    // First: create tables if they do not already exist
    return database
      .transaction(this.createTables)
      .then(() => {
        // Get the current database version
        return this.getDatabaseVersion(database);
      })
      .then(version => {
        dbVersion = version;
        console.log("[dbInit] Current database version is: " + dbVersion);

        // Perform DB updates based on this version

        // Initialize types as part of initial set up
        if (dbVersion < 1) {
          return database.transaction(this.preVersion1Inserts);
        }
        return;
      })
      .then(() => {
        if (dbVersion < 2) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion2Inserts);
        }
        return;
      });
  }

  // Get the version of the database, as specified in the Version table
  private async getDatabaseVersion(database: RNSQLite.SQLiteDatabase): Promise<number> {
    // Select the highest version number from the version table
    return database
      .executeSql("SELECT version FROM Version ORDER BY version DESC LIMIT 1;")
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version;
          return version;
        } else {
          return 0;
        }
      })
      .catch(error => {
        console.log(`[dbInit] No version set. Returning 0. Details: ${error}`);
        return 0;
      });
  }

  // Perform initial setup of the database tables
  private createTables(transaction: RNSQLite.Transaction) {
    // DANGER! For dev only
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql("DROP TABLE IF EXISTS Profiles;");
      transaction.executeSql("DROP TABLE IF EXISTS ResistanceTypes;");
      transaction.executeSql("DROP TABLE IF EXISTS Resistances;");
      transaction.executeSql("DROP TABLE IF EXISTS WorkoutTypes;");
      transaction.executeSql("DROP TABLE IF EXISTS WorkoutSubTypes;");
      transaction.executeSql("DROP TABLE IF EXISTS Workouts;");
      transaction.executeSql("DROP TABLE IF EXISTS Version");
    }

    // Profile table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Profiles(
        user_id INTEGER PRIMARY KEY NOT NULL,
        first_name TEXT,
        last_name TEXT,
        weight INTEGER,
        height INTEGER
      );
    `);

    // Resistance types table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS ResistanceTypes(
        resistance_type_id INTEGER PRIMARY KEY NOT NULL,
        type TEXT
      );
    `);

    // Resistances table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Resistances(
        resistance_id INTEGER PRIMARY KEY NOT NULL,
        type TEXT,
        user_id INTEGER,
        weight INTEGER,
        reps INTEGER,
        unit TEXT,
        time TEXT,
        notes TEXT,
        created_date DATETIME,
        FOREIGN KEY ( type ) REFERENCES ResistanceTypes ( type ),
        FOREIGN KEY ( user_id ) REFERENCES Profiles ( user_id )
      );
    `);

    // Workout types table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS WorkoutTypes(
        workout_type_id INTEGER PRIMARY KEY NOT NULL,
        type TEXT
      );
    `);

    // Workout sub types table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS WorkoutSubTypes(
        workout_sub_type_id INTEGER PRIMARY KEY NOT NULL,
        type TEXT,
        sub_type TEXT,
        FOREIGN KEY ( type ) REFERENCES WorkoutTypes ( type )
      );
    `);

    // Workouts table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Workouts(
        workout_id INTEGER PRIMARY KEY NOT NULL,
        type TEXT,
        sub_type TEXT,
        user_id INTEGER,
        weight INTEGER,
        reps INTEGER,
        unit TEXT,
        time TEXT,
        notes TEXT,
        created_date DATETIME,
        FOREIGN KEY ( type ) REFERENCES WorkoutSubTypes ( type ),
        FOREIGN KEY ( sub_type ) REFERENCES WorkoutSubTypes ( sub_type ),
        FOREIGN KEY ( user_id ) REFERENCES Profiles ( user_id )
      );
    `);

    // Version table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Version(
        version_id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER DEFAULT 0
      );
    `);
  }

  // This function should be called when the version of the db is < 1
  // to initialize type databases
  private preVersion1Inserts(transaction: RNSQLite.Transaction) {
    console.log("[dbInit] Running pre-version 1 DB inserts");

    // Add resistance types
    transaction.executeSql(`INSERT INTO ResistanceTypes (type) VALUES ("PUSH UP");`);
    transaction.executeSql(`INSERT INTO ResistanceTypes (type) VALUES ("PULL UP");`);
    transaction.executeSql(`INSERT INTO ResistanceTypes (type) VALUES ("DIPS");`);
    transaction.executeSql(`INSERT INTO ResistanceTypes (type) VALUES ("BURPEE");`);
    transaction.executeSql(`INSERT INTO ResistanceTypes (type) VALUES ("PLANK");`);
    transaction.executeSql(`INSERT INTO ResistanceTypes (type) VALUES ("LUNGES");`);

    // Add workout types
    transaction.executeSql(`INSERT INTO WorkoutTypes (type) VALUES ("CHEST");`);
    transaction.executeSql(`INSERT INTO WorkoutTypes (type) VALUES ("LEG");`);
    transaction.executeSql(`INSERT INTO WorkoutTypes (type) VALUES ("SHOULDER");`);
    transaction.executeSql(`INSERT INTO WorkoutTypes (type) VALUES ("BACK");`);

    // Add workout subtypes
    transaction.executeSql(`INSERT INTO WorkoutSubTypes (type, sub_type) VALUES ("CHEST", "BENCH PRESS");`);
    transaction.executeSql(`INSERT INTO WorkoutSubTypes (type, sub_type) VALUES ("CHEST", "INCLINE PRESS");`);
    transaction.executeSql(`INSERT INTO WorkoutSubTypes (type, sub_type) VALUES ("CHEST", "DECLINE PRESS");`);
    transaction.executeSql(`INSERT INTO WorkoutSubTypes (type, sub_type) VALUES ("CHEST", "PEC DECK");`);

    // Initialize profile
    transaction.executeSql(`INSERT INTO Profiles (first_name, last_name, weight, height) VALUES ("", "", 0, 0);`);

    // Lastly, update the database version
    transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
  }
}
