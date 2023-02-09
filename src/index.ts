import "module-alias/register";

import { config } from "dotenv";

import { glados } from "@/lib/glados";
import { registerJob } from "@/lib/schedule";

config();

registerJob({ name: "glados", rule: "0 0 6 * * *" }, async () => await glados("fail"));
