import { Competition } from "../model/Competition";
import { UpdateCompetitionInput } from "../types/UpdateCompetitionInput";
import { BaseDatabase } from "./BaseDatabase";

export class CompetitionDatabase extends BaseDatabase {
  protected TABLE_NAME: string = "competition";

  public register = async (competition: Competition): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        id: competition.getId(),
        name: competition.getName(),
        date: competition.getDate(),
        is_finished: competition.getIsFinished(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getCompetitionById = async (id: string): Promise<Competition> => {
    try {
      const [result] = await this.connection(this.TABLE_NAME).where("id", id);

      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public updateCompetitionStatus = async (
    input: UpdateCompetitionInput
  ): Promise<void> => {
    try {
      const { id, status } = input;
      switch (status) {
        case "close":
          await this.connection(this.TABLE_NAME)
            .update("is_finished", true)
            .where("id", id);
          break;
        case "open":
          await this.connection(this.TABLE_NAME)
            .update("is_finished", false)
            .where("id", id);
          break;
      }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getCompetitionByName = async (name: string): Promise<Competition> => {
    try {
      const [result] = await this.connection(this.TABLE_NAME).where(
        "name",
        name
      );

      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getActiveCompetitionsByName = async (
    name: string
  ): Promise<Competition[]> => {
    try {
      const [result] = await this.connection(this.TABLE_NAME)
        .where("is_finished", false)
        .andWhere("name", name);

      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
