import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import {
  LandRepository,
  CourtRepository,
  CourtLocationRepository,
} from "@/repository";
const route = Router();
const courtRouter = (app: Router) => {
  app.use("/court", route);

  const findCourtList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const courtRepository = Container.get(CourtRepository);

    const court = await courtRepository.findAll();

    res.send(court);
  };
  route.get("/", findCourtList);

  const findCourt = async (req: Request, res: Response, next: NextFunction) => {
    res.send("updateComplete");
  };

  route.get("/:id", findCourt);
};
export default courtRouter;
