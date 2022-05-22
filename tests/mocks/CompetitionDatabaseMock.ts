import { CompetitionDTO } from "../../src/types/DTO/CompetitionDTO";
import { competitionMock } from "./CompetitionMock";

export class CompetitionDatabaseMock {
  public register = async (competition: CompetitionDTO): Promise<void> => {};

  public getCompetitionById = async (
    id: string
  ): Promise<CompetitionDTO | undefined> => {
    if (id === "mocked_id") {
      return competitionMock;
    } else {
      return undefined;
    }
  };

  public updateCompetitionStatus = async (id: string): Promise<void> => {}
}
