import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  // 1. Log request body.
  if (!req.url.includes("signin") && !req.url.includes("signup")) {
    const logData = `${req.url}- ${JSON.stringify(req.body)}`;
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
