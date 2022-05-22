import { Result } from "../model/Result";
import { BaseDatabase } from "./BaseDatabase";

export class ResultDatabase extends BaseDatabase {
  protected TABLE_NAME: string = "result";

  public registerResult = async (result: Result): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        id: result.getId(),
        competition: result.getCompetition(),
        athlete: result.getAthlete(),
        value: result.getValue(),
        unit: result.getUnit(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getDartResultsByCompetitionName = async (name: string) => {
    try {
      const results = await this.connection(this.TABLE_NAME)
        .where("competition", name)
        .orderBy("value", "desc");

      return results;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getDashResultsByCompetitionName = async (name: string) => {
    try {
      const results = await this.connection(this.TABLE_NAME)
        .where("competition", name)
        .orderBy("value", "asc");

      return results;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getAthletesByCompetition = async (competition: string) => {
    try {
      const results = await this.connection(this.TABLE_NAME)
        .where("competition", competition)
        .select("athlete");

      return results;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  public getAthleteResults = async (athlete: string, competition: string) => {
    try {
      const results = await this.connection(this.TABLE_NAME)
        .where("competition", competition)
        .andWhere("athlete", athlete);

      return results;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getResultByAthleteAndValue = async (
    athlete: string,
    value: number
  ) => {
    try {
      const [result] = await this.connection(this.TABLE_NAME)
        .where("athlete", athlete)
        .andWhere("value", value);
      const fixedResult = { ...result, value: value.toFixed(2) };

      return fixedResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
