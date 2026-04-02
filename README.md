# Live Predictor

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

Full-stack football match prediction and tracking platform built with a Java/Spring backend and a React/TypeScript frontend.

## How I built it

- Built a complete full-stack product with clear separation of concerns between frontend and backend.
- Integrated live external sports data and normalized it into a reliable domain model.
- Implemented automated synchronization workflows to keep match data fresh without manual intervention.
- Used TypeScript and DTO-based API design to improve reliability and reduce runtime data issues.
- Structured for maintainability with component-based UI and service/repository layers in the backend.

## Product Overview

Live Predictor allows users to:

- Browse recent and upcoming matches
- View match details in responsive UI
- Consume continuously updated match data from the backend API
- Work with a system designed to scale from local development to production deployment

## Architecture

### Frontend

- React + TypeScript
- Component-driven UI architecture
- Hooks-based data fetching and state management
- Responsive layout for desktop and mobile

### Backend

- Spring Boot (Java 21)
- REST API for frontend communication
- Spring Data JPA + Hibernate for persistence
- Scheduled jobs for automatic data updates
- Jackson + Java records/DTOs for type-safe payload mapping

### Data Layer

- PostgreSQL relational database
- Indexed lookups and structured match storage

## Tech Stack

- Frontend: React, TypeScript, Vite, CSS
- Backend: Java 21, Spring Boot, Spring Data JPA, Hibernate
- Database: PostgreSQL
- Tooling: Gradle, npm

## Repository Structure

```text
live-predictor/
|- backend/   # Spring Boot API + data synchronization
|- frontend/  # React TypeScript client
```

## Local Setup

### Prerequisites

- Java 21
- Node.js 18+
- PostgreSQL

### 1) Start the backend

```powershell
cd backend
.\gradlew bootRun
```

### 2) Start the frontend

```powershell
cd frontend
npm install
npm run dev
```

## What Recruiters and Teams Can Expect

- Practical full-stack delivery skills
- Strong API and data modeling fundamentals
- Clean separation between UI, business logic, and persistence
- Production-minded choices: scheduling, integration boundaries, and typed contracts

.