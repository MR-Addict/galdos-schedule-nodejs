import schedule, { JobCallback } from "node-schedule";

import { timeZone } from "@/config";

export default function registerTask(name: string, rule: string, callback: JobCallback) {
  schedule.scheduleJob(name, { rule, tz: timeZone }, callback);
}
