import { LogType } from "@/types";
import { formatDate, timeAgo } from "@/lib/utils";

import clientPromise from "./clientPromise";

async function collectios() {
  try {
    const client = await clientPromise;
    const db = client.db("log");
    const collections = await db.listCollections().toArray();
    return {
      status: true,
      data: collections.map((collection) => collection.name),
    };
  } catch (error) {
    return { status: false, message: "Cannot establish connection with mongodb!" };
  }
}

async function insert(collection: string, payload: { [key: string]: string }) {
  try {
    const client = await clientPromise;
    const db = client.db("log");

    const result = await db.collection(collection).insertOne(payload);
    if (result.acknowledged) return { status: true, message: "Insert succeeded!" };
    else return { status: false, message: "Insert failed!" };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

async function query(collection: string, pagination: { page: number; perPage: number }) {
  try {
    const client = await clientPromise;
    const Log = client.db("log").collection(collection);

    const totalCount = await Log.countDocuments();
    const totalPages = Math.ceil(totalCount / pagination.perPage);
    const result: any[] = await Log.find()
      .sort({ date: -1 })
      .skip(pagination.perPage * pagination.page - pagination.perPage)
      .limit(pagination.perPage)
      .toArray();

    const data: LogType[] = result.map((log) => {
      const ago = timeAgo(log.date).timeago;
      return { ...log, _id: log._id.toString(), date: formatDate(log.date), timeAgo: `${ago.value}${ago.key} ago` };
    });

    return {
      status: true,
      collection: collection,
      pagination: { count: data.length, totalCount: totalCount, currentPage: pagination.page, totalPages: totalPages },
      data,
    };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

const log = { insert, query, collectios };

export default log;
