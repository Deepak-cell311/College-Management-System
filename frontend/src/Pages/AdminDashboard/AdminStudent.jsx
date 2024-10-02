import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import students from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/student.png"
import teacher from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/teachers.png"

const AdminStudent = () => {
    const [activeTab, setActiveTab] = useState("details")
    const [studentData, setStudentData] = useState([]);

    const location = useLocation()

    const { courseName, studentTodo } = location.state || {}
    console.log("studentTodo: ", studentTodo.studentId);
    console.log("studentData: ", studentData);
    
    const handleTabChange = (tab) => setActiveTab(tab)

    // UseEffect hook for the student data fetch from local storage
    useEffect(() => {
        const savedData = localStorage.getItem('studentTodo')
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            if (Array.isArray(parsedData)) {
                setStudentData(parsedData.map(student => ({
                    studentId: student.id,
                    name: student.text.studentName,
                    rollNumber: student.text.rollNumber,
                    courseId: student.courseId
                })));
            }
        }
    }, [])


    const filterStudentData = studentData.filter((student) => student.studentId === studentTodo.studentId)
    console.log("filter data: ", filterStudentData);
    
    
    return (
        <>
            <div className='text-black w-full'>
                <nav>
                    <ul className='flex p-3 border-2 shadow shadow-black'>
                        <li onClick={() => handleTabChange("details")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'details' ? 'text-blue-500' : ''}`} >DETAILS</li>
                        <li onClick={() => handleTabChange("attendence")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'attendence' ? 'text-blue-500' : ''}`}>ATTENDENCE</li>
                        <li onClick={() => handleTabChange("marks")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'marks' ? 'text-blue-500' : ''}`}>MARKS</li>
                    </ul>
                </nav>
                <div className="bg-white w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl">
                    <span className='tracking-wide mb-4 mt-10 text-center text-3xl'>Course: {courseName || "N/A"}</span>
                    {filterStudentData.map((student, index) => (
                        <li key={index} className='flex w-full flex-wrap md:flex-nowrap justify-center'>
                            <div className='box-2 h-auto mx-5 my-1 bg-white md:h-auto md:w-1/2 md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-12 md:px-0'>
                                <img className='mx-auto my-4 w-20 h-20' src={students} alt="student name" />
                                <span >Student Name</span><br />
                                <span className='text-green-700'>{student.name}</span>
                            </div>
                            <div className='box-3 h-auto mx-5 my-2 bg-white md:h-auto md:w-1/2 md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-10 md:px-0'>
                                <img className='mx-auto my-4 w-20 h-20' src={teacher} alt="roll number" />
                                <span>Roll Number</span><br />
                                <span className='text-green-700'>{student.rollNumber}</span>
                            </div>
                        </li>))}
                </div>
            </div>
        </>
    )
}

export default AdminStudent