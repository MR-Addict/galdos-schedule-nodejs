import readLastLines from "read-last-lines";
import express, { Request, Response } from "express";

import { logPath } from "@/config";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const logFile = req.query.file?.toString() || "glados";
    const file = logPath + logFile + ".txt";
    const lines = Number(req.query.lines) || 1;
    const logData = await readLastLines.read(file, lines);
    return res.status(200).send(logData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error!");
  }
});

export default router;
