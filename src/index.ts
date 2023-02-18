import "./loadEnv";
import "module-alias/register";

import www from "@/www";
import { glados } from "@/tasks/glados";
import { registerTask } from "@/lib/utils";

registerTask("glados-checkin", "0 0 6 * * *", async () => await glados());

www.listen(3000, () => console.log("Listening on http://localhost:3000"));
