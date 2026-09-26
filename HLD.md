# High-Level Design (HLD) - College Management System

## 1. System Overview

The College Management System is a comprehensive web-based platform built on the **MERN stack** (MongoDB, Express, React, Node.js) designed to streamline college administration and provide role-based dashboards for Admins, Teachers, and Students.

### Key Characteristics:
- **Full-Stack JavaScript Application**
- **Microservices-oriented API Architecture**
- **Role-Based Access Control (RBAC)**
- **Real-time Data Management**
- **Cloud-based Storage (Cloudinary)**
- **Payment Integration (Razorpay)**

---

## 2. System Architecture

### 2.1 Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER (Frontend)                 │
│                    React.js + Redux + Context API               │
├─────────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER (Backend)                   │
│              Node.js + Express.js REST API Server               │
├─────────────────────────────────────────────────────────────────┤
│                    DATA LAYER (Database)                         │
│            MongoDB + Mongoose ORM + Cloudinary + Redis          │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Distribution

#### Frontend (React.js)
- Components for UI rendering
- Pages for different dashboards (Admin, Teacher, Student)
- State management (Redux, Context API)
- Routing (React Router v6)

#### Backend (Node.js + Express)
- REST API endpoints
- Business logic controllers
- Database models (MongoDB schemas)
- Middleware for authentication & authorization
- Cronjobs for automated tasks

#### Database (MongoDB)
- NoSQL document store
- Collections for Users, Classes, Subjects, Attendance, Fees

---

## 3. High-Level Modules

### 3.1 Authentication Module
```
┌─────────────────────────┐
│   Authentication        │
├─────────────────────────┤
│ • User Login            │
│ • User Registration     │
│ • JWT Token Generation  │
│ • Password Hashing      │
│ • Role-Based Access     │
└─────────────────────────┘
```

**Entities Involved:**
- Admin, Teacher, Student users
- JWT tokens
- Bcryptjs for password hashing

---

### 3.2 Admin Module
```
┌─────────────────────────────────────────┐
│         Admin Dashboard                  │
├─────────────────────────────────────────┤
│ • User Management                        │
│ • Subject Management                     │
│ • Class/Course Management                │
│ • Attendance Tracking (Students/Teachers)│
│ • Fee Management & Payments              │
│ • Notice Management                      │
│ • Performance Analytics                  │
└─────────────────────────────────────────┘
```

**Key Operations:**
- Create, Update, Delete users
- Assign subjects to teachers
- Create courses
- Track attendance records
- Process fee payments
- Post notices

---

### 3.3 Teacher Module
```
┌─────────────────────────────────────────┐
│       Teacher Dashboard                  │
├─────────────────────────────────────────┤
│ • View Assigned Classes                  │
│ • Manage Attendance                      │
│ • View Performance Metrics               │
│ • Access Class Materials                 │
│ • View Student Progress                  │
└─────────────────────────────────────────┘
```

**Key Operations:**
- View assigned subjects/classes
- Mark attendance for students
- Access class details
- Review student performance

---

### 3.4 Student Module
```
┌─────────────────────────────────────────┐
│       Student Dashboard                  │
├─────────────────────────────────────────┤
│ • View Profile & Schedule                │
│ • Track Attendance                       │
│ • Check Fee Status                       │
│ • Pay Fees Online                        │
│ • Access Class Resources                 │
│ • View Performance                       │
└─────────────────────────────────────────┘
```

**Key Operations:**
- View personal details
- Check attendance records
- View fee payment status
- Make online fee payments
- Access course materials

---

## 4. Data Flow Architecture

### 4.1 Request-Response Flow

```
Frontend (React)
       │
       ├──► HTTP Request (JSON)
       │
Backend (Express API)
       │
       ├──► Parse Request
       ├──► Validate Token (JWT)
       ├──► Check Role (RBAC)
       ├──► Execute Business Logic (Controller)
       │
Database (MongoDB)
       │
       ├──► Query/Manipulate Data
       │
       │◄─── Response (JSON)
       │
Frontend (React)
       │
       └──► Update State & Render UI
```

### 4.2 Authentication Flow

```
User Input (Credentials)
       │
       ├──► API: /auth/login
       │
Controller: Verify Credentials
       │
       ├──► Query: Find User in DB
       ├──► Compare Password (bcryptjs)
       ├──► If Match: Generate JWT Token
       │
Response: JWT Token + User Data
       │
Frontend: Store Token (localStorage)
       │
       └──► Attach Token in Future Requests
```

---

## 5. API Architecture

### 5.1 API Routes Organization

```
/api
├── /auth
│   ├── POST /login
│   └── POST /register
├── /admin
│   ├── GET /users
│   ├── POST /user
│   ├── PUT /user/:id
│   ├── DELETE /user/:id
│   ├── GET /subjects
│   ├── POST /subject
│   └── ...
├── /teacher
│   ├── GET /students
│   ├── POST /attendance
│   ├── GET /subjects
│   └── ...
├── /student
│   ├── GET /attendance
│   ├── GET /fees
│   ├── POST /fees/payment
│   └── ...
├── /sclass (Classes)
├── /subject
├── /complain
├── /notice
├── /payment
└── /fees
```

---

## 6. Database Schema Overview

### 6.1 Core Collections

#### Users Collection
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: "Admin" | "Teacher" | "Student",
  profilePicture: String (Cloudinary URL),
  contact: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Class Collection
```
{
  _id: ObjectId,
  name: String,
  section: String,
  teacher: ObjectId (Reference to User),
  students: [ObjectId],
  subjects: [ObjectId],
  createdAt: Date
}
```

#### Subject Collection
```
{
  _id: ObjectId,
  name: String,
  code: String,
  teacher: ObjectId,
  classes: [ObjectId],
  createdAt: Date
}
```

#### Attendance Collection
```
{
  _id: ObjectId,
  student: ObjectId,
  subject: ObjectId,
  date: Date,
  status: "Present" | "Absent",
  remarks: String,
  createdBy: ObjectId (Teacher)
}
```

#### Fee Collection
```
{
  _id: ObjectId,
  student: ObjectId,
  amount: Number,
  dueDate: Date,
  status: "Paid" | "Pending",
  paymentMethod: String,
  transactionId: String,
  paidDate: Date
}
```

---

## 7. Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js | UI Library |
| Redux Toolkit | State Management |
| Context API | Global State |
| React Router v6 | Client-side Routing |
| Tailwind CSS | Styling |
| Axios | HTTP Client |
| Framer Motion | Animations |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ORM |
| JWT | Authentication |
| Bcryptjs | Password Encryption |
| Cloudinary | Image Storage |
| Razorpay | Payment Gateway |
| Cron | Job Scheduling |

---

## 8. Security Architecture

### 8.1 Security Layers

```
Frontend Security
├── Input Validation
├── Token Storage (localStorage)
└── HTTPS/TLS

API Security
├── JWT Authentication
├── CORS Configuration
├── Role-Based Access Control (RBAC)
└── Input Sanitization

Database Security
├── Hashed Passwords (Bcryptjs)
├── Data Encryption
└── MongoDB Atlas Security
```

### 8.2 Authentication & Authorization

```
Request Arrives
       │
       ├──► Middleware: Verify JWT Token
       │
       ├──► Middleware: Check User Role
       │
       ├──► Route Handler: Execute Business Logic
       │
       └──► Response: Data
```

---

## 9. Integration Points

### 9.1 External Services

| Service | Purpose | Implementation |
|---------|---------|-----------------|
| **Cloudinary** | Image/File Storage | File upload for profiles & materials |
| **Razorpay** | Payment Processing | Online fee payments |
| **MongoDB Atlas** | Cloud Database | Data persistence |
| **Vercel** | Frontend Hosting | Deployment |

---

## 10. Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                     │
│         Hosted React Application (college-manage...     │
├─────────────────────────────────────────────────────────┤
│              Backend Server (Node.js + Express)          │
│              (Localhost:5000 or Cloud Deployment)       │
├─────────────────────────────────────────────────────────┤
│                 MongoDB Atlas (Database)                 │
│              (Cloud-hosted NoSQL Database)              │
├─────────────────────────────────────────────────────────┤
│              Third-party Services                        │
│    ┌─────────────┬──────────────┬─────────────┐         │
│    │ Cloudinary  │  Razorpay    │   JWT Auth  │         │
│    └─────────────┴──────────────┴─────────────┘         │
└─────────────────────────────────────────────────────────┘
```

### Containerization
```dockerfile
Frontend Dockerfile
├── Node.js Base Image
├── Install Dependencies
├── Build React App
└── Serve with Nginx

Backend Dockerfile
├── Node.js Base Image
├── Install Dependencies
└── Run Express Server
```

---

## 11. Scalability Considerations

### 11.1 Horizontal Scaling
- Multiple backend server instances behind load balancer
- MongoDB replica sets for high availability
- CDN for static assets (Vercel handles this)

### 11.2 Vertical Scaling
- Increase server resources (CPU, RAM)
- Database indexing on frequently queried fields
- Caching strategies (Redis integration possible)

### 11.3 Performance Optimization
- Lazy loading of components (React)
- Pagination for large datasets
- API rate limiting
- Database query optimization

---

## 12. Data Relationships

### ERD Overview
```
Admin ──────────┐
                ├──── Manages ──── Classes
Teacher ────────┤                    │
                ├──── Teaches ──── Subjects ──── Students
                │                    │
                └──────────────── Attendance
                                    │
                                   Fees
```

---

## 13. System Features Summary

### Admin Capabilities
✅ User management  
✅ Subject assignment  
✅ Class creation  
✅ Attendance tracking  
✅ Fee management  
✅ Notice distribution  
✅ Analytics & reports  

### Teacher Capabilities
✅ View assigned classes  
✅ Mark attendance  
✅ Monitor performance  
✅ Access resources  
✅ Manage schedule  

### Student Capabilities
✅ View profile  
✅ Check attendance  
✅ Pay fees online  
✅ Access materials  
✅ View performance  

---

## 14. System Constraints & Assumptions

### Constraints
- Single timezone support (can be extended)
- Limited concurrent users (can scale with load balancing)
- File size limits for uploads (Cloudinary)

### Assumptions
- Users have stable internet connection
- Browsers support ES6+ JavaScript
- MongoDB database has proper indexing
- Razorpay account configured for payments
---

**Document Version:** 1.0  
**Last Updated:** 2026-09-26  
**Maintained By:** Development Team
