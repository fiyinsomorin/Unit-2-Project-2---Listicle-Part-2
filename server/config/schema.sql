CREATE TABLE IF NOT EXISTS study_spots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  noise_level TEXT NOT NULL,
  best_for TEXT NOT NULL,
  seating TEXT NOT NULL,
  hours TEXT NOT NULL,
  power_outlets TEXT NOT NULL
);
