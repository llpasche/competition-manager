import { ResultBusiness } from "../src/business/ResultBusiness";
import { CustomError } from "../src/error/CustomError";
import { ResultDTO } from "../src/types/DTO/ResultDTO";
import { CompetitionDatabaseMock } from "./mocks/CompetitionDatabaseMock";
import { ResultDatabaseMock } from "./mocks/ResultDatabaseMock";

const resultBusinessMock = new ResultBusiness(
  new ResultDatabaseMock() as any,
  new CompetitionDatabaseMock() as any
);

describe("Result registering tests", () => {
  test("Should return an error if 'competition' field is empty.", async () => {
    expect.assertions;
    try {
      const inputMock: ResultDTO = {
        id: "mocked_id",
        competition: "",
        athlete: "mocked_athlete",
        value: 10,
        unit: "m",
      };

      await resultBusinessMock.registerResult(inputMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please fill in all fields.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should return an error if 'athlete' field is empty.", async () => {
    expect.assertions;
    try {
      const inputMock: ResultDTO = {
        id: "mocked_id",
        competition: "mocked_competition",
        athlete: "",
        value: 10,
        unit: "m",
      };

      await resultBusinessMock.registerResult(inputMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please fill in all fields.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should return an error if 'value' field is empty.", async () => {
    expect.assertions;
    try {
      const inputMock: ResultDTO = {
        id: "mocked_id",
        competition: "mocked_competition",
        athlete: "mocked_athlete",
        value: Number(""),
        unit: "m",
      };

      await resultBusinessMock.registerResult(inputMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please fill in all fields.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should return an error if 'unit' field is empty.", async () => {
    expect.assertions;
    try {
      const inputMock: ResultDTO = {
        id: "mocked_id",
        competition: "mocked_competition",
        athlete: "mocked_athlete",
        value: 10,
        unit: "",
      };

      await resultBusinessMock.registerResult(inputMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please fill in all fields.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should return an error if 'unit' field isn't 's' or 'm'.", async () => {
    expect.assertions;
    try {
      const inputMock: ResultDTO = {
        id: "mocked_id",
        competition: "mocked_competition",
        athlete: "mocked_athlete",
        value: 10,
        unit: "k",
      };

      await resultBusinessMock.registerResult(inputMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual(
          "Please use 's' for seconds or 'm' for meters."
        );
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should register a result.", async () => {
    expect.assertions;
    try {
      const inputMock: ResultDTO = {
        id: "mocked_id",
        competition: "mocked_competition",
        athlete: "mocked_athlete",
        value: 10,
        unit: "m",
      };

      await resultBusinessMock.registerResult(inputMock);

      expect(resultBusinessMock.registerResult).toBeCalled()
    } catch (error) {
      console.log(error)
    }
  });
});
