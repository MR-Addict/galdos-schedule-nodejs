import schedule from "node-schedule";

export default function getJobStatus(name?: string) {
  return schedule.scheduledJobs;
}
