import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const redis = new Redis(process.env.REDIS_URL, {
  lazyConnect: false,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectTimeout: 10000,
  keepAlive: 10000,
  family: 4,
  retryStrategy(times) {
    return Math.min(times * 300, 3000);
  },
  tls: process.env.REDIS_URL?.startsWith("rediss://") ? {} : undefined,
});

let connected = false;

redis.on("connect", () => {
  if (!connected) {
    console.log("✅ Redis Connected");
    connected = true;
  }
});

redis.on("ready", () => {
  console.log("🚀 Redis Ready");
});

redis.on("error", (err) => {
  console.log("❌ Redis Error:", err?.message || err);
});

redis.on("close", () => {
  console.log("⚠️ Redis Connection Closed");
});

export default redis;