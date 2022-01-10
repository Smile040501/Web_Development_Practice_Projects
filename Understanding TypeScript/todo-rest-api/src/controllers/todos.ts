import { RequestHandler } from "express";

import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, _) => {
    const { text } = req.body as { text: string };
    const newTodo = new Todo(Math.random().toString(), text);
    TODOS.push(newTodo);

    res.status(201).json({
        message: "Created the todo.",
        createdTodo: newTodo,
    });
};

export const getTodos: RequestHandler = (_, res, _2) => {
    res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, _) => {
    const todoId = req.params.id;

    const updatedText = (req.body as { text: string }).text;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }
    TODOS[todoIndex] = new Todo(todoId, updatedText);

    res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, _) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }

    TODOS.splice(todoIndex, 1);

    res.json({ message: "Todo deleted!" });
};
