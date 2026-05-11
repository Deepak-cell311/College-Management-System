import 'react-toastify/dist/ReactToastify.css';
import React, { lazy, Suspense, useEffect } from 'react'
import AuthProvider, { useAuth } from './Context/authProvider.js';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Register = lazy(() => import('./Pages/Register')) 
const Login = lazy(() => import('./Pages/Login'))

// Admin Routes
const AdminDashBoard = lazy(() => import("./Pages/AdminDashboard/AdminDashBoard"))
const AdminHome = lazy(() => import("./Pages/AdminDashboard/AdminHome"));
const AdminCourses = lazy(() => import("./Pages/AdminDashboard/AdminCourses"));
const AdminStudents = lazy(() => import("./Pages/AdminDashboard/AdminStudents.jsx"));
const AdminSubject = lazy(() => import("./Pages/AdminDashboard/AdminSubject"));
const AdminForm = lazy(() => import("./Pages/AdminDashboard/AdminLogin"));
const AdminStudent = lazy(() => import("./Pages/AdminDashboard/AdminStudent"));
const AdminTeacher = lazy(() => import("./Pages/AdminDashboard/AdminTeacher"));
const AdminProfile = lazy(() => import("./Pages/AdminDashboard/AdminProfile.jsx"));
const CourseInformation = lazy(() => import("./Pages/AdminDashboard/CourseInformation"));
const CourseStudentDetail = lazy(() => import("./Pages/AdminDashboard/CourseStudentDetail.jsx"));
const Notice = lazy(() => import("./Pages/AdminDashboard/Notice"));
const SubjectInformation = lazy(() => import("./Pages/AdminDashboard/SubjectInformation"));
const StudentAttendence = lazy(() => import("./Pages/AdminDashboard/StudentAttendence"));
const TaketeacherAttendance = lazy(() => import("./Pages/AdminDashboard/TaketeacherAttendance.jsx"));
const TeacherAttendanceDetail = lazy(() => import("./Pages/AdminDashboard/teacherAttendanceDetail.jsx"));

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const StudentDashBoard = lazy(() => import("./Pages/StudentDashboard/StudentDashBoard"));
const StudentHome = lazy(() => import("./Pages/StudentDashboard/StudentHome"));
const StudentLogin = lazy(() => import("./Pages/StudentDashboard/StudentLogin.jsx"));
const StudentRegistration = lazy(() => import("./Pages/StudentDashboard/StudentRegistration.jsx"));
const StudentSubject = lazy(() => import("./Pages/StudentDashboard/StudentSubject.jsx"));
const StudentProfile = lazy(() => import("./Pages/StudentDashboard/StudentProfile.jsx"));
const StudentAttendance = lazy(() => import("./Pages/StudentDashboard/StudentAttendance.jsx"));
const StudentFees = lazy(() => import("./Pages/StudentDashboard/StudentFees.jsx"));
const StudentFeesPayment = lazy(() => import("./Pages/StudentDashboard/StudentFeesPayment.jsx"));

const TeacherRegister = lazy(() => import("./Pages/TeacherDashboard/TeacherRegister.jsx"));
const TeacherLogin = lazy(() => import("./Pages/TeacherDashboard/TeacherLogin.jsx"));
const TeacherHome = lazy(() => import("./Pages/TeacherDashboard/TeacherHome.jsx"));
const TeacherDashboard = lazy(() => import("./Pages/TeacherDashboard/TeacherDashboard.jsx"));
const TeacherProfile = lazy(() => import("./Pages/TeacherDashboard/TeacherProfile.jsx"));
const TeacherAttendance = lazy(() => import("./Pages/TeacherDashboard/TeacherAttendance.jsx"));
const TeacherSchedule = lazy(() => import("./Pages/TeacherDashboard/TeacherSchedule.jsx"));

const PaymentPage = lazy(() => import("./Pages/Payment/PaymentPage.jsx"));
const NotFound = lazy(() => import("./Components/NotFound.jsx"));
const Welcome = lazy(() => import("./Pages/Welcome"));


// Footer Routes
const About = lazy(() => import("../src/Components/FooterPages/AboutUS.jsx"));
const Carrers = lazy(() => import("../src/Components/FooterPages/Carrers.jsx"));
const Partners = lazy(() => import("../src/Components/FooterPages/Partners.jsx"));
const Blog = lazy(() => import("../src/Components/FooterPages/Blog.jsx"));
const Resources = lazy(() => import("../src/Components/FooterPages/Resources.jsx"));
const Support = lazy(() => import("../src/Components/FooterPages/Support.jsx"));
const PrivacyPolicy = lazy(() => import("./Components/FooterPages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("./Components/FooterPages/TermsOfService.jsx"));
const cookiepolicy = lazy(() => import("./Components/FooterPages/CookiePolicy.jsx"));

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/welcome" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/adminLogin' element={<AdminForm />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path='/student/*' element={<StudentRoutes />} />
            <Route path='/studentLogin' element={<StudentLogin />} />
            <Route path='/StudentRegistration' element={<StudentRegistration />} />
            <Route path='/teacher/*' element={<TeacherRoutes />} />
            <Route path='/teacherLogin' element={<TeacherLogin />} />
            <Route path='/teacherRegister' element={<TeacherRegister />} />
            <Route path='/payment' element={<PaymentPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </Router>
      </Suspense>
    </AuthProvider>
  )
}

// New component for admin routes
const AdminRoutes = () => {
  const { authUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authUser) {
      navigate('/admin');
      // return null;              // it causes an error which shows the ----->  useEffect must not return anything besides a function, which is used for clean-up. You returned null. If your effect does not require clean up, return undefined (or nothing).Uncaught TypeError: destroy is not a function
      // return undefined
      return undefined;           // optional
    }
  }, [authUser, navigate])

  // if (!authUser) {
  //   navigate('/adminLogin');
  //   return null;
  // }

  return (
      <Routes>
        <Route path="/" element={<AdminDashBoard />} >
          <Route index element={<AdminHome />} />
          <Route path='home' element={<AdminHome />} />
          <Route path='notices' element={<Notice />} />
          <Route path='courses' element={<AdminCourses />} />
          <Route path='courses/information' element={<CourseInformation />} />
          <Route path='subjects' element={<AdminSubject />} />
          <Route path='courses/information/subjectInformation' element={<SubjectInformation />} />
          <Route path='teacherAttendance' element={<TaketeacherAttendance />} />
          <Route path='teacherAttendanceDetail' element={<TeacherAttendanceDetail />} />
          <Route path='subjectInformation/attendence' element={<StudentAttendence />} />
          <Route path='courses/information/courseStudentDetail' element={<CourseStudentDetail />} />
          <Route path='students' element={<AdminStudent />} />
          <Route path='adminStudent' element={<AdminStudents />} />
          <Route path='teachers' element={<AdminTeacher />} />
          <Route path='profile' element={<AdminProfile />} />
          <Route path="footer/*" element={<FooterRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}

// New component for student routes
const StudentRoutes = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<StudentDashBoard />}>
            <Route index element={<StudentHome />} />
            <Route path='home' element={<StudentHome />} />
            <Route path='subjects' element={<StudentSubject />} />
            <Route path='fees' element={<StudentFees />} />
            <Route path='feesPayment' element={<StudentFeesPayment />} />
            <Route path='profile' element={<StudentProfile />} />
            <Route path='attendance' element={<StudentAttendance />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </>
  )
}


// New component for teacher routes
const TeacherRoutes = () => {
  const { authTeacher } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!authTeacher) {
      navigate('/teacherLogin');
      return undefined;
    }
  }, [authTeacher, navigate])
  return (
    <>
        <Routes>
          <Route path='/' element={<TeacherDashboard />}>
            <Route index element={<TeacherHome />} />
            <Route path='home' element={<TeacherHome />} />
            <Route path='subjects' element={<TeacherSchedule />} />
            <Route path='profile' element={<TeacherProfile />} />
            <Route path='attendance' element={<TeacherAttendance />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </>
  )
}

const FooterRoutes = () => {
  return (
    <Routes>
      <Route path='about' element={<About />} />
      <Route path='carrers' element={<Carrers />} />
      <Route path='partners' element={<Partners />} />
      <Route path='blog' element={<Blog />} />
      <Route path='resources' element={<Resources />} />
      <Route path='support' element={<Support />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="term-service" element={<TermsOfService />} />
      <Route path="cookiepolicy" element={<cookiepolicy />} />
    </Routes>
  )
}

export default App