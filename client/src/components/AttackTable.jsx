function AttackTable({ attacks }) {
  return (
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
  );
}

export default AttackTable;