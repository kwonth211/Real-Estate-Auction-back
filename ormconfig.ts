export = {
  type: "mysql",
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: ["src/entity/*.ts"],

  subscribers: ["src/subscriber/*.ts"],
  migrations: ["src/migration/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
