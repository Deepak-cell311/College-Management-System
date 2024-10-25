import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import courseModel from "./courseModel.png"
import { toast } from 'react-toastify'
import axios from 'axios'
import { format } from 'date-fns'
import CanvasJSReact from '@canvasjs/react-charts';
import { useForm } from 'react-hook-form'

const AdminStudent = () => {

  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [activeTab, setActiveTab] = useState("details")
  const [isModalOpen, setIsModalOpen] = useState("")
  const [marksData, setMarksData] = useState([])

  const handleTabChange = (tab) => setActiveTab(tab)

  const location = useLocation()
  const { showStudentData = {}, courseName, subjectData } = location.state || {};

  const { handleSubmit, register } = useForm()
  const onError = (errors) => {
    Object.values(errors).forEach(
      error => { toast.error(error.message) }
    )
  }

  const showAttendence = () => {
    if (!showStudentData || !Array.isArray(showStudentData.attendance)) return 0; 
    const data = showStudentData.attendance;
    let count = 0;
    data.forEach((status) => {
      if (status.status === "Present") count++;
    });
    return count;
  };

  const absentStudentCount = () => {
    if (!showStudentData || !Array.isArray(showStudentData.attendance)) return 0; 
    const data = showStudentData.attendance;
    let count = 0;
    data.forEach((status) => {
      if (status.status === "Absent") count++;
    });
    return count;
  };


  const totalAttendanceCount = showAttendence()
  const absentStudent = absentStudentCount()
  const attendancePercentage = totalAttendanceCount > 0 ? ((totalAttendanceCount / subjectData.text.sessions) * 100).toFixed(2) + '%' : '0.00%'   // for present student
  const absent = absentStudent > 0 ? ((absentStudent / subjectData.text.sessions) * 100).toFixed(2) + '%' : '0.00%'   // for absent student

  const attendance = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark1",
    title: {
      text: "Attendance"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
        { y: parseFloat(attendancePercentage), label: "Present" },
        { y: parseFloat(absent), label: "Absent" },

      ]
    }]
  }
  const marks = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark1",
    title: {
      text: "Marks"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: marksData.map(item => ({
        y: item.marksObtained,
        label: item.subName
      }))
    }]
  }

  const handleMarks = async (data) => {
    try {
      const response = await axios.put(`http://192.168.149.125:5000/Student/UpdateExamResult/${showStudentData._id}`, {
        subName: data.subName || "Unknown",
        marksObtained: data.marksObtained || "N/A"
      });
      console.log("response of marks: ", response.data)
      if (response.status === 200 && response.data.examResult) {
        setMarksData(response.data.examResult);
        toast.success("Marks added successfully");
        setIsModalOpen(true);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      console.log(error.response)
      toast.error(error.message);
    }
  };

  const fetchMarksData = async () => {
    try {
      const response = await axios.get(`http://192.168.149.125:5000/Student/Student/${showStudentData._id}`);
      console.log("Response data:", response.data);
      if (response.data && response.data.examResult) {
        setMarksData(response.data.examResult);
      } else {
        toast.info("No exam results found for this student");
      }
    } catch (error) {
      console.log(error.response)
      toast.error(error.response?.data?.message || "An error occurred while fetching exam results");
    }
  };

  console.log("marksData: ", marksData);
  

  useEffect(() => {
    fetchMarksData();
  }, []);

  return (
    <>
      <div className='w-full bg-zinc-800 '>
        <nav>
          <ul className='flex p-3  shadow shadow-black'>
            <li onClick={() => handleTabChange("details")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'details' ? 'text-gray-500' : ''}`} >DETAILS</li>
            <li onClick={() => handleTabChange("attendence")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'attendence' ? 'text-gray-500' : ''}`}>ATTENDENCE</li>
            <li onClick={() => handleTabChange("marks")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'marks' ? 'text-gray-500' : ''}`}>MARKS</li>
          </ul>
        </nav>

        <div className='mx-5'>
          {activeTab === "details" && showStudentData && (<>
            <h1 className='text-5xl bold text-center mt-10 font-extrabold mb-5'><u>Students Detail</u></h1>
            <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
              <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope="col" className='px-6 py-3'>Student Name</th>
                  <th scope="col" className='px-6 py-3'>Roll Number</th>
                  <th scope="col" className='px-6 py-3'>Course</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`}  >
                  <th className='px-6 py-4 text-black font-bold'>{showStudentData.name || "N/A"}</th>
                  <th className='px-6 py-4 text-black font-bold'>{showStudentData.rollNum || "N/A"}</th>
                  <th className='px-6 py-4 text-black font-bold'>{courseName}</th>
                </tr>
              </tbody>
            </table>
            <div className='flex mt-10 '>
              <div className='w-3/4 border-2'>
                <CanvasJSChart options={attendance} />
              </div>
              <div className='mx-3 border-2 w-3/4'>
                <CanvasJSChart options={marks}
                />
              </div>

            </div>
          </>)}
          {activeTab === "attendence" && (<>
            <h1 className='text-5xl text-center mt-10 font-extrabold'><u>Attendance</u></h1>
            <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10`}>
              <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope="col" className='px-6 py-3'>Subject</th>
                  <th scope="col" className='px-6 py-3'>Present</th>
                  <th scope="col" className='px-6 py-3'>Total Sessions</th>
                  <th scope="col" className='px-6 py-3'>Attendence Percentage</th>
                  <th scope="col" className='px-6 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
               {showStudentData.attendance.map((attendance) => ( 
                <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`}  >
                  <th className='px-6 py-4 text-black font-bold'>{attendance.subName || "N/A"}</th>
                  <th className='px-6 py-4 text-black font-bold'>{totalAttendanceCount}</th>
                  <th className='px-6 py-4 text-black font-bold'>{subjectData?.text?.sessions || "N/A"}</th>
                  <th className='px-6 py-4 text-black font-bold'> {attendancePercentage}</th>
                  <th className='px-6 py-4 text-black font-bold'>
                    <button className='bg-cyan-400 rounded px-5 py-2' >Details</button>
                    <button ><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" /></button>
                    <button className='bg-red-400 rounded px-5 py-2'> Change</button>
                  </th>
                </tr>))}
              </tbody>
            </table>
            <span className='text-xl italic mt-5'>Overall Attendance Percentage: {attendancePercentage}</span>

            <div className='mt-5 mx-10'>
              <h1 className='text-3xl text-center mb-2'>Attendance Detail</h1>
              <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
                <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope="col" className='px-6 py-3'>Date</th>
                    <th scope="col" className='px-6 py-3'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Array.isArray(showStudentData?.attendance) ? (
                      showStudentData.attendance.map((attendance) => (
                        <tr key={attendance._id} className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`}  >
                          <th className='px-6 py-4 text-black font-bold'>{format(new Date(attendance.date), 'MMMM dd, yyyy, h:mm a')}</th>
                          <th className='px-6 py-4 text-black font-bold'>{attendance.status}</th>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center">No attendance records available.</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </>)}

          {activeTab === "marks" && (
            <>
              <div className={`modal backdrop-blur-3xl  flex flex-col justify-around  border-black-900  mx-auto w-96 mt-6 md:px-0 `}>
                <h1 className='text-5xl text-center mt-3 font-extrabold'><u>Marks</u></h1>
                <form onSubmit={handleSubmit(handleMarks, onError)} className={`${isModalOpen ? "hidden" : "block"} px-10 text-black bg-white mt-10 border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
                  <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
                  <label htmlFor="subName" className='text-xl'>Subject Name</label>
                  <input type="text" placeholder='Subject Name' {...register("subName", { required: "Subject Name is required", minLength: { value: 2, message: "Minimum 2 character is required" } })} className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                  <label htmlFor="marksObtained" className='text-xl'>Marks</label>
                  <input type="number" {...register("marksObtained", { required: "Marks is required" })} name='marksObtained' id='marksObtained' placeholder='Marks' className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-28 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                  <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer`}>Create Marks</button>
                </form>
              </div>

              <div className={`${isModalOpen ? "block" : "hidden"} text-black  mx-5 mt-5 `}>
                <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
                  <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope="col" className='px-6 py-3'>Subject Name</th>
                      <th scope="col" className='px-6 py-3'>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marksData.map((marks, index) => (
                      <tr key={index} className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`}  >
                        <th className='px-6 py-4 text-black font-bold'>{marks.subName}</th>
                        <th className='px-6 py-4 text-black font-bold'>{marks.marksObtained}</th>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
                <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={() => setIsModalOpen(!isModalOpen)}>Add Marks</button>
              </div>

            </>
          )}



        </div>
      </div >
    </>
  )
}
export default AdminStudent



