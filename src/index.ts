import "module-alias/register";

import { config } from "dotenv";

import { glados } from "@/tasks/glados";
import { registerTask } from "@/lib/utils";

config();

registerTask("glados-checkin", "0 0 6 * * *", async () => await glados());
