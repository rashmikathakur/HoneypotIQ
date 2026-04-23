function AttackTable({ attacks }) {
  const getSeverityClass = (severity) => {
    if (severity === "high") return "badge badge-high";
    if (severity === "medium") return "badge badge-medium";
    return "badge badge-low";
  };

  return (
    <div className="section">
      <h2>Recent Attacks</h2>
      <table>
        <thead>
          <tr>
            <th>IP</th>
            <th>Route</th>
            <th>Attack Type</th>
            <th>Severity</th>
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
                <td>
                  <span className={getSeverityClass(attack.severity)}>
                    {attack.severity}
                  </span>
                </td>
                <td>{new Date(attack.time).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No attack data yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttackTable;