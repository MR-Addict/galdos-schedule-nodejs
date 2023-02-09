import schedule, { JobCallback } from "node-schedule";

export default function registerTask(name: string, rule: string, callback: JobCallback) {
  schedule.scheduleJob(name, { rule, tz: "Asia/Shanghai" }, callback);
}
