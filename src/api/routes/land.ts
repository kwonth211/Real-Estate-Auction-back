import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { LandRepository } from "@/repository";

const route = Router();
const courtRouter = (app: Router) => {
  app.use("/land", route);

  const findLandList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const landRepository = Container.get(LandRepository);

    const landList = await landRepository.findLandList({
      where: { court: 7 },
    });

    res.send({
      status: "ok",
      landList,
    });
  };
  route.get("/", findLandList);
};
export default courtRouter;
