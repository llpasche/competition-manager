import { Request, Response } from "express";
import { CompetitionBusiness } from "../business/CompetitionBusiness";
import { IdGenerator } from "../services/generateId";
import { CompetitionDTO } from "../types/DTO/CompetitionDTO";
import { UpdateCompetitionStatusDTO } from "../types/DTO/UpdateCompetitionStatusDTO";

export class CompetitionController {
  constructor(
    private competitionBusiness: CompetitionBusiness,
    private idGenerator: IdGenerator
  ) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, date, isFinished } = req.body;
      const id = this.idGenerator.generateId();
      const competitionInput: CompetitionDTO = {
        id: id,
        name: name,
        date: date,
        isFinished: isFinished,
      };

      await this.competitionBusiness.register(competitionInput);

      res.status(201).send({ message: "Competition created." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public updateCompetitionStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id, status } = req.body;
      const updateCompetitionInput: UpdateCompetitionStatusDTO = {
        id,
        status,
      };
      await this.competitionBusiness.updateCompetitionStatus(
        updateCompetitionInput
      );
      res.status(202).send({ message: "Competition status updated." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
