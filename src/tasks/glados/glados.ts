import checkin from "./checkin";
import { log } from "@/lib/mongodb";
import { sendEmail } from "@/lib/report";

export default async function glados(report: "fail" | "success" | "both" = "fail") {
  const result = await checkin();

  console.log(result.message);
  log.insert("glados", result.message);

  if (report === "both" || (report === "success" && result.status) || (report === "fail" && !result.status)) {
    sendEmail({ to: "MR-Addict@qq.com", subject: "Glados Checkin", text: result.message });
  }
}
