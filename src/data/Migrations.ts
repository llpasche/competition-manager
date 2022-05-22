import { BaseDatabase } from "./BaseDatabase";

export class Migrations extends BaseDatabase {
  public printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
  };

  public createTables = () =>
    this.connection
      .raw(
        `
        CREATE TABLE IF NOT EXISTS competition(  
          id VARCHAR(255) NOT NULL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          date VARCHAR(255) NOT NULL,
          is_finished BOOLEAN NOT NULL
      );
        CREATE TABLE IF NOT EXISTS result(  
          id VARCHAR(255) NOT NULL PRIMARY KEY,
          competition VARCHAR(255) NOT NULL,
          athlete VARCHAR(255) NOT NULL,
          value DOUBLE NOT NULL
          unit ENUM('s', 'm') NOT NULL,
          FOREIGN KEY (competition) REFERENCES competition (name)
      );
   `
      )
      .then(() => {
        console.log("Tables created.");
      })
      .catch(this.printError);

  public closeConnection = () => {
    this.connection.destroy();
  };
}

const myMigrations = new Migrations();

myMigrations.createTables().finally(myMigrations.closeConnection);
