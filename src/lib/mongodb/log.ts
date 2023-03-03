import { LogType } from "@/types";
import { formatDate, timeAgo } from "@/lib/utils";

import clientPromise from "./clientPromise";

async function insert(name: string, message: string) {
  try {
    const client = await clientPromise;
    const db = client.db("log");

    const result = await db.collection("glados").insertOne({ name, date: new Date().toISOString(), message });
    if (result.acknowledged) return { status: true, message: "Insert succeeded!" };
    else return { status: false, message: "Insert failed!" };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

async function read(name: string) {
  try {
    const client = await clientPromise;
    const db = client.db("log");

    const result: any[] = await db.collection("glados").find({ name }).sort({ date: -1 }).toArray();

    const data: LogType[] = result.map((log) => {
      const ago = timeAgo(log.date).firstNoneZero;
      return { ...log, _id: log._id.toString(), date: formatDate(log.date), timeAgo: `${ago.value} ${ago.key} ago` };
    });

    return { status: true, name, data };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

const log = { insert, read };

export default log;
