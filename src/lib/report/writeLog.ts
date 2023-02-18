import fs from "fs";
import path from "path";

import { logPath } from "@/config";

export default function writeLog(filename: string, log: string) {
  if (!fs.existsSync(logPath)) fs.mkdirSync(logPath, { recursive: true });
  fs.appendFileSync(path.join(logPath, filename), log);
}
