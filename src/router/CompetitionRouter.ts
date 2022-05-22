import express from "express";
import { CompetitionBusiness } from "../business/CompetitionBusiness";
import { CompetitionController } from "../controller/CompetitionController";
import { CompetitionDatabase } from "../data/CompetitionDatabase";
import { IdGenerator } from "../services/generateId";
export const competitionRouter = express.Router();

const competitionBusiness = new CompetitionBusiness(new CompetitionDatabase());
const competitionController = new CompetitionController(
  competitionBusiness,
  new IdGenerator()
);

competitionRouter.post("/register", competitionController.register);
competitionRouter.patch("/update", competitionController.updateCompetitionStatus);
