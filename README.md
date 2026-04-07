# 🛋️ GT Enterprises – Furniture E-commerce Platform

A **full-stack furniture e-commerce web application** built with a modern tech stack, offering a smooth, secure, and responsive shopping experience.

---

## 🚀 Overview

**GT Enterprises** is a high-performance online furniture store designed to deliver a seamless user experience.  
It combines a **React-based frontend** with a **Spring Boot backend**, ensuring scalability, security, and speed.

✨ Key highlights:
- Secure authentication using JWT  
- Integrated Stripe payment gateway  
- Automated email notifications  
- Responsive and modern UI  

---

## 🛠️ Tech Stack

### 🎨 Frontend
- ⚛️ React 19 (Hooks-based architecture)
- 🗂️ Redux Toolkit (state management)
- 🔀 React Router 7 (dynamic routing)
- 🌐 Axios (API communication)
- 🎨 Bootstrap 5 & Bootstrap Icons (UI styling)
- 💳 Stripe JS (payment integration)

---

### ⚙️ Backend
- ☕ Java 17 with Spring Boot 3
- 🗄️ Spring Data JPA (ORM)
- 🔐 Spring Security + JWT (authentication)
- 🐬 MySQL (Aiven Cloud / Local DB)
- 💳 Stripe API (backend payments)
- 📧 JavaMailSender (email services)
- 🌱 Dotenv Java (environment config)

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based login & registration
- Encrypted password storage (BCrypt)
- Stateless session management

### 🛋️ Product Management
- Dynamic furniture catalog
- Search and filter functionality

### 🛒 Shopping Experience
- Add/remove items from cart
- Persistent cart with real-time updates

### 💳 Payments
- Secure checkout using Stripe
- Fast and reliable transactions

### 📧 Notifications
- Order confirmation emails
- Password reset emails

### 📱 Responsive UI

## 📁 Project Structure
Furnit/
├── furniture-backend/ # Spring Boot Application
│ ├── src/main/java/ # Controllers, Services, Entities
│ ├── src/main/resources/ # Config files & templates
│ ├── .env # Backend environment variables
│ └── pom.xml # Maven dependencies
│
├── furniture-frontend/ # React Application
│ ├── src/ # Components, Redux, Services
│ ├── public/ # Static assets
│ ├── .env # Frontend environment variables
│ └── package.json # Node dependencies
│
└── README.md # Project documentation


## ⚙️ Setup & Installation

### 📌 Prerequisites
- ☕ Java 17+
- 🟢 Node.js 18+
- 🐬 MySQL Server (Local / Cloud)
- 📦 Maven

---

## 🚀 Deployment

This project is optimized for a hybrid cloud deployment: **Render** for the backend and **Vercel** for the frontend.

### 1️⃣ Backend (Render)
- **Service**: Web Service
- **Runtime**: Docker (using the provided `Dockerfile`)
- **Config**: Add all backend-specific variables to the Render "Environment" tab (`DB_URL`, `JWT_SECRET`, etc.).
- **URL**: Note your deployed backend URL (e.g., `https://your-app.onrender.com`).

### 2️⃣ Frontend (Vercel)
- **Framework**: Create React App
- **Root Directory**: `furniture-frontend`
- **Environment Variables**:
  - `REACT_APP_API_BASE_URL`: Your backend URL + `/api` (e.g., `https://your-app.onrender.com/api`).
  - `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe public key.
- **Rewrites**: Support for SPA routing is pre-configured in `vercel.json`.

## 📄 License

This project is developed to showcase my father's furniture business through a modern e-commerce platform.

👨‍💻 Author - Giri-@giridharyuvaraj07@gmail.com

✨ Developed with dedication by GT Enterprises