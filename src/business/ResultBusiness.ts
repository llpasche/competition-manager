import { CompetitionDatabase } from "../data/CompetitionDatabase";
import { ResultDatabase } from "../data/ResultDatabase";
import { CustomError } from "../error/CustomError";
import { Competition } from "../model/Competition";
import { Result } from "../model/Result";
import { ResultDTO } from "../types/DTO/ResultDTO";

export class ResultBusiness {
  constructor(
    public resultDatabase: ResultDatabase,
    public competitionDatabase: CompetitionDatabase
  ) {}

  public registerResult = async (result: ResultDTO): Promise<void> => {
    try {
      const { id, competition, athlete, value, unit } = result;

      if (!competition || !athlete || !value || !unit) {
        throw new CustomError(422, "Please fill in all fields.");
      }

      if (unit.toLowerCase() !== "s" && unit.toLowerCase() !== "m") {
        throw new CustomError(
          422,
          "Please use 's' for seconds or 'm' for meters."
        );
      }

      const foundCompetition: Competition =
        await this.competitionDatabase.getCompetitionByName(competition);
      if (!foundCompetition) {
        throw new CustomError(404, "Competition not found.");
      }

      const isActive =
        await this.competitionDatabase.getActiveCompetitionsByName(competition);

      if (!isActive) {
        throw new CustomError(422, "This competition isn't active.");
      }

      const newResult = new Result(id, competition, athlete, value, unit);

      await this.resultDatabase.registerResult(newResult);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getDartRanking = async (name: string): Promise<Result[]> => {
    try {
      if (!name) {
        throw new CustomError(422, "Please fill in all fields.");
      }

      const foundCompetition: Competition =
        await this.competitionDatabase.getCompetitionByName(name);
      if (!foundCompetition) {
        throw new CustomError(404, "Competition not found.");
      }

      const [results, athletes] = await Promise.all([
        await this.resultDatabase.getDartResultsByCompetitionName(name),
        await this.resultDatabase.getAthletesByCompetition(name),
      ]);

      const mappedForNameAthletes = athletes.map((athlete) => {
        return athlete.athlete;
      });

      const uniqueAthletes = [...new Set(mappedForNameAthletes)];

      const maxResults = [];
      for (let athlete of uniqueAthletes) {
        const personalResults = await this.resultDatabase.getAthleteResults(
          athlete,
          name
        );
        const personalValues = personalResults.map((result) => result.value);

        const maxPersonalValue = personalValues.reduce((a, b) => {
          return Math.max(a, b);
        });

        const maxPersonalResult =
          await this.resultDatabase.getResultByAthleteAndValue(
            athlete,
            maxPersonalValue
          );
        maxResults.push(maxPersonalResult);
      }

      maxResults.sort((a, b) => {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      });

      const ranking: Result[] = [];
      let i = 1;
      for (let result of maxResults) {
        result = { ...result, position: i };
        ranking.push(result);
        i++;
      }

      return ranking;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getDashRanking = async (name: string): Promise<Result[]> => {
    try {
      if (!name) {
        throw new CustomError(422, "Please fill in all fields.");
      }

      const foundCompetition: Competition =
        await this.competitionDatabase.getCompetitionByName(name);
      if (!foundCompetition) {
        throw new CustomError(404, "Competition not found.");
      }

      const results = await this.resultDatabase.getDashResultsByCompetitionName(
        name
      );

      const ranking: Result[] = [];
      let i = 1;
      for (let result of results) {
        result = { ...result, position: i };
        ranking.push(result);
        i++;
      }

      return ranking;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
