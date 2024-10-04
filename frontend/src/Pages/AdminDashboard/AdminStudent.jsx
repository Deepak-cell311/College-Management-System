import React, { useEffect, useState } from 'react'
import { LogIn, Trash2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import courseModel from "./courseModel.png"


const AdminSubject = () => {

  const [studentTodo, setStudentTodo] = useState([])
  const [activeTab, setActiveTab] = useState("details")
  const [subjectTodo, setSubjectTodo] = useState([])
  const [attendanceTodo, setAttendanceTodo] = useState([])
  const [attendanceCount, setAttendanceCount] = useState({ present: 0, total: 0 });
  const [isModalOpen, setIsModalOpen] = useState("")
  const [marksTodo, setMarksTodo] = useState([])
  const [subjectName, setSubjectName] = useState("")
  const [totalMarks, setTotalMarks] = useState("")


  const handleTabChange = (tab) => setActiveTab(tab)


  const location = useLocation()
  const { courseId, showStudentData } = location.state || {}

  const deleteStudentTodo = (id) => {
    const updatedStudentTodo = studentTodo.filter(student => student.id !== id);
    setStudentTodo(updatedStudentTodo);
    localStorage.setItem("studentTodo", JSON.stringify(updatedStudentTodo));
  };

  // take student data from the local storage 
  useEffect(() => {
    const getStudentNames = localStorage.getItem("studentTodo");
    if (getStudentNames) {
      const parsedData = JSON.parse(getStudentNames);
      if (Array.isArray(parsedData)) {
        setStudentTodo(parsedData.map((data) => ({
          studentId: data.id,
          studentName: data.text.studentName,
          rollNumber: data.text.rollNumber,
          courseId: data.courseId
        })))
      } else if (parsedData && parsedData.text) {
        setStudentTodo([{
          studentId: parsedData.id,
          studentName: parsedData.text.studentName,
          rollNumber: parsedData.text.rollNumber,
          courseId: parsedData.text.courseId
        }]);
      }
    }

    // Getting subject todo data from the local storage
    const subjectTodoData = localStorage.getItem("subjectTodo")
    if (subjectTodoData) {
      const parsedData = JSON.parse(subjectTodoData);
      if (Array.isArray(parsedData)) {
        setSubjectTodo(parsedData.map((data) => ({
          subjectId: data.id,
          subjectName: data.text.subjectName,
          courseId: data.courseId,
          sessions: data.text.subjectSessions
        })))
      } else if (parsedData && parsedData.text) {
        setSubjectTodo([{
          studentId: parsedData.id,
          courseId: parsedData.text.courseId,
          studentName: parsedData.text.studentName,
        }]);
      }
    }

    // Getting attendance todo data from the local storage
    const attendenceTodoData = localStorage.getItem("attendanceTodo")
    if (attendenceTodoData) {
      const parsedData = JSON.parse(attendenceTodoData);
      if (Array.isArray(parsedData)) {
        setAttendanceTodo(parsedData.map((data) => ({
          attendanceId: data.id,
        })))
      } else if (parsedData && parsedData.text) {
        setAttendanceTodo([{
          attendanceId: parsedData.id,

        }]);
      }
    }
  }, [])

  // Add marks data
  const addMarksData = () => {
    const addMarksData = [...marksTodo, { id: showStudentData.studentId, courseId: courseId, subjectName: subjectName, totalMarks: totalMarks  }]
    setMarksTodo(addMarksData)
    localStorage.setItem("marksTodo", JSON.stringify(addMarksData))
    setSubjectName(""); 
    setTotalMarks("");
  }

  const getAttendancePercentage = (subjectId) => {
    // Filter attendance records for the specific student and subject
    const studentAttendance = attendanceTodo.filter((record) => record.studentId === showStudentData.studentId && record.subjectId === subjectId);
    const totalSessions = subjectTodo.find(subject => subject.subjectId === subjectId)?.sessions || 0;
    const presentCount = studentAttendance.filter(record => record.isPresent).length;
  
    return totalSessions > 0 ? ((presentCount / totalSessions) * 100).toFixed(2) + '%' : '0.00%';
  };

  useEffect(() => {
    const savedAttendanceCount = localStorage.getItem("attendanceCount");
    if (savedAttendanceCount) {
      setAttendanceCount(JSON.parse(savedAttendanceCount));
    }

    const savedMarksData = localStorage.getItem("marksTodo")
    if(savedMarksData){
      setMarksTodo(JSON.parse(savedMarksData))
    }
  }, []);

  const filterName = studentTodo.filter((filteredStudent) => filteredStudent.studentId === showStudentData.studentId)
  const filterMarksTodo = marksTodo.filter((marks) => marks.id === showStudentData.studentId)
  const filterAttendanceData = attendanceTodo.filter((attendance) => attendance.id === showStudentData.studentId)
  console.log("filterMarksTodo: ", filterMarksTodo);
  console.log("attendenceTodo: ", attendanceTodo);
  





  return (
    <>


      <div className='w-full text-black'>
        <nav>
          <ul className='flex p-3 border-2 shadow shadow-black'>
            <li onClick={() => handleTabChange("details")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'details' ? 'text-blue-500' : ''}`} >DETAILS</li>
            <li onClick={() => handleTabChange("attendence")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'attendence' ? 'text-blue-500' : ''}`}>ATTENDENCE</li>
            <li onClick={() => handleTabChange("marks")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'marks' ? 'text-blue-500' : ''}`}>MARKS</li>
          </ul>
        </nav>

        <div>
          {activeTab === "details" && (<>
            <h1 className='text-3xl text-center mt-10 font-extrabold'>Students Detail</h1>
            <div className='bg-black text-white py-4 px-4 flex justify-between mx-5 mt-5 '>
              <span>Student Name</span>
              <span>Roll Number</span>
              <span>Action</span>
            </div>
            <ul className={`text-black`}>
              {
                filterName.map((name) => (
                  <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={name.id}>
                    <span className=''>{name.studentName}</span>
                    <span className='w-52'>{name.rollNumber}</span>
                    <div className='flex'>
                      <button onClick={() => deleteStudentTodo(name.id)}><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" /></button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </>)}
          {activeTab === "attendence" && (<>
            <h1 className='text-3xl text-center mt-10 font-extrabold'>Attendence Detail</h1>
            <div className='bg-black text-white py-4 px-4 flex justify-between mx-5 mt-5 '>
              <div className='flex justify-between px-2'>
                <span className=''>Subject</span>
                <span className='mx-10'>Present</span>
                <span className='mx-10'>Total Sessions</span>
                <span className='mx-10'>Attendence Percentage</span>
              </div>
              <span className='mx-20'>Action</span>
            </div>
            <ul className={`text-black`}>
              {
                subjectTodo.map((subject) => (
                  <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={subject.id}>
                    <span className=''>{subject.subjectName}</span>
                    <span className=''>{1}</span>
                    <span className='w-52'>{subject.sessions}</span>
                    <span className='w-52'> {attendanceCount.total > 0 ? ((attendanceCount.total / subject.sessions) * 100).toFixed(2) + '%' : '0.00%'}</span>
                    <div className='flex'>
                      <button className='bg-cyan-400 rounded px-5 py-2' onClick={() => deleteStudentTodo(subject.id)}>Details</button>
                      <button onClick={() => deleteStudentTodo(subject.id)}><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" /></button>
                      <button className='bg-red-400 rounded px-5 py-2' onClick={() => deleteStudentTodo(subject.id)}>Change</button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </>)}

          {activeTab === "marks" && (
            <>
              <div className={`modal backdrop-blur-3xl text-black flex flex-col justify-around  border-black-900  mx-auto w-96 mt-6  md:px-0 `}>
                <div className={`${isModalOpen ? "hidden" : "block"} px-10 mt-10 border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
              <h1 className='text-center text-2xl -mx-20 mt-20'> <b>Student Name: </b> {showStudentData.name} </h1>
                  <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
                  <label htmlFor="subjectName"></label>
                  <select required type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} name='subjectName' id='subjectName' className={`rounded-lg font-5xl mt-5 mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} >
                  <option value="" disabled>Select Subject</option>
                    {subjectTodo.map((subject) => (
                      <option key={subject.subjectId} value={subject.subjectName}>{subject.subjectName}</option>
                    ))}
                  </select>
                  <label htmlFor="marks"></label>
                  <input required type="text" name='marks' id='marks' placeholder='Marks*' value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-12 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                  <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer`}  onClick={() => {addMarksData(); setIsModalOpen(true)}}>Create Marks</button>
                </div>
              </div>

              <div className={` ${isModalOpen ? "block" : "hidden"} text-black  mx-5 px-10 `}>
                <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={() => setIsModalOpen(!isModalOpen)}>Add Marks</button>
                <h1 className='text-3xl mb-2'>Marks Detail :</h1>
                <div className='bg-black text-white px-5 py-5 pr-20 flex justify-around '>
                  <span>Subject Name</span>
                  <span>Marks</span>
                </div>
                <ul className={`text-black`}>
                  {filterMarksTodo.map((marks, index) => (<>
                      <li key={index} className={`flex justify-around text-center mx-auto mt-3 px-7`} >
                        <span className=''>{ marks.subjectName }</span>
                        <span className=''>{ marks.totalMarks }</span>
                      </li>
                    </>))
                  }
                </ul>
              </div>

            </>
          )}
        </div>
      </div>
    </>
  )
}
export default AdminSubject



