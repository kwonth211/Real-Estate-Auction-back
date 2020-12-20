import express from "express";
import "./env";

const startServer = async () => {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app
    .listen(8000, () => {
      console.log("server start on port : 8000");
    })
    .on("error", (error) => {
      console.log("에러 발생");
    });
};

startServer();
