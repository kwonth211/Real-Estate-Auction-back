import expressLoader from "./expressApp";
import dependencyInjectorLoader from "./dependencyInjector";

export default async ({ expressApp }) => {
  await dependencyInjectorLoader({ crawling: false });
  await expressLoader({ app: expressApp });
};
