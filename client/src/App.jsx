import { useEffect, useMemo, useState } from "react";
import "./index.css";
import Header from "./components/HeaderComponents";
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
  const [severityFilter, setSeverityFilter] = useState("all");

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

  const filteredAttacks = useMemo(() => {
    if (severityFilter === "all") return attacks;
    return attacks.filter((attack) => attack.severity === severityFilter);
  }, [attacks, severityFilter]);

  return (
    <div className="app">
      <Header />

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

      <div className="section">
        <h2>Filter Attacks</h2>
        <div className="filter-row">
          <button
            className={severityFilter === "all" ? "filter-btn active" : "filter-btn"}
            onClick={() => setSeverityFilter("all")}
          >
            All
          </button>

          <button
            className={severityFilter === "high" ? "filter-btn active" : "filter-btn"}
            onClick={() => setSeverityFilter("high")}
          >
            High
          </button>

          <button
            className={severityFilter === "medium" ? "filter-btn active" : "filter-btn"}
            onClick={() => setSeverityFilter("medium")}
          >
            Medium
          </button>

          <button
            className={severityFilter === "low" ? "filter-btn active" : "filter-btn"}
            onClick={() => setSeverityFilter("low")}
          >
            Low
          </button>
        </div>
      </div>

      <AttackTable attacks={filteredAttacks} />
    </div>
  );
}

export default App;