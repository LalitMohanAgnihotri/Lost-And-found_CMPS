import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  lazyConnect: false,
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  retryStrategy(times) {
    return Math.min(times * 200, 2000);
  },
  tls: process.env.REDIS_URL?.startsWith("rediss://") ? {} : undefined,
});

let logged = false;

redis.on("connect", () => {
  if (!logged) {
    console.log("✅ Redis Connected");
    logged = true;
  }
});

redis.on("ready", () => {
  console.log("🚀 Redis Ready");
});

redis.on("error", (err) => {
  console.log("❌ Redis Error:", err.message);
});

export default redis;