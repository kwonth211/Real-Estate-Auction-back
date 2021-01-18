import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import Joi from "@hapi/joi";

import { UserRepository } from "@/repository";
import utils from "@/common/utils";
import { User } from "@/entity";
import { getManager } from "typeorm";
const route = Router();
const userRouter = (app: Router) => {
  app.use("/auth", route);

  const userRepository = Container.get(UserRepository);

  const createUserSchema = {
    email: Joi.string().required(),
    nickname: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  };
  const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, nickname, name, password } = utils.validate(
      createUserSchema,
      req,
      next
    );

    const user = new User();
    user.email = email;
    user.nickname = nickname;
    user.name = name;
    user.password = password;

    try {
      // ** todo throw error && error reject
      await userRepository.saveUsingManager(user);
      res.send({
        status: 200,
      });
    } catch (error) {
      throw error;
    }
  };
  route.post("/signup", createUser);

  const findUser = async (req: Request, res: Response, next: NextFunction) => {
    // const authServiceInstance = Container.get(AuthService);
    // const { user, token } = await authServiceInstance.SignUp(
    //   req.body as IUserInputDTO
    // );

    const postRepository = getManager().getRepository(User);

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
