import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";

const app = new Application();

app.use((ctx: any, next: any) => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
