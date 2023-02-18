import checkin from "./checkin";
import { logPath } from "@/config";
import { writeLog } from "@/lib/log";
import { sendEmail } from "@/lib/report";
import path from "path";

export default async function glados(report: "fail" | "success" | "both" = "fail") {
  const result = await checkin();
  const date = new Date().toISOString();
  const filePath = path.join(logPath, "glados.csv");

  console.log(result.message);
  await writeLog(filePath, { date, message: result.message });

  if (report === "both" || (report === "success" && result.status) || (report === "fail" && !result.status)) {
    await sendEmail({ to: "MR-Addict@qq.com", subject: "Glados Checkin", text: result.message });
  }
}
