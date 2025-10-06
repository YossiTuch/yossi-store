import morgan from "morgan";
import currentDateTimeStr from "../../utils/dateTimeStr.js";

const morganLogger = morgan((tokens, req, res) => {
  const status = Number(tokens.status(req, res));
  const logMessage = [
    currentDateTimeStr,
    tokens.method(req, res),
    tokens.url(req, res),
    status,
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  return logMessage;
});

export default morganLogger;
