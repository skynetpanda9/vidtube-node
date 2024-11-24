import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import logger from "../logger.js";

dotenv.config({
  path: "./.env",
});

const app = express();

// basic middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// morgan middleware
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";

// use routes
app.use("/api/v1/healthcheck", healthcheckRouter);

export { app };
