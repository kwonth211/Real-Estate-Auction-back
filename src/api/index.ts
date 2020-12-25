import { Router } from "express";
import { userRouter, noticeRouter, courtRouter, landRouter } from "./routes";
export default () => {
  const app = Router();

  userRouter(app);

  noticeRouter(app);

  courtRouter(app);

  landRouter(app);

  return app;
};
