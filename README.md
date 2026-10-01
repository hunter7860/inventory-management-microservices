# Distributed Inventory Management System (IMS)

A full-stack, microservices-based enterprise inventory and asset tracking system.

## 🏗️ Architecture Overview

The system consists of three independent Spring Boot microservices and a React frontend:

- **Frontend:** React.js user interface communicating with the central orchestrator.
- **Inventory Management Service (Orchestrator):** Central service managing stock levels, transactions, and aggregating data from Vendor and Material services.
- **Material Service:** Manages material definitions, categories, and item metadata.
- **Vendor Service:** Handles vendor details, suppliers, and procurement tracking.

## 🛠️ Tech Stack

- **Backend:** Java 17+, Spring Boot, Spring Data JPA, Spring Web
- **Frontend:** React.js, JavaScript, HTML5, CSS3
- **Database:** MySQL
- **Build & Tools:** Maven, Git, Postman

## 🚀 Getting Started

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/hunter7860/inventory-management-microservices.git
\`\`\`

### 2. Backend Setup
Configure your MySQL credentials in each service's `application.properties`, then start each service:
- Vendor Service
- Material Service
- Inventory Management Service

### 3. Frontend Setup
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`
