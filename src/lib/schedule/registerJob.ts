import schedule from "node-schedule";
import { JobCallback } from "node-schedule";

export default function registerJob(options: { name: string; rule: string; tz?: string }, callback: JobCallback) {
  schedule.scheduleJob(options.name, { rule: options.rule, tz: options.tz || "Asia/Shanghai" }, callback);
}
