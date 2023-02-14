import path from "path";
import express from "express";

import log from "./log";

const api = express();

api.use("/log", log);
api.use(express.static(path.join(process.cwd(), "public"), { maxAge: 1000 * 60 * 10 }));

export default api;
