import fs from "fs";
import path from "path";

import { logPath } from "@/config";

function readLogs() {
  const logDir = path.join(process.cwd(), logPath);
  const fileNames = fs.readdirSync(logDir);

  return fileNames.map((fileName) => {
    const filePath = path.join(logDir, fileName);
    const rawLog = fs.readFileSync(filePath, { encoding: "utf-8" });
    const data = rawLog
      .split("\n")
      .filter((item) => item !== "")
      .reverse();

    return { name: fileName.replace(".txt", ""), data };
  });
}

export default readLogs;
