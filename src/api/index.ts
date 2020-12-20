import { Router } from "express";
import { user } from "./routes";
export default () => {
  const app = Router();
  user(app);

  return app;
};
