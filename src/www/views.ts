import express, { Request, Response } from "express";

import { log } from "@/lib/mongodb";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const logs = await log.read("glados");
  return res.render("index", { logs });
});

export default router;
