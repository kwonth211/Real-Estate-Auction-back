import express from "express";
import { newBackboneDomain } from "../domains/backbone";
export const newBackboneRouter = async () => {
  const router = express.Router();
  const interfaceDomain = await newBackboneDomain();

  const getBackboneUser = async (req, res) => {
    const result = await interfaceDomain.getBackboneUser();
    res.json(result);
  };
  router.use("/get", getBackboneUser);
  return router;
};
