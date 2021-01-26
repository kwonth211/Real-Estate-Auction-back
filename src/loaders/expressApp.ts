import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api";
import { ErrorMiddleWare, SessionMiddleWare } from "@/middlewares";
import wrapAsync from "@/common/async";

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  app.use(cors());

  // app.use(require("method-override")());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  app.use(SessionMiddleWare);

  // Load API routes
  app.use(routes());

  app.use((req, res, next) => {
    res.status(404).send("Not Found");
  });

  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use(wrapAsync(ErrorMiddleWare));
};
