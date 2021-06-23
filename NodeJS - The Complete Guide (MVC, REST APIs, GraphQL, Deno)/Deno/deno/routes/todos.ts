import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import todoController from "../controllers/todo.ts";

const router = new Router();

router.get("/todos", todoController.getPosts);

router.post("/todos", todoController.createPost);

router.put("/todos/:todoId", todoController.updatePost);

router.delete("/todos/:todoId", todoController.deletePost);

export default router;
