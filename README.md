# HoneypotIQ 🪤

HoneypotIQ is a full-stack cybersecurity project that simulates fake vulnerable server endpoints (honeypots) to capture and analyze malicious activity.

## 🚀 Features

- Fake trap endpoints (admin, login, config, database, env)
- Attack logging system
- SQLite database integration
- Dashboard with charts and analytics
- Severity-based filtering
- Search by IP and route
- Auto-refresh dashboard
- Trap simulator for testing
- Clear logs functionality

## 🛠 Tech Stack

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: SQLite (better-sqlite3)

## ▶️ How to Run

### Backend
cd server
npm install
npm run dev

### Frontend
cd client
npm install
npm run dev


Then open: http://localhost:5173

## 📊 Architecture

User → Trap Endpoints → Express Backend → SQLite Database → React Dashboard

## 🎯 Purpose

This project demonstrates how honeypots can be used to monitor and analyze malicious activity in a controlled environment.

## Commit it:
git add README.md

git commit -m "Add project README"

git push
