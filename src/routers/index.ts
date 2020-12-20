import express from "express";
import { newBackboneRouter } from "./backbone";
import { newTestRouter } from "./test";
// import { newInterfaceRouter } from "./interface";
export const newRouter = async () => {
  // const router = express();
  const router = express.Router();

  const backbone = await newBackboneRouter();
  router.use("/backbone", backbone);

  const test = await newTestRouter();
  router.use("/test", test);

  return router;
};
