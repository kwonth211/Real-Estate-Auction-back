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

  return app;
};
