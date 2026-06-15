import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined. Add it to your .env file.");
}

const isRenderDatabase = process.env.DATABASE_URL.includes("render.com");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRenderDatabase ? { rejectUnauthorized: false } : false
});

export default pool;
