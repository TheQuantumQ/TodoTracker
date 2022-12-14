"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const Todo_1 = require("./entities/Todo");
const User_1 = require("./entities/User");
exports.default = {
    type: "postgresql",
    dbName: "todotracker",
    user: "postgres",
    password: "postgres",
    debug: !constants_1.__prod__,
    entities: [Todo_1.Todo, User_1.User],
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
};
//# sourceMappingURL=mikro-orm.config.js.map