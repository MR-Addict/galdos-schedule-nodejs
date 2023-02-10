import express from "express";

import log from "./log";

const api = express();
api.use("/log", log);

export default api;
