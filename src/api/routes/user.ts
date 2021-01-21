import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import Joi from "@hapi/joi";
import _ from "lodash";
import * as jwt from "jsonwebtoken";

import { UserRepository } from "@/repository";
import errors from "@/common/errors";
import wrapAsync from "@/common/async";
import utils from "@/common/utils";
import { User } from "@/entity";
import config from "@/config/config";

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

    const user = await userRepository.findOne({ email });

    if (_.size(user)) {
      throw new Error(errors.reject("이미 가입한 회원입니다."));
    }

    const userEntity = new User();
    userEntity.email = email;
    userEntity.nickname = nickname;
    userEntity.name = name;
    userEntity.password = password;

    try {
      await userRepository.saveUsingManager(userEntity);
      res.send({
        status: 200,
      });
    } catch (error) {
      throw error;
    }
  };
  route.post("/signup", wrapAsync(createUser));

  const getUserSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = utils.validate(getUserSchema, req, next);

    const user = await userRepository.findOne({ email });

    if (!user?.compareHashPassword(password)) {
      throw new Error(errors.reject("일치하는 회원정보가 없습니다."));
    }

    const token = jwt.sign(
      { userId: user.id, username: user.name },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    res.send({
      status: 200,
      token,
    });
  };
  route.get("/signin", wrapAsync(getUser));

  const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send("updateComplete");
  };

  route.put("/updateuser", wrapAsync(updateUser));
};
export default userRouter;
