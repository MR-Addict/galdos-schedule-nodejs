import "module-alias/register";

import { config } from "dotenv";
import schedule from "node-schedule";

import { glados } from "@/lib/glados";

config();

schedule.scheduleJob({ hour: 6, minute: 0, tz: "Asia/Shanghai" }, async () => await glados("fail"));
