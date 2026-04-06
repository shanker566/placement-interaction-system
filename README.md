# PlacementPortal (Placement Interaction System)

A comprehensive, next-generation platform designed to streamline campus placements by seamlessly connecting Students, Employers, Placement Officers, and Administrators.

---

## 🚀 Overview

PlacementPortal digitizes the entire placement lifecycle. It replaces traditional excel-sheet-based placement management with an intuitive, real-time, and role-based application. Students can effortlessly apply for jobs, employers can manage their candidate pipelines, and colleges gain full visibility into placement statistics through powerful analytics.

---

## 🛠️ Tech Stack

This project is built using **React, Spring Boot, and MySQL**, augmented with modern tooling for a premium user experience:

### **Frontend**

- **React.js**: Core component library (built with Vite for extreme performance).
- **Tailwind CSS**: Atomic CSS framework for highly responsive, custom-designed interfaces.
- **Framer Motion**: State-of-the-art animation library for fluid page transitions and micro-interactions.
- **Recharts**: For rendering beautiful, responsive data visualization charts on the dashboards.
- **React Router v6**: For robust protected routing and nested layouts.
- **Lucide React**: Crisp, customizable SVG icon set.
- **Axios**: Promised-based HTTP client for API communication.

### **Backend**

- **Java & Spring Boot**: Robust, enterprise-grade framework for building the RESTful API.
- **MySQL & Spring Data JPA**: Relational database with automated ORM for structured data modeling.
- **Spring Security & JWT**: Secure, stateless user authentication, password hashing (BCrypt), and role-based authorization.
- **Spring Mail**: For robust email delivery, including OTP (One-Time Password) verification during registration.
- **Spring Web Multipart**: Built-in support for handling `multipart/form-data`, ensuring smooth and secure resume (PDF/DOC) uploads.

---

## ✨ Key Features

- **Global Dark/Light Mode**: A deeply integrated, flicker-free theme system with a bespoke "lamp-style" toggle.
- **Real-Time Application Tracking**: Students can track their application state (Applied, Shortlisted, Interviewed, Hired) in real-time.
- **Advanced Resume Management**: Secure uploading, viewing, and management of student resumes.
- **OTP Email Verification**: Robust security ensuring all registered users verify their email addresses.
- **Dynamic Dashboards**: Context-aware UI that morphs entirely based on the user's role.
- **Data Analytics & Reporting**: Rich graphs displaying placement success rates, employer engagement, and student performance.
- **Responsive Design**: Flawlessly adapts from 4K desktop monitors down to mobile devices.

---

## � User Roles & Capabilities

The platform defines four distinct user personas:

### 1. 🎓 Student

- **Profile Building**: Create a comprehensive academic and professional profile.
- **Job Discovery**: Browse active job postings tailored to their qualifications.
- **One-Click Apply**: Instantly apply to companies and track application status.
- **Resume Upload**: Maintain an up-to-date resume for employers to view.

### 2. 🏢 Employer

- **Job Management**: Post, edit, and close job vacancies.
- **Applicant Tracking System (ATS)**: View incoming applications, review resumes, and change candidate statuses.
- **Hiring Analytics**: Gain insights into profile views, click rates, and application conversions.

### 3. 🛡️ Placement Officer

- **Holistic Oversight**: Monitor the entire college's placement drive.
- **Student Analytics**: Track how many students are placed vs. unplaced.
- **Reports Generation**: Export detailed placement data for college administration.

### 4. ⚙️ System Admin

- **User Management**: Approve, restrict, or modify user accounts.
- **Platform Analytics**: View system-wide health and usage statistics.

---

## ⚙️ Installation & Local Setup

### Prerequisites

- **Java Development Kit (JDK)** (v17 or higher)
- **MySQL Server**
- **Node.js** (v16.0 or higher, for the frontend)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/placement-interaction-system.git
cd placement-interaction-system
```

### 2. Backend Setup

```bash
cd backend-java
```

**Configure Properties (`backend-java/src/main/resources/application.properties`):**
Ensure your MySQL credentials match what is in the properties file:

```properties
server.port=5000
spring.datasource.url=jdbc:mysql://localhost:3306/placement_portal?createDatabaseIfNotExist=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=your_mysql_password
jwt.secret=your_super_secret_jwt_key
```

**Run the Server using Maven Wrapper:**

```bash
# On Windows
.\mvnw.cmd spring-boot:run

# On Mac/Linux
./mvnw spring-boot:run
```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

**Run the Client:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🔑 Accessing Elevated Roles

By default, the registration page creates `Student` or `Employer` accounts. To access the **Admin** or **Placement Officer** dashboards in your local environment, you must manually update a registered user's role in your MySQL database:

```sql
-- Connect to MySQL shell or use a GUI client (like MySQL Workbench) and execute:
UPDATE users 
SET role = 'admin' -- or 'placement_officer'
WHERE email = 'your@email.com';
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/your-username/placement-interaction-system/issues) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
studnet login
email: <2400080086@gmail.com>
passwrod: 2400080086
emplyee login
email: <2400080087@kluniversity.in>
pass: 2400080087

*Built with ❤️ for the next generation of professionals.*
