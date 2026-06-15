import express from "express";
import pool from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM study_spots ORDER BY name");
    res.json(result.rows);
  } catch (error) {
    console.error("Failed to retrieve study spots:", error);
    res.status(500).json({ error: "Unable to retrieve study spots." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM study_spots WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Study spot not found." });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to retrieve study spot:", error);
    res.status(500).json({ error: "Unable to retrieve the study spot." });
  }
});

export default router;
