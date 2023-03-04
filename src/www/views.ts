import express, { Request, Response } from "express";

import { log } from "@/lib/mongodb";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const rawPage = req.query.page || 1;
  const page = Number(rawPage);

  const logs = await log.query("glados", { page: isNaN(page) ? 1 : page, perPage: 20 });
  return res.render("index", logs);
});

export default router;
