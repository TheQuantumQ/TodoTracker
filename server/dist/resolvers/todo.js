"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoResolver = void 0;
const Todo_1 = require("../entities/Todo");
const type_graphql_1 = require("type-graphql");
let TodoResolver = class TodoResolver {
    todos({ fork }) {
        return fork.find(Todo_1.Todo, {});
    }
    todo(id, { fork }) {
        return fork.findOne(Todo_1.Todo, { id });
    }
    createPost(title, { fork }) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = fork.create(Todo_1.Todo, { title, done: false });
            yield fork.persistAndFlush(todo);
            return todo;
        });
    }
    updatePost(id, title, done, { fork }) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield fork.findOne(Todo_1.Todo, { id });
            if (!todo)
                return null;
            if (title)
                todo.title = title;
            if (done !== null)
                todo.done = done;
            yield fork.persistAndFlush(todo);
            return todo;
        });
    }
    deleteTodo(id, { fork }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fork.nativeDelete(Todo_1.Todo, { id });
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Todo_1.Todo]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "todos", null);
__decorate([
    (0, type_graphql_1.Query)(() => Todo_1.Todo, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "todo", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Todo_1.Todo),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Todo_1.Todo, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("title", { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("done", { nullable: true })),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodo", null);
TodoResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TodoResolver);
exports.TodoResolver = TodoResolver;
//# sourceMappingURL=todo.js.map