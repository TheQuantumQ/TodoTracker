import { MikroORM } from "@mikro-orm/postgresql";
import path from "path";
import { __prod__ } from "./constants";
import { Todo } from "./entities/Todo";
import { User } from "./entities/User";

export default {
  type: "postgresql",
  dbName: "todotracker",
  user: "postgres",
  password: "postgres",
  debug: !__prod__,
  entities: [Todo, User],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
