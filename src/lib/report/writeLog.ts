import fs from "fs";

export default function writeLog(filename: string, log: string) {
  const path = "log/";
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
  fs.appendFileSync(path + filename, log);
}
