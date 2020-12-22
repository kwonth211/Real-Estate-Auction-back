import "reflect-metadata";
import { createConnection, useContainer, Connection } from "typeorm";
import { Container } from "typedi";
import { UserRepository, CourtRepository } from "../repository";
import { User, Court, Post } from "@/entity";

const dependencyInjector = async () => {
  useContainer(Container);
  createConnection()
    .then(async (connection) => {
      // console.log("connected");
      // const test = [
      //   { a: "1", b: "2" },
      //   { a: "2", b: "3" },
      // ];
      const repository = Container.get(CourtRepository);

      // const a = test.map((obj) => {
      //   const court = new Court();
      //   court.caseNumber = obj.a;
      //   court.itemNumber = obj.b;
      //   return repository.saveUsingManager(court);
      // });
      // await Promise.all(a);

      const loadedPosts = await repository.findAll();
      await repository.remove(loadedPosts);
      const loadedPosts2 = await repository.findAll();
      console.log(loadedPosts2);

      // console.log("All loaded posts: ", loadedPosts);

      // const user1 = new User();
      // user1.title = "TypeScript 2.0";
      // user1.text = `New TypeScript version adds control flow based type analysis features.`;

      // const user2 = new User();
      // user2.title = "Control flow based type analysis";
      // user2.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;

      // await Promise.all([
      //   repository.saveUsingRepository(user1),
      //   repository.saveUsingManager(user2),
      // ]);

      // console.log("Saved successfully.");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
export default dependencyInjector;
