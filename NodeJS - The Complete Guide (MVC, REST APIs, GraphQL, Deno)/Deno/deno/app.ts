import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { green, yellow } from "https://deno.land/std@0.97.0/fmt/colors.ts";

import todosRoutes from "./routes/todos.ts";
import notFound from "./middlewares/404.ts";
import { connect } from "./helpers/db_client.ts";

const app = new Application();

connect();

app.use(async (ctx, next) => {
    console.log("Middleware!");
    await next();
});

app.use(async ({ response }: { response: any }, next: any) => {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

app.use(notFound); // 404 page

const port: number = 8080;

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    console.log(`${yellow("Server running on: ")} ${green(url)}`);
});

await app.listen({ port });
