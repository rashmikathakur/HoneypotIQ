const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "honeypotiq.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS attacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    route TEXT NOT NULL,
    attackType TEXT NOT NULL,
    severity TEXT NOT NULL,
    payload TEXT,
    time TEXT NOT NULL
  )
`);

module.exports = db;