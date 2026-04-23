const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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
  res.json(attacks);
});

app.get("/api/stats", (req, res) => {
  const attacks = readAttacks();

  const totalAttacks = attacks.length;
  const uniqueIPs = new Set(attacks.map((a) => a.ip)).size;
  const highSeverity = attacks.filter((a) => a.severity === "high").length;

  res.json({
    totalAttacks,
    uniqueIPs,
    highSeverity,
  });
});

app.get("/trap/admin", (req, res) => {
  logAttack({
    ip: req.ip,
    route: "/trap/admin",
    attackType: "admin probe",
    severity: "medium",
  });

  res.status(403).json({
    message: "Access denied",
  });
});

app.post("/trap/login", (req, res) => {
  const { username, password } = req.body;

  logAttack({
    ip: req.ip,
    route: "/trap/login",
    attackType: "brute force attempt",
    severity: "high",
    payload: { username, password },
  });

  res.status(401).json({
    message: "Invalid login credentials",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});