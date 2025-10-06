Dashboard Project (HENNGE One Inspired)
🚀 Project Overview

This is a personal project inspired by HENNGE One, aiming to create a mini SaaS platform for access management and security dashboards.
It is built with Vue 3, TypeScript, and Pinia for state management.

The project currently supports:

User authentication (login with JWT tokens)

Role-based access control (User / Admin)

A dashboard showing mock security and usage statistics

Simulated Multi-Factor Authentication (MFA) flow

The goal is to demonstrate frontend architecture, state management, and security-focused UI similar to enterprise SaaS applications.

🛠️ Tech Stack

Frontend: Vue 3, TypeScript, Vite

State Management: Pinia

Routing: Vue Router

Testing: Vitest

Linting: ESLint / Prettier

Charts / Dashboard: (to be added, e.g., Chart.js, ApexCharts)

🎯 Features
For Users

Login with JWT token

Dashboard with personal connection history and MFA status

Profile page to manage security settings (change password, toggle MFA)

For Admins

Dashboard showing organization-wide stats:

Active users over 30 days

Successful / failed login attempts

MFA adoption rate

Active sessions

User management (mocked): activate/deactivate users, enforce MFA

Audit logs (mocked): track login attempts, device usage

Upcoming Features

Replace mock data with real backend API

Full MFA implementation with OTP generation

Persistent login with refresh tokens

Enhanced security policies (IP restrictions, session expiration)

Exportable logs (CSV / JSON)

Improved UI / responsive dashboard

📦 Installation
# Clone the repo
git clone https://github.com/Blassenat/Dashboard.git

# Navigate to the project folder
cd Dashboard

# Install dependencies
npm install

# Start the development server
npm run dev

🧭 Roadmap

Complete the backend simulation for API calls

Implement MFA flow fully

Add user management page for Admins

Integrate charts and analytics for dashboard

Implement persistent login with refresh tokens

Add real backend with database and secure endpoints

Polish UI / responsive design

Add tests for all critical functionalities

📌 Notes

This is a personal project for learning and portfolio purposes.

Inspired by enterprise SaaS platforms focusing on identity, access management, and security dashboards.

## Test Credentials

For demo purposes, you can login with:
- Email: `user1@example.com`
- Password: `password1`
- Role: admin

Or:
- Email: `user2@example.com`
- Password: `password2`
- Role: user