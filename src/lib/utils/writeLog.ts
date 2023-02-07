import fs from "fs";

export default function writeLog(filename: string, log: string) {
  fs.mkdirSync("log", { recursive: true });
  fs.appendFileSync("log/" + filename, log);
}
