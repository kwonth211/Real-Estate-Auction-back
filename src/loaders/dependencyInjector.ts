import "reflect-metadata";
import { createConnection, useContainer, Connection } from "typeorm";
import { Container } from "typedi";
import { UserRepository } from "../repository/UserRepository";
import { User } from "../entity/User";
import mongoose from "mongoose";

const dependencyInjector = async () => {
  useContainer(Container);
  createConnection()
    .then(async (connection) => {
      console.log("connected");
      const user1 = new User();
      user1.title = "TypeScript 2.0";
      user1.text = `New TypeScript version adds control flow based type analysis features.`;

      const user2 = new User();
      user2.title = "Control flow based type analysis";
      user2.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;

      const repository = Container.get(UserRepository);
      // await Promise.all([
      //   repository.saveUsingRepository(user1),
      //   repository.saveUsingManager(user2),
      // ]);

      // console.log("Saved successfully.");

      // const loadedPosts = await repository.findAll();
      // console.log("All loaded posts: ", loadedPosts);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
export default dependencyInjector;
