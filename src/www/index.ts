import path from "path";
import express from "express";

import views from "./views";

const app = express();

app.use("/", views);
app.use(express.static(path.join(process.cwd(), "public"), { maxAge: 1000 * 60 * 60 * 4 }));

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/www/views"));

export default app;
