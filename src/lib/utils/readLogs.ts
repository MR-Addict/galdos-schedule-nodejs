import fs from "fs";
import path from "path";
import { parseStream } from "fast-csv";

import { LogType } from "@/types";
import { logPath } from "@/config";
import { formatDate, timeAgo } from "@/lib/utils";

async function parseCsv(path: string) {
  const data: LogType[] = await new Promise((resolve, reject) => {
    const data: LogType[] = [];
    const readableStream = fs.createReadStream(path);

    parseStream(readableStream, { headers: true })
      .on("error", reject)
      .on("data", (row) => {
        const formatedDate = formatDate(row.date);
        const ago = timeAgo(row.date).firstNoneZero;
        data.push({ ...row, date: formatedDate, timeAgo: `${ago.value} ${ago.key} ago` });
      })
      .on("end", () => resolve(data));
  });
  return data.reverse();
}

async function readLogs() {
  const fileNames = fs.readdirSync(logPath);
  const data: { name: string; data: LogType[] }[] = [];

  for (let fileName of fileNames) {
    const filePath = path.join(logPath, fileName);
    const logs = await parseCsv(filePath);
    data.push({ name: fileName.replace(".csv", ""), data: logs });
  }
  return data;
}

export default readLogs;
