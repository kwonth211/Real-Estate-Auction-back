import expressLoader from "./expressApp";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongooseLoader";

export default async ({ expressApp }) => {
  await dependencyInjectorLoader();
  await expressLoader({ app: expressApp });
};
