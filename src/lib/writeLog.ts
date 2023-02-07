import fs from "fs";

export default function writeLog(message: string) {
  fs.appendFileSync("log.txt", message);
}
