import { useEffect, useState } from "react";
import "./index.css";
import StatCard from "./components/StatCard";
import AttackTable from "./components/AttackTable";
import AttackChart from "./components/AttackChart";

function App() {
  const [stats, setStats] = useState({
    totalAttacks: 0,
    uniqueIPs: 0,
    highSeverity: 0,
  });

  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));

    fetch("http://localhost:5000/api/attacks")
      .then((res) => res.json())
      .then((data) => setAttacks(data))
      .catch((err) => console.error("Attacks fetch error:", err));
  }, []);

  return (
    <div className="app">
      <h1>HoneypotIQ</h1>
      <p>Fake Server Trap & Attack Visualizer</p>

      <div className="cards">
        <StatCard title="Total Attacks" value={stats.totalAttacks} />
        <StatCard title="Unique IPs" value={stats.uniqueIPs} />
        <StatCard title="High Severity" value={stats.highSeverity} />
      </div>

      <AttackChart stats={stats} />
      <AttackTable attacks={attacks} />
    </div>
  );
}

export default App;