import readLastLines from "read-last-lines";
import express, { Request, Response, NextFunction } from "express";

import { logPath } from "@/config";
import { redisClient } from "@/lib/utils";

const router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  const logFile = req.query.file?.toString() || "glados";
  const redisCachedLogData = await redisClient.get(logFile);
  if (redisCachedLogData) return res.status(200).send(redisCachedLogData);
  else next();
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const logFile = req.query.file?.toString() || "glados";
    const file = logPath + logFile + ".txt";
    const lines = Number(req.query.lines) || 1;
    const logData = await readLastLines.read(file, lines);

    await redisClient.set(logFile, logData, { EX: 60 * 10, NX: true });
    return res.status(200).send(logData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error!");
  }
});

export default router;
