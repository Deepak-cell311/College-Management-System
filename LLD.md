# Low-Level Design (LLD) - College Management System

## 1. Purpose

This document describes the internal implementation design of the College Management System. It focuses on detailed module responsibilities, state flow, backend logic, frontend route structure, data models, and integration points used by the platform.

The system is built using:
- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcryptjs
- File/Media Storage: Cloudinary
- Payment Integration: Razorpay

---

## 2. Design Scope

The platform supports three major user roles:
- Admin
- Teacher
- Student

Each role has a separate logical dashboard and a restricted set of features.

### Functional Scope
- Authentication and user management
- Course and subject management
- Teacher assignment and class management
- Student attendance tracking
- Fee management and payment processing
- Notice publishing
- Student and teacher profile access
- Frontend navigation and protected routes

---

## 3. System Context and Responsibilities

### 3.1 Frontend Responsibilities
The frontend is responsible for:
- rendering dashboards and pages
- route guarding for protected screens
- calling backend APIs
- state persistence for auth/session
- displaying notifications and validations
- handling payment UI and profile workflows

### 3.2 Backend Responsibilities
The backend is responsible for:
- handling HTTP requests
- validating inputs
- authenticating users
- authorizing role-specific actions
- querying and updating MongoDB
- processing file uploads to Cloudinary
- providing REST API endpoints for each module

### 3.3 Data Responsibilities
MongoDB stores all persistent records such as:
- users
- subjects
- classes/courses
- fees
- attendance
- notices
- complaints
- payment records

---

## 4. Detailed Module Breakdown

## 4.1 Authentication and Authorization Module

### Components
- Login page
- Registration page
- Auth provider / context
- JWT middleware
- Role-based access middleware
- Password hashing logic

### Functional Flow
1. User enters email/password on the frontend.
2. Frontend sends API request to login endpoint.
3. Backend checks the user from MongoDB.
4. Password is validated using bcryptjs.
5. JWT token is created if credentials are valid.
6. Token is returned to the client.
7. Client stores the token and sends it on subsequent requests.
8. Middleware verifies token before route execution.
9. Role middleware checks if the user is allowed to access the route.

### Logic Components
- `authProvider.js` in frontend holds authenticated user state.
- `middleware-tokenVerify.js` checks token validity.
- `middleware-role.js` authorizes based on role.

### Design Notes
- User detail should not be stored in plain text beyond session state.
- Frontend redirects unauthorized users back to login pages.

---

## 4.2 Admin Module

### Responsibilities
- Manage users
- Manage subjects
- Manage classes/courses
- Manage student and teacher records
- Monitor attendance
- Process fee records
- Publish notices
- View and manage payment-related data

### Root API Areas
- AdminRoute
- AdminController
- AdminModel

### Admin Use Cases
- Create/update/delete student, teacher, and staff users
- Assign teachers to subjects and classes
- Track and approve fee payment status
- View all notices
- Publish notices to students/teachers
- Review attendance reports across sections

### Admin Flow Example
```
Admin -> Frontend Admin Dashboard
      -> Admin API Endpoint
      -> Controller validates input
      -> MongoDB update/insert
      -> Response returns updated data
      -> Frontend refreshes table/list state
```

### Typical Admin Components
- AdminDashBoard
- AdminHome
- AdminCourses
- AdminSubject
- AdminStudents
- AdminTeacher
- AdminStudent
- AdminProfile
- Notice
- CourseInformation
- SubjectInformation
- StudentAttendence
- TaketeacherAttendance

---

## 4.3 Teacher Module

### Responsibilities
- Access assigned subject/class information
- Mark attendance of students
- View student list for assigned courses
- View class schedule and performance data
- Update profile information

### Root API Areas
- TeacherRoute
- TeacherController
- TeacherModel

### Teacher Use Cases
- Login as teacher
- Retrieve assigned subjects and students
- Mark daily attendance
- Update attendance notes if required
- View class-related performance records
- Access personal profile

### Teacher Flow Example
```
Teacher login
  -> Authenticated token
  -> Teacher dashboard loads
  -> API fetches assigned classes/subjects
  -> Teacher marks attendance
  -> Data sent to backend
  -> Controller updates attendance collection
  -> Response reflects updated class records
```

### Typical Teacher Components
- TeacherDashboard
- TeacherHome
- TeacherProfile
- TeacherAttendance
- TeacherSchedule
- TeacherLogin
- TeacherRegister

---

## 4.4 Student Module

### Responsibilities
- View profile and academic details
- View attendance summary
- Check fee status and due amounts
- Pay fees through integrated payment flow
- Access class subjects and notices
- View academic resources

### Root API Areas
- StudentRoute
- StudentController
- StudentModel

### Student Use Cases
- Student registers and logs in
- Student views enrolled subjects
- Checks attendance status for each subject
- Views fees due and payments
- Pays fees using Razorpay UI flow
- Fetches announcements and notices

### Student Flow Example
```
Student -> login
  -> JWT token
  -> Student dashboard loads profile & fee info
  -> backend fetches attendance + fees + subject list
  -> student selects payment option
  -> Razorpay completes payment
  -> backend saves payment record + updates fee status
```

### Typical Student Components
- StudentDashBoard
- StudentHome
- StudentProfile
- StudentSubject
- StudentAttendance
- StudentFees
- StudentFeesPayment
- StudentLogin
- StudentRegistration

---

## 5. Frontend Design Details

## 5.1 Routing Structure
The application uses React Router with nested routes. The main routing setup is defined in `frontend/src/App.js`.

### Top-Level Routes
- `/` -> Welcome page
- `/welcome` -> Login page
- `/register` -> Register page
- `/dashboard` -> General dashboard
- `/adminLogin` -> Admin login page
- `/admin/*` -> Admin nested routes
- `/student/*` -> Student nested routes
- `/teacher/*` -> Teacher nested routes
- `/payment` -> Payment page
- `*` -> NotFound

### Nested Route Groups
- `AdminRoutes` handles all `/admin/*` pages
- `StudentRoutes` handles `/student/*`
- `TeacherRoutes` handles `/teacher/*`
- `FooterRoutes` handles legal/support pages

### Role Guarding Design
The system uses `useAuth()` and route-based checks to redirect users if not authenticated.

Example design:
```
if (!authUser) {
  navigate('/adminLogin');
}
```

This logic ensures protected screens are only visible to the right users.

---

## 5.2 State Management Design

### Context API Pattern
The application uses `AuthProvider` and `useAuth()` for shared auth state.

### Main State Responsibilities
- Logged in user information
- Role of the user
- Authentication token
- UI loading state
- Notification/toast state

### Interactions
- Auth context is wrapped at the root of app
- All authenticated pages access user state from context
- Backend requests attach auth header securely

---

## 5.3 Component Design

### Common Component Categories
- Page components: dashboard, login, register, profile
- Reusable UI components: navbar, hero, footer, cards, form data
- Domain components: course, attendance, payment

### Example Component Files
- `frontend/src/Components/Navbar.jsx`
- `frontend/src/Components/Footer.jsx`
- `frontend/src/Components/FormData.jsx`
- `frontend/src/Components/Hero.jsx`
- `frontend/src/Components/NotFound.jsx`

### UI Design Principles
- Use responsive layouts
- Separate concerns by page/module
- Reuse common widgets
- Keep API logic isolated from UI rendering

---

## 6. Backend Design Details

## 6.1 Server Bootstrapping
The server starts in `server/index.js`.

### Key Startup Activities
- Express app initialization
- CORS configuration
- JSON body parsing
- File uploads setup
- Cloudinary configuration
- MongoDB connection
- Route registration
- Port listening

### Example Setup
```
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://college-management-system-nine.vercel.app'],
  credentials: true
}));
```

---

## 6.2 API Routing Design
Route modules are organized by domain:
- `server/routes/AdminRoute/`
- `server/routes/StudentRoute/`
- `server/routes/TeacherRoute/`

### Server Route Registration
```
app.use('/Admin', adminRoute);
app.use('/Complain', complainRoute);
app.use('/Notice', noticeRoute);
app.use('/Sclass', sclassRoute);
app.use('/Student', studentRoute);
app.use('/Subject', subjectRoute);
app.use('/Teacher', teacherRoute);
app.use('/Fees', feesRoute);
app.use('/payment', paymentRoute);
```

### Design Logic
- Each route group corresponds to a domain or role
- Route handlers delegate work to controller files
- Controllers contain business logic and database interaction

---

## 6.3 Controller Layer Design
The backend structure follows separation of concerns.

### Controller Directories
- `server/controllers/AdminController`
- `server/controllers/StudentController`
- `server/controllers/TeacherController`

### Controller Responsibilities
- Validate request payloads
- Query MongoDB models
- Transform data before sending response
- Handle errors consistently
- Return JSON responses

### Controller Logic Pattern
```
async function createRecord(req, res) {
  try {
    const payload = req.body;
    const result = await Model.create(payload);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
}
```

---

## 6.4 Middleware Design

### Middleware Modules
- `middleware-role.js`
- `middleware-tokenVerify.js`
- cron job modules for scheduled process execution

### Middleware Responsibilities
- JWT verification
- Role checking (Admin, Student, Teacher)
- Request validation
- Resource access filtering

### Protection Strategy
- Public endpoints: login/register/home pages
- Protected endpoints: attendance, fees, admin management, notices
- Only authorized users can create/update/delete records

---

## 7. Data Model Design

## 7.1 Model Organization
The system organizes mongoose models under:
- `server/models/AdminModel/`
- `server/models/StudentModel/`
- `server/models/TeacherModel/`

### Recommended Model Relationships
- User references across academic records
- Subject references teacher and class
- Attendance references student and subject
- Fee references student
- Notice references admin and target audience

### Example Object Relationships
```
Student -> many Attendance entries
Student -> many Fee entries
Teacher -> many Subjects
Class -> many Students
Class -> many Subjects
Subject -> many Attendance records
```

---

## 7.2 Core Domain Objects

### User Model
Attributes conceptually include:
- id
- name
- email
- passwordHash
- role
- contact
- createdAt
- updatedAt

### Subject Model
- subjectId
- name
- code
- teacherId
- classId
- description

### Attendance Model
- attendanceId
- studentId
- subjectId
- date
- status
- markedByTeacherId

### Fee Model
- feeId
- studentId
- amount
- dueDate
- status
- paymentDate
- transactionId

### Notice Model
- noticeId
- title
- message
- createdByAdminId
- targetRole
- createdAt

### Complaint Model
- complaintId
- studentId
- details
- status
- createdAt

---

## 8. Sequence Design

## 8.1 Login Flow
```
User -> Frontend Login Page
Frontend -> Backend /login API
Backend -> MongoDB user collection
Backend -> Validate password with bcrypt
Backend -> Generate JWT token
Backend -> Return token + user metadata
Frontend -> Save auth state
Frontend -> Redirect to dashboard
```

## 8.2 Attendance Marking Flow
```
Teacher -> Teacher dashboard
Frontend -> GET assigned students endpoint
Backend -> fetch class/subject data
Teacher -> marks attendance
Frontend -> POST attendance payload
Backend -> validate request and teacher role
Backend -> update attendance collection
Backend -> return success response
Frontend -> refresh attendance UI
```

## 8.3 Fee Payment Flow
```
Student -> Student Fees Page
Frontend -> Backend fee details API
Student -> Select pay
Frontend -> Razorpay checkout
Razorpay -> success callback
Frontend -> Backend payment confirmation API
Backend -> update fee payment status
Backend -> save payment transaction detail
Frontend -> show payment success status
```

---

## 9. Error Handling Design

### Error Handling Principles
- All API errors should return meaningful JSON payloads
- Validation errors should be surfaced on frontend forms
- Unauthorized requests should redirect to login or display access denied
- DB failures should be logged for debugging

### Example Error Responses
```
{
  "success": false,
  "message": "Invalid credentials"
}
```

```
{
  "success": false,
  "message": "Access denied for this role"
}
```

---

## 10. Validation and Business Rules

### Authentication Rules
- Email must be unique for registered users
- Password must be hashed before persistence
- Tokens must be validated before protected routes

### Student Rules
- Student can only access own profile and fees
- Student cannot update other student records

### Teacher Rules
- Teacher can only mark attendance for assigned classes
- Teacher cannot access admin-only pages

### Admin Rules
- Admin can perform user and subject management
- Admin can publish notices and review system-wide records

---

## 11. Security Design

### Security Controls
- JWT-based stateless authentication
- bcryptjs password hashing
- CORS restrictions
- Role-based route protection
- File upload restrictions via Cloudinary integration
- Avoid exposing sensitive database IDs in raw UI when not necessary

### Example Security Layer
```
Request -> Middleware VerifyToken -> Middleware CheckRole -> Controller
```

---

## 12. Deployment and Runtime Design

### Frontend Deployment
- React app deployed via Vercel or equivalent static hosting
- Built from `frontend` package

### Backend Deployment
- Express server runs on Node.js
- Usually deployed as a separate service on port 5000
- Connects to MongoDB cluster or local instance

### Suitable Production Architecture
```
Client Browser -> Frontend Host -> API Backend -> MongoDB
                                     -> Cloudinary
                                     -> Razorpay
```

---

## 13. Testing Design

### Recommended Testing Strategy
- Unit tests for utility functions and middleware
- Integration tests for API endpoints
- UI tests for login, admin panel, student fees, and teacher attendance pages
- Role-based access tests

### Example Test Scenarios
- Invalid login should fail with correct error message
- Teacher should not access admin route
- Student should see only student dashboard sections
- Fee payment should update payment status
- Attendance marking should persist properly

---

## 14. Implementation Considerations

### Code organization best practices
- Keep route logic separate from business logic
- Put schemas in model files
- Use controller methods for DB calls
- Combine JWT validation and role-based authorization in middleware
- Make frontend pages route-specific and modular

### Recommended future improvements
- Add Redis caching for attendance/fees summary
- Add WebSocket notifications for notices or attendance updates
- Move to modular API versioning
- Add logging and audit trails
- Add pagination for large student lists

---

## 15. Summary of LLD

The College Management System follows a layered architecture with clear separation between frontend routes, backend API controllers, middleware security, and MongoDB data models. The design supports a role-based, multi-dashboard system where Admin, Teacher, and Student users work within restricted modules and communicate through well-structured API endpoints.

This design provides a clean implementation base for:
- user management
- academic coordination
- attendance tracking
- fee and payment processing
- secure role-based access
- future scalability and extension

---

Document Status: Completed  
Version: 1.0  
Last Updated: 2026-09-26
