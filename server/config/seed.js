import { readFile } from "node:fs/promises";
import pool from "./database.js";
import studySpots from "../data/spots.js";

const schemaUrl = new URL("./schema.sql", import.meta.url);

async function seedDatabase() {
  const client = await pool.connect();

  try {
    const schema = await readFile(schemaUrl, "utf8");

    await client.query("BEGIN");
    await client.query(schema);
    await client.query("DELETE FROM study_spots");

    const insertSpot = `
      INSERT INTO study_spots (
        id,
        name,
        image,
        description,
        location,
        noise_level,
        best_for,
        seating,
        hours,
        power_outlets
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;

    for (const spot of studySpots) {
      await client.query(insertSpot, [
        spot.id,
        spot.name,
        spot.image,
        spot.description,
        spot.location,
        spot.noiseLevel,
        spot.bestFor,
        spot.seating,
        spot.hours,
        spot.powerOutlets
      ]);
    }

    await client.query("COMMIT");
    console.log(`Seeded ${studySpots.length} study spots.`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to seed the database:", error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
