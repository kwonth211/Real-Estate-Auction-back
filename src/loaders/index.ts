import expressLoader from "./expressApp";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongooseLoader";
import crawlingLoader from "./crawlingLoader";

export default async ({ expressApp }) => {
  // const crawlingData = await crawlingLoader();
  await dependencyInjectorLoader();
  await expressLoader({ app: expressApp });
};
