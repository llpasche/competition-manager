import express from "express";
import { ResultBusiness } from "../business/ResultBusiness";
import { ResultController } from "../controller/ResultController";
import { CompetitionDatabase } from "../data/CompetitionDatabase";
import { ResultDatabase } from "../data/ResultDatabase";
import { IdGenerator } from "../services/generateId";

export const resultRouter = express.Router();
const resultBusiness = new ResultBusiness(
  new ResultDatabase(),
  new CompetitionDatabase()
);
const resultController = new ResultController(
  resultBusiness,
  new IdGenerator()
);

resultRouter.post("/register", resultController.registerResult);
resultRouter.get("/dart-ranking", resultController.getDartRanking);
resultRouter.get("/dash-ranking", resultController.getDashRanking);
