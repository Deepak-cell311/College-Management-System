import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import student from "../../assets/student.png"
import teacher from "../../assets/teachers.png"
import { toast } from 'react-toastify'
import axios from 'axios'

const SubjectInformation = () => {
  const [activeTab, setActiveTab] = useState("details")
  const [todoLength, setTodoLength] = useState(0);
  const [subjectData, setSubjectData] = useState([]);
  const [showStudentData, setShowStudentData] = useState([])
  const [attendanceTodo, setAttendanceTodo] = useState([]);
  const [studentTodo, setStudentTodo] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, courseName, subjectTodo } = location.state || {}
  const handleTabChange = (tab) => setActiveTab(tab)

  const handleStudentRoute = (studentTodo) => {
    // const attendanceData = attendanceTodo.filter(att => att.studentId === student.studentId);
    navigate('/admin/students', { state: { courseId, courseName, studentTodo, showStudentData: studentTodo, attendance, subjectData: subjectTodo } })
  }

  const { attendance } = location.state || {}
  const handleAttendence = (student) => {
    navigate("/admin/subjectInformation/attendence", { state: { courseId, showSubjectData: subjectTodo, studentId: student._id } })
  }
  console.log("subjectTodo: ", subjectTodo)

  // Fetch all the students from the backend
  const fetchAllStudent = async (data) => {
    try {

      // Fetch the student detail using the API call
      const response = await axios.get(`http://localhost:5000/Student/ClassStudents/${courseId}`);
      console.log("student response: ", response.data)
      if (Array.isArray(response.data)) {
        const formattedData = response.data.map((student) => ({
          _id: student._id || "N/A",
          name: student.name || "Unknown",
          rollNum: student.rollNum || "N/A",
          attendance: student.attendance || "N/A"
        }))
        // console.log(formattedData)
        setStudentTodo(formattedData);
      } else {
        toast.error("Failed to fetch subjects.");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "An error occurred while fetching subjects.");
    }
  };

  // console.log("student todo: ", studentTodo)

  useEffect(() => {
    fetchAllStudent()
  }, [])

  //  console.log("attendence Todo: ", attendanceTodo)


  return (
    <>
      <div className='bg-zinc-800 w-full'>
        <nav>
          <ul className='flex p-3 shadow shadow-black'>
            <li onClick={() => handleTabChange("details")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'details' ? 'text-gray-400' : ''}`} >DETAILS</li>
            <li onClick={() => handleTabChange("students")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'students' ? 'text-gray-400' : ''}`}>STUDENTS</li>
          </ul>
        </nav>

        <div>
          {activeTab === "details" && (
            <div className=" w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl">
              <span className='tracking-wide mb-4 mt-10 text-center text-5xl'>Course: {courseName}</span>
              <div className='flex w-full flex-wrap md:flex-nowrap justify-center'>

                <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl' >
                  <img className='mx-auto my-4 w-20 h-20' src={student} alt="courses" />
                  <span >Subject Name</span><br />
                  <span className='text-green-700'>{subjectTodo.text.subjectName}</span>
                </div>
                <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                  <img className='mx-auto my-4 w-20 h-20' src={teacher} alt="teacher" />
                  <span>Subject Code</span><br />
                  <span className='text-green-700'>{subjectTodo.text.subjectCode}</span>
                </div>
                <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                  <img className='mx-auto my-4 w-20 h-20' src={student} alt="student" />
                  <span className=''>Total Students</span><br />
                  <span className='text-green-700'>{studentTodo.length}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className=' flex flex-wrap md:flex-nowrap md:flex-col h-auto mx-10'>
              <h1 className='tracking-wide mb-4 mt-10 text-center text-3xl'>Student List </h1>
              <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
                <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope="col" className='px-6 py-3'>Student Name</th>
                    <th scope="col" className='px-6 py-3'>Roll number</th>
                    <th scope="col" className='px-6 py-3'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentTodo.map((student, index) => (
                    <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={index} >
                      <th className='px-6 py-4 text-black font-bold'>{student.name}</th>
                      <th className='px-6 py-4 text-black font-bold'>{student.rollNum}</th>
                      <th className='px-6 py-4 text-black font-bold'>
                        <div className='-mx-5'>
                          <button className={`bg-cyan-500 hover:bg-cyan-600 px-3 py-2  rounded-lg cursor-pointer`} onClick={() => { handleStudentRoute(student) }}>View</button>
                          <button className={`bg-yellow-500 hover:bg-cyan-600 px-3 py-2 mx-3 rounded-lg cursor-pointer`} onClick={() => handleAttendence(student)}>Take Attendence</button>

                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div >
    </>
  )
}

export default SubjectInformation