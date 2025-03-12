# Project Summary

The Lato Barber Shop Management System is an innovative web-based platform designed to modernize and streamline barbershop operations. By digitizing tasks such as appointment management, service tracking, and business analytics, the system significantly enhances the overall customer experience. It empowers barbers and administrators to efficiently manage both walk-in and online appointments, leading to improved customer interaction, retention, and satisfaction. The platform delivers tools for business analytics, enabling owners to make informed decisions based on detailed reports of performance metrics.

# Project Module Description

## Functional Modules

1. **Authentication**
   - Enables login and registration for users through a secure authentication process.
   - Supports both email and username for login, with role-based access control to safeguard sensitive features.

2. **Dashboard**
   - Provides an overview of daily operations with quick access to statistics and recent activities.
   - Serves as a central hub for users to manage appointments and view performance metrics.

3. **Calendar Management**
   - Offers a detailed view of appointments in a monthly calendar format.
   - Supports features for manual booking, rescheduling, and cancellation of appointments.

4. **Service Management**
   - Includes CRUD (Create, Read, Update, Delete) functionalities for managing different barber services.
   - Allows setting and modifying service pricing, duration, and status.

5. **Client Management**
   - Tools for managing client profiles and history.
   - Includes functionalities to track appointment history and handle client interactions.

6. **Reporting and Analytics**
   - Generates detailed reports on appointment statistics and financial performance.
   - Provides visualization tools to help owners make informed business decisions.

7. **Real-time Updates**
   - Integrates WebSocket technology for sending and receiving real-time notifications about bookings and changes.

# Directory Tree

```plaintext
/data/chats/558dvd/workspace
+-- api_endpoints.md
+-- backend
|   +-- package-lock.json
|   +-- package.json
|   +-- prisma
|   |   +-- dev.db
|   |   +-- dev.db-journal
|   |   +-- migrations
|   |   |   +-- 20250311140527_init
|   |   |   |   +-- migration.sql
|   |   |   +-- 20250311141256_add_username
|   |   |   |   +-- migration.sql
|   |   |   +-- migration_lock.toml
|   |   +-- schema.prisma
|   +-- src
|       +-- config
|       |   +-- database.js
|       |   +-- logger.js
|       +-- index.js
|       +-- middleware
|       |   +-- auth.js
|       +-- routes
|       |   +-- appointments.js
|       |   +-- auth.js
|       |   +-- index.js
|       |   +-- services.js
|       +-- services
|       |   +-- appointment.service.js
|       |   +-- auth.service.js
|       |   +-- service.service.js
|       +-- websocket
|           +-- index.js
+-- docs
|   +-- backend_design.md
|   +-- backend_prd.md
|   +-- prd.md
+-- lato_barber_shop_class_diagram.mermaid
+-- lato_barber_shop_sequence_diagram.mermaid
+-- lato_barber_shop_system_design.md
+-- react_template
    +-- README.md
    +-- WIKI.md
    +-- eslint.config.js
    +-- index.html
    +-- package.json
    +-- postcss.config.js
    +-- public
    |   +-- assets
    |   |   +-- images
    |   +-- data
    |       +-- example.json
    +-- src
    |   +-- App.jsx
    |   +-- components
    |   |   +-- auth
    |   |   |   +-- LoginForm.jsx
    |   |   |   +-- RegisterForm.jsx
    |   |   +-- calendar
    |   |   |   +-- AppointmentForm.jsx
    |   |   |   +-- Calendar.jsx
    |   |   +-- clients
    |   |   |   +-- ClientList.jsx
    |   |   |   +-- ClientSettings.jsx
    |   |   +-- dashboard
    |   |   |   +-- AppointmentSummary.jsx
    |   |   |   +-- DailyStats.jsx
    |   |   |   +-- DashboardLayout.jsx
    |   |   +-- services
    |   |       +-- ServiceForm.jsx
    |   |       +-- ServiceList.jsx
    |   +-- index.css
    |   +-- main.jsx
    |   +-- pages
    |   |   +-- Calendar.jsx
    |   |   +-- Clients.jsx
    |   |   +-- Dashboard.jsx
    |   |   +-- Home.jsx
    |   |   +-- Reports.jsx
    |   |   +-- Services.jsx
    |   +-- utils
    |       +-- api.js
    |       +-- auth.js
    +-- tailwind.config.js
    +-- template_config.json
    +-- vite.config.js
```

# File Description Inventory

- **api_endpoints.md**: Documentation of the RESTful API endpoints used in the system.
- **backend/**: Contains the backend implementation including routes, services, and database configuration.
- **prisma/schema.prisma**: Defines the PostgreSQL data model for the application using Prisma.
- **src/index.js**: Main file where the Express application and WebSocket server are initialized.
- **src/config/**: Contains configuration files including database connection and logging setup.
- **src/routes/**: Contains the API routes for authentication, appointment management, and service handling.
- **src/services/**: Contains business logic specific to services like user registration, login, and appointment handling.
- **src/websocket/**: Implements WebSocket functionality for real-time event handling.

# Technology Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js with Express
- **Database**: SQLite with Prisma (formerly PostgreSQL)
- **Real-time Communication**: WebSockets
- **Authentication**: JWT (JSON Web Tokens)
- **UI Libraries**: React Router for navigation

# Usage

## Installation Instructions

1. Navigate to the backend directory and install dependencies:
   ```bash
   npm install
   ```

2. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

4. Navigate to the frontend directory and install dependencies:
   ```bash
   pnpm install
   ```

5. Run the development server:
   ```bash
   pnpm run dev
   ```

## Building the Application

To build the application for production, use the command for the frontend:
```bash
pnpm run build
```

## Running Lint Checks

To check the code for linting issues, run:
```bash
pnpm run lint
```


# INSTRUCTION
- Project Path:`/data/chats/558dvd/workspace/react_template`
- You can search for the file path in the 'Directory Tree';
- After modifying the project files, if this project can be previewed, then you need to reinstall dependencies, restart service and preview;
