import checkin from "./checkin";
import { writeLog, sendEmail } from "@/lib/utils";

export default async function glados(report: "fail" | "success" | "both") {
  const result = await checkin();
  writeLog("glados.txt", result.message + "\n");

  if (report === "both") console.log(await sendEmail(result.message));
  else if (report === "success" && result.status) console.log(await sendEmail(result.message));
  else if (report === "fail" && !result.status) console.log(await sendEmail(result.message));
}
