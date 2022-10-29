import { Todo } from "../entities/Todo";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";

@Resolver()
export class TodoResolver {
  @Query(() => [Todo])
  todos(@Ctx() { fork }: MyContext): Promise<Todo[]> {
    return fork.find(Todo, {});
  }

  @Query(() => Todo, { nullable: true })
  todo(
    @Arg("id") id: number,
    @Ctx() { fork }: MyContext
  ): Promise<Todo | null> {
    return fork.findOne(Todo, { id });
  }

  @Mutation(() => Todo)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { fork }: MyContext
  ): Promise<Todo> {
    const todo = fork.create(Todo, { title, done: false } as Todo);
    await fork.persistAndFlush(todo);
    return todo;
  }

  @Mutation(() => Todo, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", { nullable: true }) title: string,
    @Arg("done", { nullable: true }) done: boolean,
    @Ctx() { fork }: MyContext
  ): Promise<Todo | null> {
    const todo = await fork.findOne(Todo, { id });
    if (!todo) return null;
    if (title) todo.title = title;
    if (done !== null) todo.done = done;
    await fork.persistAndFlush(todo);
    return todo;
  }

  @Mutation(() => Boolean)
  async deleteTodo(
    @Arg("id") id: number,
    @Ctx() { fork }: MyContext
  ): Promise<boolean> {
    await fork.nativeDelete(Todo, { id });
    return true;
  }
}
