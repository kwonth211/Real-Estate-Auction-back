import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import Joi from "@hapi/joi";

import { LandRepository } from "@/repository";
import utils from "@/common/utils";
import wrapAsync from "@/common/async";
const route = Router();
const courtRouter = (app: Router) => {
  app.use("/land", route);

  const findLandListSchema = {
    courtId: Joi.number().empty("").required(),
  };

  const findLandList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { courtId } = utils.validate(findLandListSchema, req, next);

    const landRepository = Container.get(LandRepository);

    const landList = await landRepository.findLandList({
      where: { court: courtId },
    });

    res.send({
      status: 200,
      landList,
    });
  };
  route.get("/:courtId", wrapAsync(findLandList));
};
export default courtRouter;
