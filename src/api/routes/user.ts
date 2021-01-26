import express, { Router, Response, NextFunction } from "express";
import { Container } from "typedi";
import Joi from "@hapi/joi";
import _ from "lodash";
import * as jwt from "jsonwebtoken";

import { RequestCustom } from "@/types/express";
import checkJwt from "@/middlewares/checkJwt";
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

  const siginInSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = utils.validate(siginInSchema, req, next);

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
  route.get("/signin", wrapAsync(signIn));

  const getUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send({ status: 200 });
  };
  route.get("/user-info", checkJwt, wrapAsync(getUserInfo));

  // const signOut = (req: Request, res: Response, next: NextFunction) => {
  //   // ctx.cookies.set(ACCESS_TOKEN);

  //   res.send({
  //     status: 200,
  //     message: "로그아웃 되었습니다.",
  //   });
  // };
  // route.get("s", wrapAsync(signOut));

  const getSession = async (
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      res.send({
        status: 200,
      });
      return;
    }
    res.send({
      status: 200,
      user: req.user,
    });
  };

  route.get("/session", wrapAsync(getSession));

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
