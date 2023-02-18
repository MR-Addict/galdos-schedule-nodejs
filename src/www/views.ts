import express, { Request, Response } from "express";

import { readLogs } from "@/lib/utils";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const logs = readLogs();
  return res.render("index", { logs });
});

export default router;
