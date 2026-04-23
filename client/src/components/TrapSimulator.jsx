import { useState } from "react";

function TrapSimulator({ onAttackLogged }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const simulateLoginAttack = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/trap/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      setUsername("");
      setPassword("");

      if (onAttackLogged) {
        onAttackLogged();
      }
    } catch (err) {
      console.error("Trap simulator error:", err);
    }
  };

  return (
    <div className="section">
      <h2>Trap Simulator</h2>
      <p>Use this form to simulate a fake brute-force login attempt.</p>

      <form className="trap-form" onSubmit={simulateLoginAttack}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="simulate-btn">
          Simulate Login Attack
        </button>
      </form>
    </div>
  );
}

export default TrapSimulator;