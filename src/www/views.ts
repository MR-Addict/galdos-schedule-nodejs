import express, { Request, Response } from "express";

import { log } from "@/lib/mongodb";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const collections = (await log.collectios()).data;
  if (!collections) return res.render("index", { status: false });

  const name = String(req.query.log);
  const page = Number(req.query.page);
  const defautCollection = collections[0];

  if (isNaN(page) || !collections.includes(name)) return res.redirect(`/?log=${defautCollection}&page=1`);
  const logs = await log.query(name, { page, perPage: 20 });
  return res.render("index", { logs, collections });
});

export default router;
