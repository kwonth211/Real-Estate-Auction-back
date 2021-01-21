import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { CourtRepository, LandRepository } from "@/repository";
import utils from "@/common/utils";
import wrapAsync from "@/common/async";
import checkJwt from "@/middlewares/checkJwt";
const route = Router();
const courtRouter = (app: Router) => {
  app.use("/court", route);

  const courtRepository = Container.get(CourtRepository);
  const landRepository = Container.get(LandRepository);

  const findCourtList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const ret = await courtRepository.findCourtList({
      relations: ["location_list"],
    });

    const courtList = utils.toRows(ret);

    res.send({
      status: "ok",
      courtList,
    });
  };
  route.get("/list", wrapAsync(findCourtList));

  const findCourt = async (req: Request, res: Response, next: NextFunction) => {
    res.send("updateComplete");
  };
  route.get("/:id", wrapAsync(findCourt));

  const deleteCourt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const ret = await courtRepository.findCourtList({
      relations: ["location_list"],
    });
    // const ret = await courtRepository.clear();

    // await courtRepository.delete({ id: In(ids.employeeAnswersIds) });

    // console.log(res);
  };
  route.delete("/", wrapAsync(deleteCourt));
};
export default courtRouter;
