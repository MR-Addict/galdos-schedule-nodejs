import fs from "fs";

export default function writeLog(filename: string, log: string) {
  fs.appendFileSync(filename, log);
}
