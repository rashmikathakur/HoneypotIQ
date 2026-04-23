const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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
  res.json(attacks);
});

app.get("/api/stats", (req, res) => {
  const attacks = db.prepare("SELECT * FROM attacks").all();

  const totalAttacks = attacks.length;
  const uniqueIPs = new Set(attacks.map((a) => a.ip)).size;
  const highSeverity = attacks.filter((a) => a.severity === "high").length;

  const attackTypeCounts = {};
  attacks.forEach((attack) => {
    attackTypeCounts[attack.attackType] =
      (attackTypeCounts[attack.attackType] || 0) + 1;
  });

  const attackTypeData = Object.keys(attackTypeCounts).map((key) => ({
    name: key,
    value: attackTypeCounts[key],
  }));

  res.json({
    totalAttacks,
    uniqueIPs,
    highSeverity,
    attackTypeData,
  });
});

app.get("/trap/admin", (req, res) => {
  logAttack({
    ip: req.ip,
    route: "/trap/admin",
    attackType: "admin probe",
    severity: "medium",
  });

  res.status(403).json({ message: "Access denied" });
});

app.post("/trap/login", (req, res) => {
  const { username, password } = req.body;

  logAttack({
    ip: req.ip,
    route: "/trap/login",
    attackType: "brute force",
    severity: "high",
    payload: { username, password },
  });

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