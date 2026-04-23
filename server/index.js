const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const fs = require("fs");
const path = require("path");
=======
const db = require("./db");
>>>>>>> frontend-dashboard

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
const dataFile = path.join(__dirname, "data", "attacks.json");

function readAttacks() {
  const data = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(data);
}

function saveAttacks(attacks) {
  fs.writeFileSync(dataFile, JSON.stringify(attacks, null, 2));
}

function logAttack({ ip, route, attackType, severity, payload = null }) {
  const attacks = readAttacks();

  const newAttack = {
    id: Date.now(),
    ip,
    route,
    attackType,
    severity,
    payload,
    time: new Date().toISOString(),
  };

  attacks.unshift(newAttack);
  saveAttacks(attacks);

  return newAttack;
}

app.get("/", (req, res) => {
  res.send("HoneypotIQ backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is healthy",
  });
});

app.get("/api/attacks", (req, res) => {
  const attacks = readAttacks();
=======
function logAttack({ ip, route, attackType, severity, payload = null }) {
  const cleanIP = ip.replace("::ffff:", "");

  const stmt = db.prepare(`
    INSERT INTO attacks (ip, route, attackType, severity, payload, time)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    cleanIP,
    route,
    attackType,
    severity,
    payload ? JSON.stringify(payload) : null,
    new Date().toISOString()
  );
}

app.get("/api/attacks", (req, res) => {
  const attacks = db.prepare("SELECT * FROM attacks ORDER BY id DESC").all();
>>>>>>> frontend-dashboard
  res.json(attacks);
});

app.get("/api/stats", (req, res) => {
<<<<<<< HEAD
  const attacks = readAttacks();
=======
  const attacks = db.prepare("SELECT * FROM attacks").all();
>>>>>>> frontend-dashboard

  const totalAttacks = attacks.length;
  const uniqueIPs = new Set(attacks.map((a) => a.ip)).size;
  const highSeverity = attacks.filter((a) => a.severity === "high").length;

<<<<<<< HEAD
=======
  const attackTypeCounts = {};
  attacks.forEach((attack) => {
    attackTypeCounts[attack.attackType] =
      (attackTypeCounts[attack.attackType] || 0) + 1;
  });

  const attackTypeData = Object.keys(attackTypeCounts).map((key) => ({
    name: key,
    value: attackTypeCounts[key],
  }));

>>>>>>> frontend-dashboard
  res.json({
    totalAttacks,
    uniqueIPs,
    highSeverity,
<<<<<<< HEAD
=======
    attackTypeData,
>>>>>>> frontend-dashboard
  });
});

app.get("/trap/admin", (req, res) => {
  logAttack({
    ip: req.ip,
    route: "/trap/admin",
    attackType: "admin probe",
    severity: "medium",
  });

<<<<<<< HEAD
  res.status(403).json({
    message: "Access denied",
  });
=======
  res.status(403).json({ message: "Access denied" });
>>>>>>> frontend-dashboard
});

app.post("/trap/login", (req, res) => {
  const { username, password } = req.body;

  logAttack({
    ip: req.ip,
    route: "/trap/login",
<<<<<<< HEAD
    attackType: "brute force attempt",
=======
    attackType: "brute force",
>>>>>>> frontend-dashboard
    severity: "high",
    payload: { username, password },
  });

<<<<<<< HEAD
  res.status(401).json({
    message: "Invalid login credentials",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
=======
  res.status(401).json({ message: "Invalid login" });
});

app.get("/trap/config", (req, res) => {
  logAttack({
    ip: req.ip,
    route: "/trap/config",
    attackType: "config scan",
    severity: "medium",
  });

  res.status(404).json({ message: "Config not found" });
});

app.get("/trap/database", (req, res) => {
  logAttack({
    ip: req.ip,
    route: "/trap/database",
    attackType: "database probe",
    severity: "high",
  });

  res.status(403).json({ message: "Database access denied" });
});

app.get("/trap/env", (req, res) => {
  logAttack({
    ip: req.ip,
    route: "/trap/env",
    attackType: ".env scan",
    severity: "high",
  });

  res.status(404).json({ message: ".env file not found" });
});

app.listen(PORT, () => {
  console.log(`🪤 HoneypotIQ running at http://localhost:${PORT}`);
});
app.delete("/api/attacks", (req, res) => {
  db.prepare("DELETE FROM attacks").run();
  res.json({ message: "All attack logs cleared" });
>>>>>>> frontend-dashboard
});