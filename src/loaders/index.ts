import expressLoader from "./expressApp";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongooseLoader";
import crawlingLoader from "./crawlingLoader";

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  // await crawlingLoader();
  await dependencyInjectorLoader();
};
