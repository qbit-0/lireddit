import { Options } from "@mikro-orm/core/utils/Configuration";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
  },
  entities: [Post, User],
  dbName: "lireddit",
  user: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: !__prod__,
} as Options;
