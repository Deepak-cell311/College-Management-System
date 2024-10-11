import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import student from "../../assets/student.png"
import teacher from "../../assets/teachers.png"

const SubjectInformation = () => {
  const [activeTab, setActiveTab] = useState("details")
  const [todoLength, setTodoLength] = useState(0);
  const [subjectData, setSubjectData] = useState([]);
  const [showStudentData, setShowStudentData] = useState([])
  const [attendanceTodo, setAttendanceTodo] = useState([]);

  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, courseName, subjectTodo } = location.state || {}

  console.log("courseId in subject: ", courseId)
  console.log("courseName in subject: ", courseName)
  console.log("showStudentData in subject: ", showStudentData)

  const handleTabChange = (tab) => setActiveTab(tab)

  const handleStudentRoute = (studentTodo) => {
    const attendanceData = attendanceTodo.filter(att => att.studentId === student.studentId);
    navigate('/admin/students', { state: { courseId, courseName, studentTodo, showStudentData: studentTodo, attendanceData } })
  }

  const handleAttendence = (student) => {
    navigate("/admin/subjectInformation/attendence", { state: { courseId, showStudentData: student } })
  }
  useEffect(() => {
    const storedData = localStorage.getItem('studentTodo');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSubjectData(parsedData);
      setTodoLength(Array.isArray(parsedData) ? parsedData.length : (parsedData ? 1 : 0));
    }
  }, []);

  useEffect(() => {
    const studentData = localStorage.getItem("studentTodo");

    if (studentData) {
      const parsedData = JSON.parse(studentData)
      if (Array.isArray(parsedData)) {
        setShowStudentData(parsedData.map(student => ({
          studentId: student.id,
          name: student.text.studentName,
          rollNumber: student.text.rollNumber,
          courseId: student.courseId

        })));
      } else if (parsedData && parsedData.text) {
        setShowStudentData([{
          name: parsedData.text.studentName,
          rollNumber: parsedData.text.rollNumber
        }]);
      }
    }

    const storedAttendance = localStorage.getItem("attendanceTodo");
    if (storedAttendance) {
      const parsedAttendance = JSON.parse(storedAttendance);
      setAttendanceTodo(parsedAttendance); // Store the data in state
    }
  }, []);

  const filterStudent = showStudentData.filter((studentData) => studentData.courseId === courseId)
  console.log("filterStudent : ", filterStudent)

  return (
    <>
      <div className='text-black w-full'>
        <nav>
          <ul className='flex p-3 border-2 shadow shadow-black'>
            <li onClick={() => handleTabChange("details")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'details' ? 'text-blue-500' : ''}`} >DETAILS</li>
            <li onClick={() => handleTabChange("students")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'students' ? 'text-blue-500' : ''}`}>STUDENTS</li>
          </ul>
        </nav>

        <div>
          {activeTab === "details" && (
            <div className="bg-white w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl">
              <span className='tracking-wide mb-4 mt-10 text-center text-5xl'>Course: {courseName || "N/A"}</span>
              <div className='flex w-full flex-wrap md:flex-nowrap justify-center'>

                <div className='box-2 h-64 mx-5 my-2 bg-white md:h-60 md:w-1/2 md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-12 md:px-0'>
                  <img className='mx-auto my-4 w-20 h-20' src={student} alt="courses" />
                  <span >Subject Name</span><br />
                  <span className='text-green-700'>{subjectTodo.text.subjectName}</span>
                </div>
                <div className='box-3 h-64 mx-5 my-2 bg-white md:h-60 md:w-1/2 md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-10 md:px-0'>
                  <img className='mx-auto my-4 w-20 h-20' src={teacher} alt="teacher" />
                  <span>Subject Code</span><br />
                  <span className='text-green-700'>{subjectTodo.text.subjectCode}</span>
                </div>
                <div className='box-1 h-64 mx-5 my-2 mt-20 bg-white  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-10 md:px-0'>
                  <img className='mx-auto my-4 w-20 h-20' src={student} alt="student" />
                  <span className=''>Total Students</span><br />
                  <span className='text-green-700'>{todoLength}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className='bg-white  flex flex-wrap md:flex-nowrap md:flex-col h-auto '>
              <span className='tracking-wide mb-4 mt-10 text-2xl mx-36'>Student List: </span>
              <div className='bg-black w-3/4 mx-auto text-white py-5 flex justify-around '>
                <span>Student Name</span>
                <span>Roll number</span>
                <span>Action</span>
              </div>
              <div className='flex m-auto'>
                <table className='w- table-auto border-separate border-spacing-2 border-spacing-x-40  '>
                  {filterStudent.map((student, index) => (
                    <tr key={index} >
                      <td>{student.name}</td>
                      <td>{student.rollNumber}</td>
                      <td>
                        <div className='-mx-5'>
                          <button className={`bg-cyan-500 hover:bg-cyan-600 px-3 py-2  rounded-lg cursor-pointer`} onClick={() => handleStudentRoute(student)}>View</button>
                          
                          <button className={`bg-yellow-500 hover:bg-cyan-600 px-3 py-2 mx-3 rounded-lg cursor-pointer`} onClick={() => handleAttendence(student)}>Take Attendence</button>
                         
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SubjectInformation