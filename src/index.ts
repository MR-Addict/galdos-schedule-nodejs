import "module-alias/register";

import { config } from "dotenv";
import schedule from "node-schedule";

import { checkin, sendEmail, writeLog } from "@/lib";

config();

async function main(report: "fail" | "success" | "both") {
  const result = await checkin();
  writeLog(result.message + "\n");

  if (report === "both") console.log(await sendEmail(result.message));
  else if (report === "success" && result.status) console.log(await sendEmail(result.message));
  else if (report === "fail" && !result.status) console.log(await sendEmail(result.message));
}

schedule.scheduleJob("0 6 * * *", async function () {
  main("fail");
});
