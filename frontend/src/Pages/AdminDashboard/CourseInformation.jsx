import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import student from "../../assets/student.png"
import teacher from "../../assets/teachers.png"
import courses from "../../assets/courses.png"
import courseModel from "./courseModel.png"
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Context/authProvider';


const CourseInformation = () => {

  const [activeTab, setActiveTab] = useState("details")
  const [isModalOpen, setIsModalOpen] = useState(false)


  const [subjectTodos, setSubjectTodos] = useState([])
  const [studentTodos, setStudentTodos] = useState([])

  const [teacherTodo, setTeacherTodo] = useState([])
  const [courseData, setCourseData] = useState([]);

  const navigate = useNavigate()
  const location = useLocation();
  const { courseId, courseName } = location.state || {};
  const { handleSubmit,register,reset } = useForm()
  const onError = (errors) => {
    Object.values(errors).forEach(
      error => { toast.error(error.message) }
    )
  }

  const handleTabChange = (tab) => setActiveTab(tab)

  const handleSubjectRoute = (subjectTodo) => {
    navigate('/admin/courses/information/subjectInformation', { state: { courseId, courseName, subjectTodo } })
    console.log("subjectTodo idnndnnz: ", subjectTodo)
  }

  const handleStudentRoute = (studentTodo) => {
    console.log("lund: ", studentTodo);
    navigate('/admin/courses/information/courseStudentDetail', {state: {subjectTodos, studentTodo: studentTodo._id}})
    console.log("studentTodo ettetdgg: ", studentTodo)
  }
  
  const handleFormToggle = () => {
    setIsModalOpen(!isModalOpen)
  }



  /* ===========================================Subject COMPLETED================================================================= */
  // Add Subject
  const addSubjectData = async (data) => {
    try {
      const response = await axios.post(`http://192.168.149.125:5000/Subject/SubjectCreate/${courseId}`, {
        ...data,
        courseId, // Pass courseId here if necessary
      });
      const { _id, subName, subCode, sessions } = response.data;
      setSubjectTodos(previous => [
        ...previous,
        { _id, courseId, text: { subName, subCode, sessions } },
      ]);
      reset();
      toast.success("Subject added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while adding the subject");
    }
  };
  
  // Fetch data from the database
  const fetchSubjectData = async () => {
    try {
      const response = await axios.get('http://192.168.149.125:5000/Subject/AllSubjects');
      console.log("Response data: ", response.data); 
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((subject) => ({
          _id: subject._id,
          courseId: subject.sclassName,
          text: {
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
          },
        }));
        setSubjectTodos(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while fetching subjects");
    }
  };
  
  // Log subjects to check course ID
  subjectTodos.forEach(subject => {
    console.log("Subject ID:", subject._id, "Course ID:", subject.courseId);
  });
  
  // Filter subjects according to the course 
  const filterSubject = subjectTodos.filter((subject) => subject.courseId === courseId);
  
  // Delete Subject Data
  const deleteSubjectTodo = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.149.125:5000/Subject/Subject/${id}`);
      if (response.status === 200) {
        setSubjectTodos(prev => prev.filter(subject => subject._id !== id));
        toast.success("Subject deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to delete subject"}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  
  
  /* ==========================================Student================================================================== */

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://192.168.149.125:5000/Student/ClassStudents/${courseId}`);
      console.log("Response data: ", response.data); // Log the response
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((student) => ({
          _id: student._id,
          courseId: student.sclassName, 
          text: {
            name: student.name,
            rollNum: student.rollNum,
            attendance: student.attendance,
          },
        }));
        setStudentTodos(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while fetching subjects");
      console.log(error.response)
    }
  };
  const filterStudent = studentTodos.filter((student) => student.courseId === courseId);
  console.log("filterStudent: ", filterStudent)
  

  
  /* ============================================================================================================ */


  // Add Teacher Data

  // UseEffect for the subject data and student data
  useEffect(() => {
      fetchSubjectData()
      fetchStudentData()
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
            <span className='text-green-700 font-bold'>0</span>
          </div>
        </div>)}


        {/* SUBJECT SECTION */}

        {activeTab === "subjects" && (
          <>

            <div className={`modal bg-white  backdrop-blur-3xl text-black flex flex-col justify-around  shadow-2xl shadow-black-900 mx-auto w-96 mt-6  md:px-0 `}>
              <form onSubmit={handleSubmit(addSubjectData, onError)} className={`${isModalOpen ? "hidden" : "block"}  border-2  border-gray-300 flex flex-col justify-center mx-auto `}>
                <img className={`mx-auto h-full object-cover`} src={courseModel} alt="add course data" />
                <input {...register("subName", { required: "Subject Name is required", minLength: { value: 2, message: "Minimum 2 character is required" } })} type="text" placeholder='Subject Name*' className={`rounded-lg font-5xl mt-5 mb-5 outline-none border-2 border-gray-900 py-3 px-4 mx-4  ${isModalOpen ? "hidden" : "block"}`} />
                <input {...register("subCode", { required: "Subject Code is required", minLength: { value: 2, message: "Minimum 2 character is required" } })} type="text" placeholder='Subject Code*' className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4  mx-4 ${isModalOpen ? "hidden" : "block"}`} />
                <input {...register("sessions", { required: "Subject Session is required", minLength: { value: 1, message: "Minimum 2 character is required" } })} type="text" placeholder='Subject Sessions*' className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 mx-4   ${isModalOpen ? "hidden" : "block"}`} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-5 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer mx-4`}  >Create Subject</button>
              </form>
            </div>


            <div className={` ${isModalOpen ? "block" : "hidden"}  mx-5 px-10 `}>
              <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Subject</button>
              <h1 className='text-3xl mb-2 '>Subject List :</h1>
              <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
                <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope="col" className='px-6 py-3'>Subject Name</th>
                    <th scope="col" className='px-6 py-3'>Subject Code</th>
                    <th scope="col" className='px-6 py-3'>Sessions</th>
                    <th scope="col" className='px-6 py-3'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
               
                    filterSubject.map((subjectTodo) => (
                      <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={subjectTodo._id}>
                        <td className='px-6 py-4 text-black font-bold'>{subjectTodo.text.subName}</td>
                        <td className='px-6 py-4 text-black font-bold'>{subjectTodo.text.subCode}</td>
                        <td className='px-6 py-4 text-black font-bold'>{subjectTodo.text.sessions}</td>
                        <td className='px-6 py-4 text-black font-bold flex'>
                          <button className='bg-zinc-900 hover:bg-zinc-800 text-white py-1 px-4 mx-3 rounded-lg' onClick={() => handleSubjectRoute(subjectTodo)}> View </button>
                          <Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4 cursor-pointer" onClick={() => deleteSubjectTodo(subjectTodo._id)} />
                        </td>
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

            <div className={` mx-5 px-10`}>
              <h1 className='text-3xl mb-2'>Student List :</h1>
              <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
                <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope="col" className='px-6 py-3'>Student Name</th>
                    <th scope="col" className='px-6 py-3'>Roll number</th>
                    <th scope="col" className='px-6 py-3'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterStudent.map((studentTodo) => (<>
                      <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={studentTodo.id}>
                        <td className='px-6 py-4 text-black font-bold'>{studentTodo.text?.name || 'N/A'}</td>
                        <td className='px-6 py-4 text-black font-bold'>{studentTodo.text?.rollNum || 'N/A'}</td>
                        <td className='flex'>
                          <button className='bg-green-700 hover:bg-green-800 mt-2 text-white py-2 px-4 mx-2 rounded-lg' onClick={() => { handleStudentRoute(studentTodo) }}> View </button>
                          <button className='bg-yellow-500 hover:bg-yellow-600 mt-2 text-black py-2 px-4 mx-2 rounded-lg'> Attendence </button>
                          <button ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 text-red-700">
                            <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                          </svg>
                          </button>
                        </td>
                      </tr>
                    </>))
                  }
                </tbody>
              </table>
            </div>

          </>
        )}

        {/* TEACHER SECTION */}

        {/* {activeTab === "teachers" && (
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
        )} */}
      </div>
    </>
  );
}

export default CourseInformation