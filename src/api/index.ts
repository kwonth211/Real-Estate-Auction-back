import { Router } from "express";
import { userRouter, noticeRouter, courtRouter } from "./routes";
export default () => {
  const app = Router();

  userRouter(app);

  noticeRouter(app);

  courtRouter(app);

  return app;
};
