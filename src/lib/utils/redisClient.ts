import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) throw new Error("Please add redis url to env.");

const redisClient = createClient({ url: REDIS_URL });

(async () => {
  await redisClient.connect();
})();

redisClient.on("error", () => console.log("Redis Client Error"));
redisClient.on("ready", () => console.log("Redis Client Connected!"));

export default redisClient;
