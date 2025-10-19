About

This project is a comprehensive dashboard training application inspired by enterprise SaaS platforms. It demonstrates modern frontend development practices with a focus on security, authentication, and user access management.

Key Highlights:

Enterprise-grade Architecture: Clean separation of concerns with components, stores, pages, and composables

Security-First Design: JWT authentication, role-based access control (RBAC), and MFA support

Modern UI/UX: Responsive design with light/dark theme support

Production-Ready Patterns: MSW for API mocking, comprehensive error handling, and TypeScript throughout

Features
🔐 Authentication & Security

JWT-based authentication with secure token storage

Role-based access control (Admin/User roles)

Multi-factor authentication (MFA) toggle

Secure session management with automatic cleanup

Protected routes with route guards

📊 Dashboard & Analytics

Real-time user authentication metrics

Login trends visualization (14-day history)

Security score calculation

Failed login rate monitoring

User growth tracking

Active sessions overview

👥 User Management (Admin)

User overview with status indicators

Role-based permission system

MFA enforcement tracking

User activity monitoring

Profile management with security settings

🎨 UI/UX Features

Dark Mode Support

Responsive Design: Mobile, tablet, desktop

Modern Design System: Consistent spacing, colors, typography

Loading States: Shimmer effects and spinners

Error Handling: User-friendly error messages

🛠️ Developer Experience

TypeScript: Full type safety

Component Library: Reusable base components

State Management: Pinia

API Mocking: MSW

Hot Module Replacement

Tech Stack
Frontend	State & Routing	Charts & UI	Dev Tools
Vue 3	Pinia	Chart.js	Vitest
TypeScript	Vue Router	vue-chartjs	MSW
Vite			ESLint/Prettier
Getting Started
Prerequisites

Node.js 18.x or higher

npm 9.x or higher (or yarn/pnpm)

Installation
git clone https://github.com/Blassenat/Dashboard.git
cd Dashboard
npm install
npm run dev


Open your browser: http://localhost:5173

Test Credentials
Email	Password	Role	Status
user1@example.com
	password1	Admin	Inactive
user2@example.com
	password2	User	Active
user3@example.com
	password3	Admin	Active
Project Structure
src/
├── components/
│   ├── AppHeader.vue
│   ├── AppSidebar.vue
│   ├── AppLayout.vue
│   ├── ThemeToggle.vue
│   ├── BaseInput.vue
│   ├── BaseButton.vue
│   └── BaseCheckbox.vue
├── pages/
│   ├── LoginView.vue
│   ├── HomeView.vue
│   ├── DashboardView.vue
│   ├── SettingsView.vue
│   ├── UserView.vue
│   └── LogsView.vue
├── stores/
│   ├── auth.ts
│   └── dashboard.ts
├── router/
│   └── index.ts
├── composables/
│   └── useTheme.ts
├── mocks/
│   ├── handlers/
│   │   ├── authHandlers.ts
│   │   ├── dashboardHandlers.ts
│   │   └── userHandlers.ts
│   └── data/
│       └── dashboardMock.ts
├── styles/
│   ├── variables.css
│   └── utilities.css
└── __tests__/
    └── App.spec.ts

Usage

Scripts

npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build locally
npm run test:unit      # Run unit tests
npm run test:unit:watch# Watch tests
npm run lint           # Run linter
npm run type-check     # TypeScript type check


Routes

Route	Purpose
/login	Login Page
/	Home Page
/dashboard	Analytics Dashboard (Admin)
/settings	User Settings
/user	User Management (Admin)
/logs	System Logs (Admin)
Testing
npm run test:unit
npm run test:unit:watch
npm run test:unit -- --coverage


Coverage
✅ App component mounting
✅ AppHeader component rendering
🚧 Store logic (planned)
🚧 Component interactions (planned)

Roadmap
Phase	Status	Features
1: Core Features	✅ Completed	JWT auth, RBAC, dashboard mock, settings page, dark mode, responsive design
2: Enhanced Features	🚧 In Progress	Replace MSW with real API, MFA OTP, refresh tokens, full user CRUD, log export, email notifications
3: Advanced Features	📋 Planned	2FA QR codes, IP restrictions, session timeout, audit trail, user invitations, bulk ops
4: Production Readiness	🎯 Future	Backend integration, DB persistence, test coverage >80%, E2E testing, performance, accessibility, i18n, Docker
Contributing

Fork the repo

Create branch: git checkout -b feature/AmazingFeature

Commit changes: git commit -m 'Add some AmazingFeature'

Push: git push origin feature/AmazingFeature

Open a Pull Request

Standards

Vue 3 Composition API best practices

TypeScript

Meaningful commit messages

Add tests for new features

Update docs

License

Educational & Portfolio Project

Author: Blassenat A.

GitHub: @Blassenat


Acknowledgments:

Inspired by enterprise SaaS platforms like HENNGE One

Modern dashboard designs

Built with modern web best practices