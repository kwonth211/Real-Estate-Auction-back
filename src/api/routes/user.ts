import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import {
  LandRepository,
  CourtRepository,
  CourtLocationRepository,
} from "@/repository";
import { Court } from "@/entity";
import { getManager } from "typeorm";
const route = Router();
const userRouter = (app: Router) => {
  app.use("/user", route);

  const findUser = async (req: Request, res: Response, next: NextFunction) => {
    // const authServiceInstance = Container.get(AuthService);
    // const { user, token } = await authServiceInstance.SignUp(
    //   req.body as IUserInputDTO
    // );

    const postRepository = getManager().getRepository(Court);

    const posts = await postRepository.find();
    // const courtRepository = Container.get(CourtRepository);
    // debugger;
    res.send({ userId: 3 });
    // return res.status(201).json({ user, token });
  };
  route.get("/finduser", findUser);

  const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send("updateComplete");
  };

  route.put("/updateuser", updateUser);
};
export default userRouter;
