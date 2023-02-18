import checkin from "./checkin";
import { sendEmail, writeLog } from "@/lib/report";

export default async function glados(report: "fail" | "success" | "both" = "fail") {
  const result = await checkin();
  console.log(result.message);
  writeLog("glados.csv", result.message + "\n");

  if (report === "both" || (report === "success" && result.status) || (report === "fail" && !result.status)) {
    await sendEmail({ to: "MR-Addict@qq.com", subject: "Glados Checkin", text: result.message });
  }
}
