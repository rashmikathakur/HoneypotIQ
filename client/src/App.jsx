import { useEffect, useState } from "react";
import "./index.css";
import StatCard from "./components/StatCard";
import AttackTable from "./components/AttackTable";
import AttackChart from "./components/AttackChart";
import TrapSimulator from "./components/TrapSimulator";

function App() {
  const [stats, setStats] = useState({
    totalAttacks: 0,
    uniqueIPs: 0,
    highSeverity: 0,
    attackTypeData: [],
  });

  const [attacks, setAttacks] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));

    fetch("http://localhost:5000/api/attacks")
      .then((res) => res.json())
      .then((data) => setAttacks(data))
      .catch((err) => console.error("Attacks fetch error:", err));
  };

  const clearLogs = async () => {
    try {
      await fetch("http://localhost:5000/api/attacks", {
        method: "DELETE",
      });
      fetchData();
    } catch (err) {
      console.error("Clear logs error:", err);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1>HoneypotIQ</h1>
      <p>Fake Server Trap & Attack Visualizer</p>

      <div className="button-row">
        <button className="refresh-btn" onClick={fetchData}>
          Refresh Dashboard
        </button>
        <button className="clear-btn" onClick={clearLogs}>
          Clear Logs
        </button>
      </div>

      <div className="cards">
        <StatCard title="Total Attacks" value={stats.totalAttacks} />
        <StatCard title="Unique IPs" value={stats.uniqueIPs} />
        <StatCard title="High Severity" value={stats.highSeverity} />
      </div>

      <TrapSimulator onAttackLogged={fetchData} />
      <AttackChart stats={stats} />
      <AttackTable attacks={attacks} />
    </div>
  );
}

export default App;