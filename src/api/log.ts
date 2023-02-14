import fs from "fs";
import express, { Request, Response } from "express";

import { logPath, allTasks } from "@/config";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const logName = req.query.logName?.toString();
    if (!logName) return res.json({ allTasks });

    if (!allTasks.includes(logName)) return res.status(400).send("No such file!");

    const file = logPath + logName + ".txt";
    const rawLogs = fs.readFileSync(file, { encoding: "utf-8" });
    const logs = rawLogs.split("\n").filter((item) => item !== "");

    return res.status(200).json({ logs: logs.reverse() });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error!");
  }
});

export default router;
