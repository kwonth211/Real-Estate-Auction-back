import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import errors from "@/common/errors";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //@Get the jwt token from the head
  const token = <string>req.headers["auth"];
  let jwtPayload;

  console.log("token>>>", token);

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    throw new Error(errors.noSession(error));
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};

export default checkJwt;
