import schedule from "node-schedule";

export default function cancelJob(name: string) {
  return schedule.cancelJob(name);
}
