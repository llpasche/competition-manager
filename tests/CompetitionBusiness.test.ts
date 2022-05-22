import { CompetitionBusiness } from "../src/business/CompetitionBusiness";
import { CustomError } from "../src/error/CustomError";
import { CompetitionDTO } from "../src/types/DTO/CompetitionDTO";
import { UpdateCompetitionStatusDTO } from "../src/types/DTO/UpdateCompetitionStatusDTO";
import { CompetitionDatabaseMock } from "./mocks/CompetitionDatabaseMock";
import { competitionMock } from "./mocks/CompetitionMock";

const competitionBusinessMock = new CompetitionBusiness(
  new CompetitionDatabaseMock() as any
);

describe("Register competition tests", () => {
  test("Should return an error if 'name' field isn't filled.", async () => {
    expect.assertions;
    try {
      const inputMock: CompetitionDTO = {
        id: "mocked_id",
        name: "",
        date: "2002/02/02",
        isFinished: true,
      };

      await competitionBusinessMock.register(inputMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please fill in all fields.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should return an error if 'date' field isn't filled.", async () => {
    expect.assertions;
    try {
      const inputMock: CompetitionDTO = {
        id: "mocked_id",
        name: "mocked_name",
        date: "",
        isFinished: true,
      };

      await competitionBusinessMock.register(inputMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please fill in all fields.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should register a competition.", async () => {
    expect.assertions;
    try {
      await competitionBusinessMock.register(competitionMock);

      expect(competitionBusinessMock.register).toBeCalled();
    } catch (error) {
      console.log(error);
    }
  });
});

describe("Update competition test", ()=>{
  test("Should return an error if 'id' field isn't filled.", async () => {
    expect.assertions;
    try {
      const updateCompetitionMock: UpdateCompetitionStatusDTO = {
        id: "",
        status: "open",
      };

      await competitionBusinessMock.updateCompetitionStatus(updateCompetitionMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please fill in all fields.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should return an error if 'status' field isn't filled.", async () => {
    expect.assertions;
    try {
      const updateCompetitionMock: UpdateCompetitionStatusDTO = {
        id: "mocked_id",
        status: "",
      };

      await competitionBusinessMock.updateCompetitionStatus(updateCompetitionMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please fill in all fields.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should return an error if no competition is assigned to the selected id.", async () => {
    expect.assertions;
    try {
      const updateCompetitionMock: UpdateCompetitionStatusDTO = {
        id: "abluble",
        status: "close",
      };

      await competitionBusinessMock.updateCompetitionStatus(updateCompetitionMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Competition not found.");
        expect(error.statusCode).toEqual(404);
      }
    }
  });

  test("Should return an error if 'status' field isn't valid.", async () => {
    expect.assertions;
    try {
      const updateCompetitionMock: UpdateCompetitionStatusDTO = {
        id: "mocked_id",
        status: "banana",
      };

      await competitionBusinessMock.updateCompetitionStatus(updateCompetitionMock);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Please insert 'open' to open a competition or 'close' to close a competition.");
        expect(error.statusCode).toEqual(422);
      }
    }
  });

  test("Should update a competition status.", async () => {
    expect.assertions;
    try {
      const updateCompetitionMock: UpdateCompetitionStatusDTO = {
        id: "mocked_id",
        status: "open",
      };

      await competitionBusinessMock.updateCompetitionStatus(updateCompetitionMock);
      expect(competitionBusinessMock.updateCompetitionStatus).toBeCalled()
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error)
      }
    }
  });
})