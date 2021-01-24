//
// Copyright 2020 fastcampus language
//

import LRU from "lru-cache";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

let cache = new LRU({
  max: 1024 * 10,
  maxAge: 1000 * 60 * 60,
});
import { UserRepository } from "@/repository";
import { Container } from "typedi";

const sessionMiddleware = async (req, res, next) => {
  const token = <string>req.headers["authorization"];

  console.log("middware call >", token);

  if (!token) {
    return await next();
  }
  if (!cache) {
    cache = new LRU({
      max: 1024 * 10,
      maxAge: 1000 * 60 * 60,
    });
  }
  const cached = cache.get(token);

  if (false) {
    res.setHeader("user", cached);
  } else {
    const userRepository = Container.get(UserRepository);
    const { userId } = jwt.verify(token, config.jwtSecret);

    const user = await userRepository.findOne({ id: userId });
    console.log(user);
    if (user) {
      cache.set(token, user);
      res.setHeader("user", user);
      res.header("first_name", "HelloWorld");
      res.send();
    }

    return await next();
  }
};

export default sessionMiddleware;
