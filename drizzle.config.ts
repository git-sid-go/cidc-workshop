import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./db/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  out: "./drizzle",
});
