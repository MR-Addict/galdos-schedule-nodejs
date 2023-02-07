import fs from "fs";

export default function writeLog(path: string, filename: string, log: string) {
  fs.mkdirSync(path, { recursive: true });
  fs.appendFileSync(path + filename, log);
}
