import { Request, Response } from "express";
import { ResultBusiness } from "../business/ResultBusiness";
import { IdGenerator } from "../services/generateId";
import { ResultDTO } from "../types/DTO/ResultDTO";

export class ResultController {
  constructor(
    public resultBusiness: ResultBusiness,
    public idGenerator: IdGenerator
  ) {}

  public registerResult = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { competition, athlete, value, unit } = req.body;
      const id = this.idGenerator.generateId();
      const registerResultInput: ResultDTO = {
        id,
        competition,
        athlete,
        value,
        unit,
      };

      await this.resultBusiness.registerResult(registerResultInput);

      res.status(201).send({ message: "Result successfully registered." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getDartRanking = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name } = req.body;

      const ranking = await this.resultBusiness.getDartRanking(name);

      res.status(200).send({ ranking: ranking });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getDashRanking = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name } = req.body;

      const ranking = await this.resultBusiness.getDashRanking(name);

      res.status(200).send({ ranking: ranking });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
