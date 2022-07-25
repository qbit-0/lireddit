import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { createConnection } from "typeorm";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "liredit2",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [],
  });
  const orm = await MikroORM.init(mikroConfig);
  const em = orm.em.fork();
  await orm.getMigrator().up();

  const app = express();

  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 60 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      secret: "asdfkljaskldfja329as",
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em, req, res, redis }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
