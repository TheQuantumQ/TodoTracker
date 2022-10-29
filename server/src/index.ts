import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { TodoResolver } from "./resolvers/todo";
import { UserResolver } from "./resolvers/user";
import * as redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const fork = orm.em.fork();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ legacyMode: true });
  await redisClient.connect();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: false, //turn on when https
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "qwertywasd",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, TodoResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ fork: fork, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("[EXPRESS SERVER] started listening on port 4000");
  });
};
main();
