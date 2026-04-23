const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, "data", "attacks.json");

// create data folder if not exists
if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}

// create json file if not exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, "[]");
}

function readAttacks() {
  return JSON.parse(fs.readFileSync(dataFile));
}

function saveAttacks(attacks) {
  fs.writeFileSync(dataFile, JSON.stringify(attacks, null, 2));
}

function logAttack({ ip, route, attackType, severity }) {
  const attacks = readAttacks();

  const newAttack = {
    id: Date.now(),
    ip,
    route,
    attackType,
    severity,
    time: new Date().toISOString(),
  };

  attacks.unshift(newAttack);
  saveAttacks(attacks);
}

app.get("/api/attacks", (req, res) => {
  res.json(readAttacks());
});

app.get("/api/stats", (req, res) => {
  const attacks = readAttacks();

  res.json({
    totalAttacks: attacks.length,
    uniqueIPs: new Set(attacks.map(a => a.ip)).size,
    highSeverity: attacks.filter(a => a.severity === "high").length
  });
});

// trap routes
app.get("/trap/admin", (req, res) => {
  logAttack({
    ip: req.ip,
    route: "/trap/admin",
    attackType: "admin probe",
    severity: "medium"
  });

  res.status(403).json({ message: "Access denied" });
});

app.post("/trap/login", (req, res) => {
  logAttack({
    ip: req.ip,
    route: "/trap/login",
    attackType: "brute force",
    severity: "high"
  });

  res.status(401).json({ message: "Invalid login" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});