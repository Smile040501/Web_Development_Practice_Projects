import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import todoRoutes from "./routes/todos";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, _: Request, res: Response, _3: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
    console.log("Server running!");
});
