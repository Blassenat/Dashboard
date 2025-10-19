🔐 Dashboard Training Project

A modern, security-focused dashboard application built with Vue 3 and TypeScript, featuring authentication, role-based access control, and real-time monitoring capabilities.


Live Demo • Report Bug • Request Feature

📋 Table of Contents

About
Features
Tech Stack
Getting Started
Project Structure
Usage
Testing
Roadmap
Contributing
License


🎯 About
This project is a comprehensive dashboard training application inspired by enterprise SaaS platforms. It demonstrates modern frontend development practices with a focus on security, authentication, and user access management.
Key Highlights

Enterprise-grade Architecture: Clean separation of concerns with components, stores, pages, and composables
Security-First Design: JWT authentication, role-based access control (RBAC), and MFA support
Modern UI/UX: Responsive design with light/dark theme support
Production-Ready Patterns: MSW for API mocking, comprehensive error handling, and TypeScript throughout


✨ Features
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

Dark Mode Support: Full theme switching capability
Responsive Design: Mobile, tablet, and desktop optimized
Modern Design System: Consistent spacing, colors, and typography
Loading States: Shimmer effects and spinners
Error Handling: User-friendly error messages

🛠️ Developer Experience

TypeScript: Full type safety throughout the application
Component Library: Reusable base components (BaseInput, BaseButton, BaseCheckbox)
State Management: Centralized state with Pinia
API Mocking: MSW for realistic development experience
Hot Module Replacement: Instant feedback during development


🛠️ Tech Stack
Core Technologies

Vue 3 - Progressive JavaScript framework with Composition API
TypeScript - Type-safe JavaScript
Vite - Next-generation frontend tooling
Pinia - Intuitive state management

Routing & UI

Vue Router - Official router for Vue.js
Chart.js - Simple yet flexible JavaScript charting
vue-chartjs - Vue wrapper for Chart.js

Development Tools

Vitest - Blazing fast unit test framework
MSW - API mocking library
ESLint - Code linting
Prettier - Code formatting


🚀 Getting Started
Prerequisites

Node.js 18.x or higher
npm 9.x or higher (or yarn/pnpm)

Installation

Clone the repository

bash   git clone https://github.com/Blassenat/Dashboard.git
   cd Dashboard

Install dependencies

bash   npm install

Start development server

bash   npm run dev

Open your browser
Navigate to http://localhost:5173

Test Credentials
For demo purposes, use these credentials:
EmailPasswordRoleStatususer1@example.compassword1AdminInactiveuser2@example.compassword2UserActiveuser3@example.compassword3AdminActive

📁 Project Structure
src/
├── components/          # Reusable UI components
│   ├── AppHeader.vue
│   ├── AppSidebar.vue
│   ├── AppLayout.vue
│   ├── ThemeToggle.vue
│   ├── BaseInput.vue
│   ├── BaseButton.vue
│   └── BaseCheckbox.vue
├── pages/              # Route-level components
│   ├── LoginView.vue
│   ├── HomeView.vue
│   ├── DashboardView.vue
│   ├── SettingsView.vue
│   ├── UserView.vue
│   └── LogsView.vue
├── stores/             # Pinia state management
│   ├── auth.ts         # Authentication store
│   └── dashboard.ts    # Dashboard data store
├── router/             # Vue Router configuration
│   └── index.ts
├── composables/        # Reusable composition functions
│   └── useTheme.ts     # Theme switching logic
├── mocks/              # MSW API mocking
│   ├── handlers/
│   │   ├── authHandlers.ts
│   │   ├── dashboardHandlers.ts
│   │   └── userHandlers.ts
│   └── data/
│       └── dashboardMock.ts
├── styles/             # Global styles
│   ├── variables.css   # CSS custom properties
│   └── utilities.css   # Utility classes
└── __tests__/          # Unit tests
    └── App.spec.ts

💻 Usage
Available Scripts
bash# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run unit tests
npm run test:unit

# Run tests in watch mode
npm run test:unit:watch

# Run linter
npm run lint

# Type-check TypeScript
npm run type-check
Key Features by Route
/login - Login Page

Email/password authentication
Test credentials provided
Loading states and error handling
Automatic redirect after successful login

/ - Home Page

Welcome screen
Overview of features and technologies
Quick navigation to other sections

/dashboard - Analytics Dashboard (Admin only)

Real-time authentication metrics
Login trends chart (14 days)
Security score indicator
Failed login rate monitoring
Refresh capability

/settings - User Settings

Profile information management
MFA toggle
Account security settings
Real-time save with feedback

/user - User Management (Admin only)

User overview statistics
Recent users list
Role and status indicators
Export and add user actions (UI only)

/logs - System Logs (Admin only)

Recent activity log
Login attempts tracking
System health checks
Export functionality (UI only)


🧪 Testing
The project uses Vitest for unit testing with Vue Test Utils.
bash# Run all tests
npm run test:unit

# Run tests in watch mode
npm run test:unit:watch

# Run tests with coverage
npm run test:unit -- --coverage
Current Test Coverage

✅ App component mounting
✅ AppHeader component rendering
🚧 Store logic (planned)
🚧 Component interactions (planned)


🗺️ Roadmap
Phase 1: Core Features ✅ (Completed)

 Authentication system with JWT
 Role-based access control
 Dashboard with mock data
 User settings page
 Dark mode implementation
 Responsive design

Phase 2: Enhanced Features 🚧 (In Progress)

 Replace MSW with real backend API
 Implement actual MFA flow with OTP
 Add persistent login with refresh tokens
 Complete user management CRUD operations
 Implement log export functionality (CSV/JSON)
 Add email notifications

Phase 3: Advanced Features 📋 (Planned)

 Two-factor authentication (2FA) with QR codes
 IP-based access restrictions
 Session management with timeout
 Audit trail with detailed logs
 Advanced security policies
 User invitation system
 Bulk user operations

Phase 4: Production Readiness 🎯 (Future)

 Backend integration with REST API
 Database persistence (PostgreSQL)
 Comprehensive test coverage (>80%)
 E2E testing with Playwright
 Performance optimization
 Accessibility improvements (WCAG 2.1 AA)
 Internationalization (i18n)
 Docker containerization


🤝 Contributing
Contributions are welcome! This is a learning project, so feel free to:

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

Coding Standards

Follow Vue 3 Composition API best practices
Use TypeScript for type safety
Write meaningful commit messages
Add tests for new features
Update documentation as needed


📝 License
This project is created for educational and portfolio purposes.

👤 Author
Your Name

GitHub: @Blassenat
LinkedIn: Your LinkedIn


🙏 Acknowledgments

Inspired by enterprise SaaS platforms like HENNGE One
Design inspiration from modern dashboard applications
Built with modern web development best practices




⭐ Star this repository if you find it helpful!
Made with ❤️ using Vue 3 and TypeScript
