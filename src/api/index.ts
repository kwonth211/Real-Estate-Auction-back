import { Router } from "express";
import * as jwt from "jsonwebtoken";
import config from "@/config/config";

import { userRouter, noticeRouter, courtRouter, landRouter } from "./routes";
export default () => {
  const app = Router();

  userRouter(app);

  noticeRouter(app);

  courtRouter(app);

  landRouter(app);

  app.get("/api/login", (req, res) => {
    // generate a constant token, no need to be fancy here
    const token = jwt.sign({ username: "Mike" }, config.jwtSecret, {
      expiresIn: 60,
    }); // 1 min token
    // return it back
    res.json({ token: token });
  });

  app.get("/api/token/ping", (req, res) => {
    // Middleware will already catch if token is invalid
    // so if he can get this far, that means token is valid
    res.json({ msg: "all good mate" });
  });

  app.get("/api/ping", (req, res) => {
    // random endpoint so that the client can call something
    res.json({ msg: "pong" });
  });

  return app;
};
