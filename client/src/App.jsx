import { useEffect, useState } from "react";
import "./index.css";

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
        <div className="card">
          <h3>Total Attacks</h3>
          <p>{stats.totalAttacks}</p>
        </div>

        <div className="card">
          <h3>Unique IPs</h3>
          <p>{stats.uniqueIPs}</p>
        </div>

        <div className="card">
          <h3>High Severity</h3>
          <p>{stats.highSeverity}</p>
        </div>
      </div>

      <div className="section">
        <h2>Recent Attacks</h2>
        <table>
          <thead>
            <tr>
              <th>IP</th>
              <th>Route</th>
              <th>Attack Type</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {attacks.length > 0 ? (
              attacks.map((attack) => (
                <tr key={attack.id}>
                  <td>{attack.ip}</td>
                  <td>{attack.route}</td>
                  <td>{attack.attackType}</td>
                  <td>{new Date(attack.time).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No attack data yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;