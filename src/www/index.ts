import path from "path";
import express from "express";

import views from "./views";

const www = express();

www.use("/", views);
www.use(express.static(path.join(process.cwd(), "public"), { maxAge: 1000 * 60 * 10 }));

www.set("view engine", "pug");
www.set("views", path.join(process.cwd(), "src/views"));

export default www;
