import express from "express";
import { newTestDomain } from "../domains/test";
export const newTestRouter = async () => {
  const router = express.Router();
  const testDomain = await newTestDomain();

  const updateTestUser = async (req, res) => {
    const result = await testDomain.updateTestUser();
    res.json(result);
    return result;
  };
  router.put("/update", updateTestUser);
  return router;
};
