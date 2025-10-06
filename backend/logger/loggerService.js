import express from "express";
const app = express();
import morganLogger from "./loggers/morganLogger.js";

const LOGGER = "morgan";

if (LOGGER === "morgan") {
  app.use(morganLogger);
}

export default app;
