import { log } from "@/lib/mongodb";
import { sendEmail } from "@/lib/report";

async function checkin() {
  const GLADOS_COOKIE = process.env.GLADOS_COOKIE;
  const checkinURL = "https://glados.rocks/api/user/checkin";
  if (!GLADOS_COOKIE) throw new Error("Please add GLADOS_COOKIE to env");

  try {
    const res = await fetch(checkinURL, {
      method: "POST",
      body: JSON.stringify({ token: "glados.network" }),
      headers: { Cookie: GLADOS_COOKIE, "Content-Type": "application/json" },
    });
    if (!res.ok) return { status: false, message: "Something went wrong while checkin!" };

    const result = await res.json();
    if (result.code !== 0 && result.code !== 1) return { status: false, message: "Checkin failed!" };

    const leftDays = parseInt(result.list[0].balance);
    const message = `You got ${leftDays} days left.`;

    return { status: true, message };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Something went wrong while checkin!" };
  }
}

export default async function glados(report: "fail" | "success" | "both" = "fail") {
  const result = await checkin();

  console.log(result.message);
  log.insert("glados", { date: new Date().toISOString(), message: result.message });

  if (report === "both" || (report === "success" && result.status) || (report === "fail" && !result.status)) {
    sendEmail({ to: "MR-Addict@qq.com", subject: "Glados Checkin", text: result.message });
  }
}
