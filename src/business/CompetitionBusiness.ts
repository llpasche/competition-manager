import { CompetitionDatabase } from "../data/CompetitionDatabase";
import { CustomError } from "../error/CustomError";
import { Competition } from "../model/Competition";
import { CompetitionDTO } from "../types/DTO/CompetitionDTO";
import { UpdateCompetitionStatusDTO } from "../types/DTO/UpdateCompetitionStatusDTO";
import { UpdateCompetitionInput } from "../types/UpdateCompetitionInput";

export class CompetitionBusiness {
  constructor(private competitionDatabase: CompetitionDatabase) {}

  public register = async (competition: CompetitionDTO): Promise<void> => {
    try {
      const { id, name, date, isFinished } = competition;

      if (!name || !date) {
        throw new CustomError(422, "Please fill in all fields.");
      }

      const newCompetition = new Competition(id, name, date, isFinished);
      await this.competitionDatabase.register(newCompetition);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public updateCompetitionStatus = async (
    competition: UpdateCompetitionStatusDTO
  ): Promise<void> => {
    try {
      const { id, status } = competition;
      if (!id || !status) {
        throw new CustomError(422, "Please fill in all fields.");
      }

      const foundCompetition =
        await this.competitionDatabase.getCompetitionById(id);
      if (!foundCompetition) {
        throw new CustomError(404, "Competition not found.");
      }
      const updateCompetitionInput: UpdateCompetitionInput = {
        id,
        status,
      };

      if (status.toLowerCase() !== "close" && status.toLowerCase() !== "open") {
        throw new CustomError(
          422,
          "Please insert 'open' to open a competition or 'close' to close a competition."
        );
      }
      await this.competitionDatabase.updateCompetitionStatus(
        updateCompetitionInput
      );
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
