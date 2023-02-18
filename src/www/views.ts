import express, { Request, Response } from "express";

import { readLogs } from "@/lib/log";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const logs = await readLogs();
  return res.render("index", { logs });
});

export default router;
