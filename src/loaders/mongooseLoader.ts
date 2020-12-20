import mongoose from "mongoose";
import mysql from "mysql";
const mongooseLoader = async () => {
  const connection = require("mysql").createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    // host: process.env.DB_HOST,
    // user: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
  });
  return connection;
};
export default mongooseLoader;
