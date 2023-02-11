import readLastLines from "read-last-lines";
import express, { Request, Response, NextFunction } from "express";

import { logPath } from "@/config";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  const cacheControl = "public, max-age=3600, must-revalidate";
  if (req.headers["cache-control"] !== cacheControl) res.set("Cache-Control", cacheControl);
  next();
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const file = logPath + (req.query.file || "glados") + ".txt";
    const lines = Number(req.query.lines) || 1;
    const result = await readLastLines.read(file, lines);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error!");
  }
});

export default router;
