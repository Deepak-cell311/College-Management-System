import React, { useEffect, useState } from 'react'
import courseModel from "./courseModel.png"
import { useLocation } from 'react-router-dom'

const StudentAttendence = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [attendanceStatus, setAttendanceStatus] = useState("");
    const [date, setDate] = useState("")
    const [studentName, setStudentName] = useState([])
    const [attendanceTodo, setAttendanceTodo] = useState([])

    const location = useLocation()
    const { courseId, showStudentData } = location.state || {}

    console.log("showStudentData: ", showStudentData);
    console.log("studentName: ", studentName);
    
    const handleSubmit = () => {

        const attendanceTodoData = [...attendanceTodo, { id: showStudentData.studentId, courseId: courseId, text: { attendanceStatus: attendanceStatus, attendenceDate: date } }]
        setAttendanceTodo(attendanceTodoData)
        localStorage.setItem("attendanceTodo", JSON.stringify(attendanceTodoData))

        // Update the present count based on the status
        const currentAttendanceCount = JSON.parse(localStorage.getItem("attendanceCount")) || { present: 0, total: 0 };

        if (attendanceStatus === "Present") {
            currentAttendanceCount.present += 1;
        } else if (attendanceStatus === "Absent") {
            currentAttendanceCount.present -= 1; // Decrease present count if status is absent
        }

        currentAttendanceCount.total += 1; // Increment total attendance
        localStorage.setItem("attendanceCount", JSON.stringify(currentAttendanceCount));


        // clearing inputs
        setAttendanceStatus("")
        setDate("")
        console.log("attendanceTodoData: ", attendanceTodoData)
    };

    useEffect(() => {
        const getStudentNames = localStorage.getItem("studentTodo");
        if (getStudentNames) {
            const parsedData = JSON.parse(getStudentNames);
            if (Array.isArray(parsedData)) {
                setStudentName(parsedData.map((data) => ({
                    studentId: data.id,
                    studentName: data.text.studentName,
                    rollNumber: data.text.rollNumber,
                    courseId: data.courseId
                })))
            } else if (parsedData && parsedData.text) {
                setStudentName([{
                    studentId: parsedData.id,
                    studentName: parsedData.text.studentName,
                    rollNumber: parsedData.text.rollNumber,
                    courseId: parsedData.text.courseId
                }]);
            }
        }

        const savedAttendanceTodos = localStorage.getItem("attendanceTodo")
        if (savedAttendanceTodos) {
            setAttendanceTodo(JSON.parse(savedAttendanceTodos))
        }



    }, []);

    const filterName = studentName.filter((student) => student.studentId === showStudentData.id)
    console.log("filterName: ", filterName);
    console.log("showData: ", showStudentData.name)
    
    return (
        <>
            <div className={`modal backdrop-blur-3xl text-black flex flex-col justify-around  border-black-900 mx-auto w-96  md:px-0 `}>
                <h1 className='text-center text-2xl -mx-20 mt-20'> <b>Student Name: </b> {showStudentData.name} </h1>
                <div className={`${isModalOpen ? "hidden" : "block"} px-10  border-2  flex flex-col justify-center mx-auto -mt-20 `}>
                    <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
                    <label htmlFor="status">Attendence status*</label>
                    <select id="status" value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)} className="rounded-lg border-2 border-gray-900 py-2 px-4 mb-3">
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                    <label htmlFor="date">Attendence status*</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`rounded-lg font-5xl mt-1 mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                    <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-0 mb-3 cursor-pointer`} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default StudentAttendence