import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import student from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/student.png"
import teacher from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/teachers.png"
import courses from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/courses.png"
import courseModel from "./courseModel.png"
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';


const CourseInformation = () => {

  const [activeTab, setActiveTab] = useState("details")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [subjectName, setSubjectName] = useState("")
  const [subjectCode, setSubjectCode] = useState("")

  
  const [studentName, setStudentName] = useState("")
  const [rollNumber, setRollNumber] = useState("")

  const [subjectTodos, setSubjectTodos] = useState([])
  const [studentTodos, setStudentTodos] = useState([])

  const [teacherTodo, setTeacherTodo] = useState([])

  const [teacherName, setTeacherName] = useState("")
  const [teacherSubject, setTeacherSubject] = useState("")
  const [teacherEmail, setTeacherEmail] = useState("")
  const [teacherDepartment, setTeacherDepartment] = useState("")

  const [courseData, setCourseData] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSubject] = useState(false);

  const navigate = useNavigate()
  const location = useLocation();
  const { courseId, courseName } = location.state || {};

  console.log("courseId in information : ", courseId);

  const {
    handleSubmit,
    register,
    reset,
    // formstate: { error }
  } = useForm()

  const onError = (errors) => {
    Object.values(errors).forEach(
      error => {toast.error(error.message)}
    )
  }

  const handleTabChange = (tab) => setActiveTab(tab)

  //handling subject data when click on view subject
  const handleSubjectRoute = (subjectTodo) => {
    navigate('/admin/courses/information/subjectInformation', { state: { courseId, courseName, subjectTodo } })
  }


  // handling student data when click on view student
  const handleStudentRoute = (studentTodo, subjectTodo) => {
    navigate('/admin/students', { state: { courseId, courseName, studentTodo, subjectTodo } })

  }


  const handleFormToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  // Add Subject data
  // const addSubjectData = () => {
  //   const addSubjectData = [...subjectTodos, { id: Date.now(), courseId: courseId, text: { subjectName: subjectName, subjectCode: subjectCode, subjectSessions: subjectSessions, department: department } }]
  //   setSubjectTodos(addSubjectData)
  //   localStorage.setItem("subjectTodo", JSON.stringify(addSubjectData))
  //   setSubjectName("")
  //   setSubjectCode("")
  // }

  // Add Subject
  const addSubjectData = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/Subject/SubjectCreate", {
        subname: data.subname,
        subCode: data.subCode,
        sessions: data.sessions,
        subclassName: data.subclass,
      })
      if (response.data) {
        const {_id, subname, subCode, sessions, subclassName } = response.data
        const addSubjectTodo = [...subjectTodos, { _id: _id, courseId:subclassName, text: { subjectName: subname, subjectCode: subCode, sessions: sessions } }]
        setSubjectTodos(addSubjectTodo)
        localStorage.setItem("subjectTodo", JSON.stringify(addSubjectTodo))
        reset()
        toast.success("Subject added successfully")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch data from the database
  const fetchSubjectData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/Subject/AllSubjects');
        console.log("Resppnse of subject : ", response)
        if (Array.isArray(response.data)) {
            const formattedSubjects= response.data.map((subject) => ({
                _id: subject._id,
                text: {
                    subjectName: subject.subName,
                    subjectCode: subject.subCode,
                    subclassName: subject.sclassName,
                    sessions: subject.sessions
                }
            }));
            setSubjectTodos(formattedSubjects);
            localStorage.setItem('subjectTodo', JSON.stringify(formattedSubjects));
        } else {
            toast.info(response.data.message);
        }
    } catch (error) {
        toast.error(error);
    } finally {
    }
};

console.log("Subject Data: ", subjectTodos)

  // Delete Subject Data
  const deleteSubjectTodo = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/Subject/Subject/${id}`)
        if (response.status === 200) {
            const updatedSubject = setSubjectTodos((subject) => subject.filter(subject => subject._id !== id))
            localStorage.setItem("subjectTodo", JSON.stringify(updatedSubject))
            return updatedSubject
          }
          toast.info("Subject deleted successfully")
    } catch (error) {
        toast.error(error)
    }
};

  // filter subject according to the course 
  const filterSubject = subjectTodos.filter((subject) => subject.courseId === courseId)

  // Add Student Data
  const addStudentData = () => {
    const addStudentData = [...studentTodos, { id: Date.now(), courseId: courseId, text: { studentName: studentName, rollNumber: rollNumber } }]
    setStudentTodos(addStudentData)
    localStorage.setItem("studentTodo", JSON.stringify(addStudentData))
    setStudentName("")
    setRollNumber("")
  }

  // Add student Data
  

  console.log("Student tood len: ", studentTodos.length)
  // Delete Student Data
  const deleteStudentTodo = (id) => {
    const deleteStudentTodo = studentTodos.filter((studentTodo) => studentTodo.id !== id)
    setStudentTodos(deleteStudentTodo)
    localStorage.setItem("studentTodo", JSON.stringify(deleteStudentTodo))
  }

  // filter student according to the course
  const filterStudent = studentTodos.filter((student) => student.courseId === courseId)


  // Add Teacher Data
  const addTeacherData = () => {
    const addTeacherData = [...teacherTodo, { id: Date.now(), courseId: courseId, text: { teacherName: teacherName, teacherSubject: teacherSubject, teacherEmail: teacherEmail, teacherDepartment: teacherDepartment } }]
    setTeacherTodo(addTeacherData)
    localStorage.setItem("teacherTodo", JSON.stringify(addTeacherData))
    setTeacherEmail("")
    setTeacherName("")
    setTeacherSubject("")
    setTeacherDepartment("")
  }

  // Delete the teacher data
  const deleteTeacherData = (id) => {
    const deleteTeacherData = teacherTodo.filter((teacher) => teacher.id !== id)
    setTeacherTodo(deleteTeacherData)
    localStorage.setItem('teacherTodo', JSON.stringify(deleteTeacherData))
  }

  // filter teacher according to the course
  const filterTeacher = teacherTodo.filter((teacher) => teacher.courseId === courseId)

  // UseEffect for the subject data
  useEffect(() => {
    const savedSubjectTodos = localStorage.getItem("subjectTodo")
    if (savedSubjectTodos) {
      try {
        setSubjectTodos(JSON.parse(savedSubjectTodos))
      } catch (error) {
        console.error('Error parsing saved courses:', error);
        setSubjectTodos([]); 
      }
    } else{
      setSubjectTodos([])
    }
    fetchSubjectData()

  }, [])

  // UseEffect for the student data
  useEffect(() => {
    const savedStudentTodos = localStorage.getItem("studentTodo")
    if (savedStudentTodos) {
      setStudentTodos(JSON.parse(savedStudentTodos))
    }
  }, [])

  // UseEffect for the teacher data
  useEffect(() => {
    const savedTeacherTodos = localStorage.getItem("teacherTodo")
    if (savedTeacherTodos) {
      setTeacherTodo(JSON.parse(savedTeacherTodos))
    }
  }, [])


  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("courseTodo")) || [];
    const currentCourse = courses.find(course => course.id === courseId);
    setCourseData(currentCourse);
  }, [courseId]);




  return (
    <>
      <div className='bg-zinc-800 w-full  '>
        <nav>
          <ul className='flex p-3 shadow shadow-black'>
            <li onClick={() => handleTabChange("details")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'details' ? 'text-zinc-400' : ''}`} >DETAILS</li>
            <li onClick={() => handleTabChange("subjects")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'subjects' ? 'text-zinc-400' : ''}`}>SUBJECTS</li>
            <li onClick={() => handleTabChange("students")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'students' ? 'text-zinc-400' : ''}`}>STUDENTS</li>
            <li onClick={() => handleTabChange("teachers")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'teachers' ? 'text-zinc-400' : ''}`}>TEACHERS</li>
          </ul>
        </nav>
        <h1 className='text-center mt-5 text-3xl'>Course Detail : {courseName}</h1>

        {/* DETAIL SECTION  */}

        {activeTab === "details" && (<div className='w-full flex mt- h-auto text-3xl'>
          <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
            <img className='mx-auto my-4 w-20 h-20' src={student} alt="student" />
            <span className=''>Total Students</span><br />
            <span className='text-green-700 font-bold'>{studentTodos.filter(student => student.courseId === courseId).length}</span>
          </div>
          <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
            <img className='mx-auto my-4 w-20 h-20' src={courses} alt="courses" />
            <span >Total Subject</span><br />
            <span className='text-green-700 font-bold'>{subjectTodos.filter(subject => subject.courseId === courseId).length}</span>
          </div>
          <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
            <img className='mx-auto my-4 w-20 h-20' src={teacher} alt="teacher" />
            <span>Total Teachers</span><br />
            <span className='text-green-700 font-bold'>{studentTodos.filter(teacher => teacher.courseId === courseId).length}</span>
          </div>
        </div>)}


        {/* SUBJECT SECTION */}

        {activeTab === "subjects" && (
          <>

            <div className={`modal bg-white  backdrop-blur-3xl text-black flex flex-col justify-around  shadow-2xl shadow-black-900 mx-auto w-96 mt-6  md:px-0 `}>
              <form onSubmit={handleSubmit(addSubjectData, onError)} className={`${isModalOpen ? "hidden" : "block"}  border-2  border-gray-300 flex flex-col justify-center mx-auto `}>
                <img className={`mx-auto h-full object-cover`} src={courseModel} alt="add course data" />
                <input {...register("subjectName", {required: "Subject Name is required", minLength: {value: 2, message: "Minimum 2 character is required"}})} type="text" name='subjectName' placeholder='Subject Name*' className={`rounded-lg font-5xl mt-5 mb-5 outline-none border-2 border-gray-900 py-3 px-4 mx-4  ${isModalOpen ? "hidden" : "block"}`} />
                <input {...register("subjectCode", {required: "Subject Code is required", minLength: {value: 2, message: "Minimum 2 character is required"}})} type="text" name='subjectCode' placeholder='Subject Code*'  className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4  mx-4 ${isModalOpen ? "hidden" : "block"}`} />
                <input {...register("sessions", {required: "Subject Session is required", minLength: {value: 1, message: "Minimum 2 character is required"}})} type="text" name='sessions' placeholder='Subject Sessions*'  className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 mx-4   ${isModalOpen ? "hidden" : "block"}`} />
                <input {...register("subclass", {required: "Subject Department is required", minLength: {value: 2, message: "Minimum 2 character is required"}})} type="text" name='subclass' placeholder='Subject Department*'  className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4  mx-4 ${isModalOpen ? "hidden" : "block"}`} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-5 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                <button type='submit' className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer mx-4`}  >Create Subject</button>
              </form>
            </div>


            <div className={` ${isModalOpen ? "block" : "hidden"}  mx-5 px-10 `}>
              <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Subject</button>
              <h1 className='text-3xl mb-2 '>Subject List :</h1>
              <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
                <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <th scope="col" className='px-6 py-3'>Subject Name</th>
                  <th scope="col" className='px-6 py-3'>Subject Code</th>
                  <th scope="col" className='px-6 py-3'>Sessions</th>
                  <th scope="col" className='px-6 py-3'>Department</th>
                  <th scope="col" className='px-6 py-3'>Action</th>
                </thead>
                <tbody>
                  {
                    filterSubject.map((subjectTodo) => (
                      <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={subjectTodo.id}>
                        <th className='px-6 py-4 text-black font-bold'>{subjectTodo.text.subjectName}</th>
                        <th className='px-6 py-4 text-black font-bold'>{subjectTodo.text.subjectCode}</th>
                        <th className='px-6 py-4 text-black font-bold'>{subjectTodo.text.sessions}</th>
                        <th className='px-6 py-4 text-black font-bold'>{subjectTodo.text.department}</th>
                        <th className='px-6 py-4 text-black font-bold flex'>
                          <button className='bg-zinc-900 hover:bg-zinc-800 text-white py-1 px-4 mx-3 rounded-lg' onClick={() => handleSubjectRoute(subjectTodo)}> View </button>
                          <Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4 cursor-pointer" onClick={() => deleteSubjectTodo(subjectTodo._id)}/>
                        </th>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

          </>
        )}

        {/* STUDENT SECTION */}

        {activeTab === "students" && (
          <>
            <div className={`modal backdrop-blur-3xl text-black flex flex-col justify-around  border-black-900 shadow-2xl shadow-black-900 mx-auto w-96 mt-6  md:px-0 `}>
              <div className={`${isModalOpen ? "hidden" : "block"} px-10 mt-10 border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
                <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
                <input required type="text" name='student name' placeholder='Student Name*' value={studentName} onChange={(e) => setStudentName(e.target.value)} className={`rounded-lg font-5xl mt-5 mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                <input required type="text" name='student code' placeholder='Roll Number*' value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-12 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer`} onClick={() => { if (studentName && rollNumber) { addStudentData(); setIsModalOpen(true); } else { alert("First enter the Subject name and Subject Code") } }} disabled={!studentName || !rollNumber} >Create Student</button>
              </div>
            </div>

            <div className={` ${isModalOpen ? "block" : "hidden"} text-black  mx-5 px-10 `}>
              <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Student</button>
              <h1 className='text-3xl mb-2'>Student List :</h1>
              <div className='bg-black text-white px-5 py-5 pr-20 flex justify-between '>
                <span>Student Name</span>
                <span>Roll number</span>
                <span>Action</span>
              </div>
              <ul className={`text-black`}>
                {
                  filterStudent.map((studentTodo) => (<>
                    <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={studentTodo.id}>
                      <span className=''>{studentTodo.text.studentName}</span>
                      <span className=''>{studentTodo.text.rollNumber}</span>
                      <div className='flex'>
                        <button className='bg-zinc-900 hover:bg-zinc-800 text-white py-1 px-4 rounded-lg' onClick={() => { handleStudentRoute(filterStudent) }}> View </button>
                        <button className='bg-blue-900 hover:bg-blue-800 text-white py-1 px-2 mx-1 rounded-lg'> Attendence </button>
                        {/* <button onClick={() => handleEditSubject(subjectTodo)}><Edit className="h-9 w-9 text-red -my-1" /></button> */}
                        <button onClick={() => deleteStudentTodo(studentTodo.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 text-red-700">
                          <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                        </svg>
                        </button>
                      </div>
                    </li>
                  </>))
                }
              </ul>
            </div>

          </>
        )}

        {/* TEACHER SECTION */}

        {activeTab === "teachers" && (
          <>
            <div className={`modal backdrop-blur-3xl text-black flex flex-col justify-around  border-black-900 shadow-2xl shadow-black-900 mx-auto w-96 mt-6  md:px-0 `}>
              <div className={`${isModalOpen ? "hidden" : "block"} px-10 -mt-3 border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
                <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
                <label htmlFor="teacherEmail">Teacher Email*</label>
                <input required type="text" name='teacherEmail' id='teacherEmail' placeholder='Teacher Email*' value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className={`rounded-lg font-5xl mt-1 mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                <label htmlFor="teacherName">Teacher Name*</label>
                <input required type="text" name='teacherName' id='teacherName' placeholder='Teacher Name*' value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className={`rounded-lg font-5xl mt-1 mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                <label htmlFor="teacherSubject">Teacher Subject*</label>
                <input required type="text" name='teacherSubject' id='teacherSubject' placeholder='Teacher Subject*' value={teacherSubject} onChange={(e) => setTeacherSubject(e.target.value)} className={`rounded-lg font-5xl mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                <label htmlFor="teacherDepartment">Department*</label>
                <input required type="text" name='teacherDepartment' id='teacherDepartment' placeholder='Teacher Deparment*' value={teacherDepartment} onChange={(e) => setTeacherDepartment(e.target.value)} className={`rounded-lg font-5xl mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-0 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-0 mb-3 cursor-pointer`} onClick={() => { if (teacherName && teacherEmail) { addTeacherData(); setIsModalOpen(true); } else { alert("First enter the Subject name and Subject Code") } }} disabled={!teacherEmail || !teacherName || !teacherSubject} >Create Teacher</button>
              </div>
            </div>

            <div className={` ${isModalOpen ? "block" : "hidden"} text-black  mx-5 px-10 `}>
              <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Teacher</button>
              <h1 className='text-3xl mb-2'>Teacher List :</h1>
              <div className='bg-black text-white px-5 py-5 pr-20 flex justify-between '>
                <span>Teacher Name</span>
                <span>Teacher Subject</span>
                <span>Teacher Email</span>
                <span>Department</span>
                <span>Action</span>
              </div>
              <ul className={`text-black`}>
                {
                  filterTeacher.map((teacherTodo) => (<>
                    <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={teacherTodo.id}>
                      <span className=''>{teacherTodo.text.teacherName}</span>
                      <span className=''>{teacherTodo.text.teacherSubject}</span>
                      <span className=''>{teacherTodo.text.teacherEmail}</span>
                      <span className=''>{teacherTodo.text.teacherDepartment}</span>
                      <div className='flex'>
                        <button onClick={() => deleteTeacherData(teacherTodo.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 text-red-700 -mx-20">
                          <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                        </svg>
                        </button>
                      </div>
                    </li>
                  </>))
                }
              </ul>
            </div>
          </>
        )}

        {/* Edit Modal */}
        {isEditMode && (
          <div className={`modal backdrop-blur-3xl text-black flex flex-col justify-around border-black-900 shadow-2xl shadow-black-900 mx-auto w-96 mt-6 md:px-0`}>
            <div className="px-10 mt-10 border-2 border-gray-300 flex flex-col justify-center mx-auto">
              <h2 className="text-xl mb-4">Edit Subject</h2>
              <input
                required
                type="text"
                placeholder='Subject Name*'
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="rounded-lg mt-5 mb-5 outline-none border-2 border-gray-900 py-3 px-4"
              />
              <input
                required
                type="text"
                placeholder='Subject Code*'
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="rounded-lg mb-5 outline-none border-2 border-gray-900 py-3 px-4"
              />
              <button
                className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3`}
                onClick={() => {
                  if (subjectName && subjectCode) {
                    const updatedSubject = { ...editingSubject, text: { subjectName, subjectCode } };
                    const updatedSubjectTodos = subjectTodos.map(todo =>
                      todo.id === editingSubject.id ? updatedSubject : todo
                    );
                    setSubjectTodos(updatedSubjectTodos);
                    localStorage.setItem("subjectTodo", JSON.stringify(updatedSubjectTodos));
                    setIsEditMode(false);
                    setSubjectName("");
                    setSubjectCode("");
                  } else {
                    alert("Please enter the Subject Name and Subject Code");
                  }
                }}
              >
                Update Subject
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default CourseInformation