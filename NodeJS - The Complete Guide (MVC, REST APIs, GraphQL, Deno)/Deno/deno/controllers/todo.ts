import Todo from "../interfaces/todo.ts";
import todos from "../stubs/todos.ts";

//! Incomplete: Make changes as per version changes of `mongo` Package
//! Old packages crash due to changes in their dependency packages

import { getDb } from "../helpers/db_client.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const getPosts = async ({ response }: { response: any }, next: any) => {
    const todos = await getDb().collection("todos").find();
    const transfromedTodos = todos.map((todo: { _id: ObjectId; text: string }) => {
        return {
            id: todo._id.$oid,
            text: todo.text,
        };
    });
    response.body = { success: true, todos: transfromedTodos };
};

const createPost = async ({ response, request }: { response: any; request: any }, next: any) => {
    const body: { value: { text: string } } = await request.body();
    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            message: "No data provided",
        };
        return;
    }
    const value: { text: string } = await body.value;
    const newTodo: Todo = {
        text: value.text,
    };
    const id = await getDb().collection("todos").insertOne(newTodo);
    newTodo.id = id.$oid;

    response.status = 201;
    response.body = { success: true, message: "Created Todo", todo: newTodo };
};

const updatePost = async (
    { response, request, params }: { response: any; request: any; params: { todoId: string } },
    next: any
) => {
    const todoIndex = todos.findIndex((todo) => todo.id === params.todoId);
    if (todoIndex < 0) {
        response.status = 404;
        response.body = {
            success: false,
            message: "No todo found with that id",
        };
        return;
    }
    const body: { value: { text: string } } = await request.body();
    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            message: "No data provided",
        };
        return;
    }
    const value: { text: string } = await body.value;
    await getDb()
        .collection("todos")
        .updateOne({ _id: ObjectId(params.todoId) }, { $set: { text: value.text } });

    response.status = 200;
    response.body = { success: true, message: "Updated Todo!" };
};

const deletePost = async (
    { response, request, params }: { response: any; request: any; params: { todoId: string } },
    next: any
) => {
    const todoIndex = todos.findIndex((todo) => todo.id === params.todoId);
    if (todoIndex < 0) {
        response.status = 404;
        response.body = {
            success: false,
            message: "No todo found with that id",
        };
        return;
    }

    await getDb()
        .collection("todos")
        .deleteOne({ _id: ObjectId(params.todoId) });
    response.body = { message: "Deleted Todo!" };
};

export default {
    getPosts,
    createPost,
    updatePost,
    deletePost,
};
