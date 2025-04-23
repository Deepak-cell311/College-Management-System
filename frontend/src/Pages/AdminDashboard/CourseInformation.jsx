import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import student from "../../assets/student.png"
import teacherImg from "../../assets/teachers.png"
import courses from "../../assets/courses.png"
import courseModel from "./courseModel.png"
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { ColorRing } from 'react-loader-spinner'
import PaymentPage from '../Payment/PaymentPage';


const CourseInformation = () => {

  const [activeTab, setActiveTab] = useState("details")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [subjectTodos, setSubjectTodos] = useState([])
  const [studentTodos, setStudentTodos] = useState([])

  const [teacherData, setTeacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacher, setTeacher] = useState([]);

  const navigate = useNavigate()
  const location = useLocation();
  const { courseId, courseName } = location.state || {};
  const { handleSubmit, register, reset } = useForm()
  const onError = (errors) => {
    Object.values(errors).forEach(
      error => { toast.error(error.message) }
    )
  }

  const coursesData = [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 3,
      fee: 1200,
      status: "Paid",
      dueDate: "2023-09-15",
      paymentDate: "2023-09-10",
    },
    {
      id: 2,
      code: "MATH201",
      name: "Calculus II",
      credits: 4,
      fee: 1500,
      status: "Pending",
      dueDate: "2023-09-20",
      paymentDate: null,
    },
    {
      id: 3,
      code: "ENG102",
      name: "English Composition",
      credits: 3,
      fee: 1000,
      status: "Paid",
      dueDate: "2023-09-10",
      paymentDate: "2023-09-05",
    },
    {
      id: 4,
      code: "PHYS101",
      name: "Physics I",
      credits: 4,
      fee: 1500,
      status: "Overdue",
      dueDate: "2023-09-01",
      paymentDate: null,
    },
    {
      id: 5,
      code: "CHEM101",
      name: "Chemistry I",
      credits: 4,
      fee: 1500,
      status: "Pending",
      dueDate: "2023-09-25",
      paymentDate: null,
    },
  ]

  const handleTabChange = (tab) => setActiveTab(tab)
  const handleView = (student) => {
    navigate("/admin/students", {
      state: {
        showStudentData: student,
        subjectData: { text: { sessions: 10, subName: "Subject Name" } },
      },
    });
  };

  const handleSubjectRoute = (subjectTodo) => {
    navigate('/admin/courses/information/subjectInformation', { state: { courseId, courseName, subjectTodo } })
  }

  const handleStudentRoute = (studentTodo) => {
    navigate('/admin/courses/information/courseStudentDetail', { state: { subjectTodos, studentTodo: studentTodo._id } })
  }

  const handleFormToggle = () => {
    setIsModalOpen(!isModalOpen)
  }



  /* ===========================================Subject COMPLETED================================================================= */
  // Add Subject
  const addSubjectData = async (data) => {
    try {
      const response = await axios.post(`https://college-management-system-s6xa.onrender.com/Subject/SubjectCreate/${courseId}`, {
        ...data,
        courseId,
      });
      const { _id, subName, subCode, sessions } = response.data;
      setSubjectTodos(previous => [
        ...previous,
        { _id, courseId, text: { subName, subCode, sessions } },
      ]);
      reset();
      toast.success("Subject added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Fetch data from the database
  const fetchSubjectData = async () => {
    try {
      const response = await axios.get('https://college-management-system-s6xa.onrender.com/Subject/AllSubjects');
      if (Array.isArray(response.data)) {
        const formattedStudent = response.data.map((subject) => ({
          _id: subject._id,
          courseId: subject.sclassName,
          text: {
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
          },
        }));
        setSubjectTodos(formattedStudent);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };


  // Filter subjects according to the course 
  const filterSubject = subjectTodos.filter((subject) => subject.courseId === courseId);

  // Delete Subject Data
  const deleteSubjectTodo = async (id) => {
    try {
      const response = await axios.delete(`https://college-management-system-s6xa.onrender.com/Subject/Subject/${id}`);
      if (response.status === 200) {
        setSubjectTodos(prev => prev.filter(subject => subject._id !== id));
        toast.success("Subject deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };


  /* ==========================================Student================================================================== */

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Student/ClassStudents/${courseId}`);
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
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://college-management-system-s6xa.onrender.com/Student/Student/${id}`);
      setStudentTodos((prev) => prev.filter((student) => student._id !== id));
      toast.success("Student deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the student.");
    }
  };
  const filterStudent = studentTodos.filter((student) => student.courseId === courseId);


  /* =============================================Teacher=============================================================== */

  const handleTeacherAttendance = (teacherId) => {
    navigate("/admin/teacherAttendance", { state: { teacherId } })
  }

  const handleTeacherRoute = (teacherId) => {
    navigate('/admin/teacherAttendanceDetail', { state: { teacherId } })
  }

  const fetchTeacherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://college-management-system-s6xa.onrender.com/Teacher/Teachers');
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((teacher) => ({
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          teachSclass: teacher.teachSclass.sclassName,
          id: teacher.teachSclass._id
        }));
        setTeacherData(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const filterTeacher = teacherData.filter((teacher) => teacher.id === courseId);

  const deleteTeacher = async (id) => {
    try {
      const response = await axios.delete(`https://college-management-system-s6xa.onrender.com/Teacher/Teacher/${id}`);
      if (response.status === 200) {
        setTeacher((teachers) => teachers.filter((teacher) => teacher._id !== id));
        toast.success('Subject deleted successfully');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to delete course';
      toast.error(`Error: ${errorMsg}`);
      console.error("Error deleting subject:", error);
    }
  };



  /* ==========================================================[Fees]========================================================= */



  const [rows, setRow] = useState([
    { courseName: "", heads: "", semester1: "", semester2: "", semester3: "", semester4: "", semester5: "", semester6: "" }
  ])

  console.log("Rows: ", rows)
  const [feesData, setFeesData] = useState([])

  // Function to delete a row
  const handleDeleteRow = (index) => {
    setRow(rows.filter((_, i) => i !== index)); // Remove the row at the given index
  };

  const onSubmitFeesForm = async (data) => {
    console.log("data: ", data)
    const formattedData = {
      courseName: data.courseName,
      rows: data.rows
    }

    console.log("formatted Data: ", formattedData)
    try {
      const response = await axios.post(`https://college-management-system-s6xa.onrender.com/Fees/Fee`, formattedData);
      toast.success("Fee data submitted successfully!");
      console.log("Response data: ", response)
      reset()
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!");
      console.error("Error Response:", error.response?.data);
    }
  }

  useEffect(() => {
    ShowFeesData(); // Fetch existing fees on component mount
  }, []);

  const ShowFeesData = async () => {
    setLoading(true)
    try {
      const fetchFeesData = await axios.get(`https://college-management-system-s6xa.onrender.com/Fees/get-fees/${courseId}`);
      console.log("Fetch fees data: ", fetchFeesData)
      if (fetchFeesData.status === 200 || fetchFeesData.status === 201) {
        setFeesData(fetchFeesData.data);
      }
    } catch (error) {
      toast.error(error || "An error occured while fetching fees data");
    } finally {
      setLoading(false)
    }

  }

  console.log("Fees Data: ", feesData[feesData.length - 1])
  

  // UseEffect for the subject data and student data
  useEffect(() => {
    fetchSubjectData()
    fetchStudentData()
    fetchTeacherData()
  }, [])

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("courseTodo")) || [];
    const currentCourse = courses.find(course => course.id === courseId);
    setCourseData(currentCourse);
  }, [courseId]);

  return (
    <>
      <div className=' w-full '>
        <nav className='fixed top-0 py-1 px-5 w-full left-0 md:mx-64 right-20 z-0 bg-gray-900 shadow-lg'>
          <ul className='flex py-5'>
            {['details', 'subjects', 'students', 'teachers', 'fees'].map((tab) => (
              <li
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative mx-10 cursor-pointer flex flex-col text-lg font-semibold transition-all duration-300 
                    ${activeTab === tab ? 'text-zinc-400' : 'text-gray-600 hover:text-blue-400'}`}
              >
                <span className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-300 
                         ${activeTab === tab ? 'bg-blue-500' : 'bg-transparent'}`}></span>
                {tab.toUpperCase()}
                <div className={`absolute transition-transform duration-300 ${activeTab === tab ? 'scale-100' : 'scale-0'}`}>
                  <div className='bg-blue-500 rounded-full w-2 h-2 animate-ping mx-7'></div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <h1 className='text-center mt-20 md:text-3xl text-3xl font-bold'><u>{courseName}</u></h1>

        {/* DETAIL SECTION  */}

        {activeTab === "details" && (
          <div className='w-full flex md:flex-row flex-col h-auto text-3xl'>
            <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
              <img className='mx-auto my-4 w-20 h-20' src={student} alt="student" />
              <span className=''>Total Students</span><br />
              <span className='text-green-700 font-bold'>{studentTodos.filter(student => student.courseId === courseId).length}</span>
            </div>
            <div className='box-1 h-64 mx-5 my-2 mt-10 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
              <img className='mx-auto my-4 w-20 h-20' src={courses} alt="courses" />
              <span >Total Subject</span><br />
              <span className='text-green-700 font-bold'>{subjectTodos.filter(subject => subject.courseId === courseId).length}</span>
            </div>
            <div className='box-1 h-64 mx-5 my-2 mt-10 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
              <img className='mx-auto my-4 w-20 h-20' src={teacherImg} alt="teacher" />
              <span>Total Teachers</span><br />
              <span className='text-green-700 font-bold'>{teacherData.filter(teacher => teacher.id === courseId).length}</span>
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



            {isModalOpen && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Subject</button>
              <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Subject</button>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Subject Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Subject Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Sessions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <div className="flex justify-center items-center h-96">
                          <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
                        </div>
                      </td>
                    </tr>
                  ) :
                    error ? (
                      <tr>
                        <td colSpan="5" className="text-center text-red-500">{error}</td>
                      </tr>
                    ) :
                      (

                        filterSubject.map((subjectTodo, index) => (
                          <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`} key={subjectTodo._id}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{index + 1 || "N/A"}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{subjectTodo.text.subName}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{subjectTodo.text.subCode}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{subjectTodo.text.sessions}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 flex'>
                              <button className='bg-green-600 hover:bg-green-500 text-white py-2 px-4 mx-3 rounded-lg' onClick={() => handleSubjectRoute(subjectTodo)}> View </button>
                              <Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4 cursor-pointer" onClick={() => deleteSubjectTodo(subjectTodo._id)} />
                            </td>
                          </tr>
                        ))
                      )}
                </tbody>
              </table>
            </div>}

          </>
        )}

        {/* STUDENT SECTION */}

        {activeTab === "students" && (
          <>

            <div className={`md:w-3/4 w-full sm:w-2/4 mx-auto mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden`}>
              <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 `}>
                <thead className='bg-gray-50 dark:bg-gray-700'>
                  <tr>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Student Name</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Roll number</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <div className="flex justify-center items-center h-96">
                          <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
                        </div>
                      </td>
                    </tr>
                  ) :
                    error ? (
                      <tr>
                        <td colSpan="5" className="text-center text-red-500">{error}</td>
                      </tr>
                    ) :
                      (
                        filterStudent.map((studentTodo, index) => (
                          <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors `} key={studentTodo._id}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{index + 1 || 'N/A'}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{studentTodo.text?.name || 'N/A'}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{studentTodo.text?.rollNum || 'N/A'}</td>
                            <td className='flex'>
                              <button className='bg-green-600 hover:bg-green-500 mt-2 text-white py-2 px-4 mx-2 rounded-lg' onClick={() => { handleStudentRoute(studentTodo) }}> View </button>
                              <button onClick={() => deleteStudent(studentTodo._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 text-red-700">
                                <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                              </svg>
                              </button>
                            </td>
                          </tr>

                        ))
                      )}
                </tbody>
              </table>
            </div>

          </>
        )}

        {/* TEACHER SECTION */}

        {activeTab === "teachers" && (
          <>
            <div className={`w-full mx-auto mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden`}>
              <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 `}>
                <thead className='bg-gray-50 dark:bg-gray-700'>
                  <tr>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Teacher Name</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Teacher Email</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Department</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                  {
                    filterTeacher.map((teacher, index) => (<>
                      <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors `} key={teacher._id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{index + 1 || 'N/A'}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{teacher.name || 'N/A'}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{teacher.email || 'N/A'}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{teacher.teachSclass || 'N/A'}</td>
                        <td className='flex'>
                          <button onClick={() => handleTeacherRoute(teacher._id)} className='bg-green-700 hover:bg-green-800 mt-2 text-white py-2 px-4 mx-2 rounded-lg'> View </button>
                          <button onClick={() => handleTeacherAttendance(teacher._id)} className='bg-yellow-500 hover:bg-yellow-600 mt-2 text-black py-2 px-4 mx-2 rounded-lg'> Attendence </button>
                          <button onClick={() => deleteTeacher(teacher._id)} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 text-red-700">
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


        {/* Fees Section */}

        {activeTab === 'fees' && (
          <>
            <div>
              <h1 className="tracking-wide mt-10 text-center text-5xl mb-10 font-semibold text-gray-800 dark:text-gray-200"><u>Fees Detail and Payment Status</u></h1>

              <div className='text-center flex items-center justify-center'>
                <input type="text" className='hidden text-black outline-none w-full' {...register('courseName')} name='courseName' id='courseName' value={courseName} placeholder='Enter CourseName' />
              </div>
              <form onSubmit={handleSubmit(onSubmitFeesForm)} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 overflow-y-scroll">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      {["heads", "I Sem", "II Sem", "III Sem", "IV Sem", "V Sem", "VI Sem"].map((row, index) => (
                        <th key={index} scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>{row}</th>

                      ))}
                    </tr>
                    <tr>
                      {["Time to pay", "Admission", "01 t0 31 Jan, 2025", "01 t0 31 July, 2025", "01 t0 31 Jan, 2026", "01 t0 31 Jan, 2026", "01 t0 31 Jan, 2027"].map((row, index) => (
                        <th key={index} scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>{row}</th>

                      ))}
                    </tr>
                  </thead>


                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <div className="flex justify-center items-center h-96">
                            <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
                          </div>
                        </td>
                      </tr>
                    ) :
                      error ? (
                        <tr>
                          <td colSpan="5" className="text-center text-red-500">{error}</td>
                        </tr>
                      ) :
                        (

                          rows.map((rows, index) => (<>

                            <tr key={index} className="border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                              <td className="px-6 py-2">
                                <textarea {...register(`rows[${index}].heads`, { required: true })} className="w-full px-2 text-black outline-none border rounded-md" />
                              </td>
                              <td className="px-6 py-2">
                                <textarea {...register(`rows[${index}].semester1`, { required: true })} className="w-full px-2 text-black outline-none border rounded-md" />
                              </td>
                              <td className="px-6 py-2">
                                <textarea {...register(`rows[${index}].semester2`, { required: true })} className="w-full px-2 text-black outline-none border rounded-md" />
                              </td>
                              <td className="px-6 py-2">
                                <textarea {...register(`rows[${index}].semester3`, { required: true })} className="w-full px-2 text-black outline-none border rounded-md" />
                              </td>
                              <td className="px-6 py-2">
                                <textarea {...register(`rows[${index}].semester4`, { required: true })} className="w-full px-2 text-black outline-none border rounded-md" />
                              </td>
                              <td className="px-6 py-2">
                                <textarea {...register(`rows[${index}].semester5`, { required: true })} className="w-full px-2 text-black outline-none border rounded-md" />
                              </td>
                              <td className="px-6 py-2">
                                <textarea {...register(`rows[${index}].semester6`, { required: true })} className="w-full px-2 text-black outline-none border rounded-md" />
                              </td>
                            </tr>
                          </>))
                        )}
                  </tbody>
                </table>
                <div className="flex items-center w-full mx-auto">
                  {/* <button onClick={handleAddNew} className="bg-green-500 text-center hover:bg-green-600 mt-2 mb-3 mx-auto text-white font-semibold px-4 py-2 rounded-lg transition duration-300"> Add</button> */}
                  <button type='submit' className="bg-green-500 text-center hover:bg-green-600 mt-2 mb-3 mx-auto text-white font-semibold px-4 py-2 rounded-lg transition duration-300"> Submit</button>
                </div>

              </form>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 overflow-y-scroll">
                <tbody className="bg-white divide-y mt-10 divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                  {
                    feesData.map((fee, index) => (
                      <tr key={index} className="border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.heads}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester1}/-</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester2}/-</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester3}/-</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester4}/-</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester5}/-</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester6}/-</td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
              <div className="mt-5">
                <span className="text-3xl mb-4 font-extrabold"><u>Note: </u></span>
                <ul className="fees-note mt-4 py-4 text-gray-300">
                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>1. </strong></span>
                    Cheques will not be accepted. Fees to be paid through Draft / Cash / NEFT / IMPS* in favour of <strong>"Dayanand Academy Of Management Studies"</strong> Indian Bank Saket Nagar Kanpur A/c No. <strong>744583315</strong>, <strong>IFS Code: IDIB000S150* .</strong> Kindly submit NEFT/IMPS transaction ID with fee booklet in the office.
                  </li>

                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>2. </strong></span>
                    If there is a holiday on the last day the next working day will be considered as the last day.
                  </li>

                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>3. </strong></span>
                    Annual University Examination or any other fee of CSJMU will be directly submitted by the student to the university or to the institute as per directions of the CSJMU before the commencement of University Semester Examination. The examination fee is decided by the CSJMU from time to time and is not inclusive in above semester fees.
                  </li>

                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>4. </strong></span>
                    The students who are in the category of UFM / Year Back / Carry Over will be required to contact the office regarding there status for depositing there extra university fees.
                  </li>

                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>5. </strong></span>
                    The security amount will be deposited will be refunded to passed out students of that particular year only from <u><strong>1 Jan. to 31 March</strong></u> of that particular succeeding year. The security of the drop out / fail students will be forfeited.
                  </li>

                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>6. </strong></span>
                    <u><strong>Late fee / Fine charges Rs. 20 as per day after due date.</strong></u> (Fine will be paid at admission office).
                  </li>

                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>7. </strong></span>
                    Fees of any nature once deposite will not be refunded.
                  </li>

                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>8. </strong></span>
                    As per CSJM University norms <u><strong>University Registration By The Candidate is mandatory </strong></u>for taking admission, without Registration Admission stand cancelled.
                  </li>

                  <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                    <span className="text-gray-200"><strong>9. </strong></span>
                    If the candidate is interested to avail the <u><strong>SCHOLARSHIP</strong></u> which is for the weaker section of the society, provided by the <u><strong>SAMAJ-KALYAN DEPARTMENT</strong></u> of U.P. candidate has to follow the process of admission as defined by the <strong>State Government / Concerned University. (CSJM University, Kanpur for B.B.A / B.C.A)</strong>
                    <br />
                    <span className="text-gray-200 mx-10 pt-10"><strong>1. </strong></span>
                    MBA / MCA ------------------ UPCET affiliated from <strong>AKTU University, Lucknow</strong>
                    <br /><span className="text-gray-200 mx-10 pt-10"><strong>2. </strong></span>
                    MBA / MCA ------------------ <strong>CSJM University, Kanpur</strong>
                  </li>

                </ul>
              </div>
            </div>
          </>
        )}


       
      </div>
    </>
  );
}

export default CourseInformation