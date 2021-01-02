import expressLoader from "./expressApp";
import dependencyInjectorLoader from "./dependencyInjector";

export default async ({ expressApp }) => {
  await dependencyInjectorLoader({ crawling: true });
  await expressLoader({ app: expressApp });
};
