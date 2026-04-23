import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function AttackChart({ stats }) {
  const chartData = [
    { name: "Total", value: stats.totalAttacks || 0 },
    { name: "Unique IPs", value: stats.uniqueIPs || 0 },
    { name: "High Severity", value: stats.highSeverity || 0 },
  ];

  return (
    <div className="section">
      <h2>Attack Overview</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AttackChart;