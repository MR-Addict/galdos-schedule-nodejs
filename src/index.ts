import "module-alias/register";

import { config } from "dotenv";
import schedule from "node-schedule";

import { glados } from "@/lib/glados";

config();

glados("fail");

schedule.scheduleJob("0 6 * * *", async () => await glados("fail"));
