import express, { Request, Response } from "express";

import { readLogs } from "@/lib/utils";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const logs = readLogs();
  res.set("Cache-Control", "public, max-age=600");
  return res.render("index", { logs });
});

export default router;
