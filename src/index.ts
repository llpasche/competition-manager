import { app } from "./controller/app";
import { competitionRouter } from "./router/CompetitionRouter";
import { resultRouter } from "./router/ResultRouter";

app.use("/competitions", competitionRouter);
app.use("/result", resultRouter)

