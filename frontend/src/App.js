import React from 'react'
import Login from './Pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import AdminDashBoard from './Pages/AdminDashboard/AdminDashBoard';
import AdminHome from './Pages/AdminDashboard/AdminHome';
import AdminCourses from './Pages/AdminDashboard/AdminCourses';
import CourseInformation from './Pages/AdminDashboard/CourseInformation';
import AdminForm from "./Pages/AdminDashboard/AdminLogin"
import Dashboard from './Pages/Dashboard';
import AdminSubject from './Pages/AdminDashboard/AdminSubject';
import SubjectInformation from './Pages/AdminDashboard/SubjectInformation';
import AdminStudent from './Pages/AdminDashboard/AdminStudent';
import Notice from './Pages/AdminDashboard/Notice';
import AdminTeacher from './Pages/AdminDashboard/AdminTeacher';
import StudentAttendence from './Pages/AdminDashboard/StudentAttendence';
import StudentDashBoard from './Pages/StudentDashboard/StudentDashBoard';
import StudentHome from './Pages/StudentDashboard/StudentHome';
import AuthProvider, { useAuth } from './Context/authProvider.js';
import NotFound from './Components/NotFound.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (

    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/adminLogin' element={<AdminForm />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path='/student/*' element={<StudentRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  )
}


// New component for admin routes
const AdminRoutes = () => {
  const [userAuth] = useAuth()
  return (
    <>
      {userAuth ? (
        <>
          <Routes>
            <Route path="/" element={<AdminDashBoard />} >
              <Route index element={<AdminHome />} />
              <Route path='home' element={<AdminHome />} />
              <Route path='notices' element={<Notice />} />
              <Route path='/courses' element={<AdminCourses />} />
              <Route path='courses/information' element={<CourseInformation />} />
              <Route path='subjects' element={<AdminSubject />} />
              <Route path='courses/information/subjectInformation' element={<SubjectInformation />} />
              <Route path='subjectInformation/attendence' element={<StudentAttendence />} />
              <Route path='students' element={<AdminStudent />} />
              <Route path='teachers' element={<AdminTeacher />} />
            </Route>
          </Routes>
        </>
      ) : (
        <NotFound />
      )}
    </>
  )
}


const StudentRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<StudentDashBoard />}>
          <Route index element={<StudentHome />} />
          <Route path='home' element={<StudentHome />} />
        </Route>
      </Routes>
    </>
  )
}

export default App