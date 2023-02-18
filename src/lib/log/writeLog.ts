import fs from "fs";
import { writeToStream } from "fast-csv";

import { logPath } from "@/config";
import { LogType } from "@/types";

async function writeCsv(path: string, log: LogType, headers: boolean) {
  await new Promise((resolve, reject) => {
    const readableStream = fs.createWriteStream(path, { flags: "a" });
    writeToStream(readableStream, [log], { headers, quote: false, includeEndRowDelimiter: true })
      .on("error", () => reject(false))
      .on("end", () => resolve(true));
  });
}

export default async function writeLog(path: string, log: LogType) {
  if (!fs.existsSync(logPath)) fs.mkdirSync(logPath, { recursive: true });

  if (fs.existsSync(path)) await writeCsv(path, log, false);
  else await writeCsv(path, log, true);
}
