import React, { useEffect, useState } from 'react'
import student from "../../assets/student.png"
import teacher from "../../assets/teachers.png"
import courses from "../../assets/courses.png"
import fee from "../../assets/fee.png"
import { Link } from 'react-router-dom'
import {Link as Notice} from 'lucide-react'

const AdminHome = () => {

    const [showNoticeTodo, setShowNoticeTodo] = useState([])
    const [studentCount, setStudentCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);

    useEffect(() => {
        const getNoticeTodoData = localStorage.getItem("noticeTodo")
        if (getNoticeTodoData) {
            const parsedData = JSON.parse(getNoticeTodoData)
            if (Array.isArray(parsedData)) {
                setShowNoticeTodo(parsedData.map((noticeTodoData) => ({
                    title: noticeTodoData.text.noticeTitle,
                    detail: noticeTodoData.text.noticeDetail,
                    date: noticeTodoData.text.noticeDate
                })))
            } else if (parsedData && parsedData.text) {
                setShowNoticeTodo([{
                    title: parsedData.text.noticeTitle,
                    detail: parsedData.text.noticeDetail,
                    date: parsedData.text.noticeDate
                }]);
            }
        }

        // Fetching course count
        const studentsData = localStorage.getItem("studentTodo");
        if (studentsData) {
            const parsedStudents = JSON.parse(studentsData);
            setStudentCount(Array.isArray(parsedStudents) ? parsedStudents.length : 0);
        }

        // Fetching course count
        const coursesData = localStorage.getItem("courseTodo");
        if (coursesData) {
            const parsedCourses = JSON.parse(coursesData);
            setCourseCount(Array.isArray(parsedCourses) ? parsedCourses.length : 0);
        }

        // Fetching teacher count
        const teachersData = localStorage.getItem("teacherTodo");
        if (teachersData) {
            const parsedTeachers = JSON.parse(teachersData);
            setTeacherCount(Array.isArray(parsedTeachers) ? parsedTeachers.length : 0);
        }
    }, [])



    return (
        <>
            <div className=" w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl bg-zinc-800">
                <div className='flex w-full flex-wrap md:flex-nowrap justify-center'>
                    <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                        <img className='mx-auto my-4 w-20 h-20' src={student} alt="student" />
                        <span className=''>Total Students</span><br />
                        <span>{studentCount}</span>
                    </div>
                    <div className='box-2 h-64 mx-5 my-2 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-zinc-400 border-2 shadow-2xl shadow-black-900 px-12 md:px-0 bg-zinc-700 rounded-3xl'>
                        <img className='mx-auto my-4 w-20 h-20' src={courses} alt="courses" />
                        <span >Total Courses</span><br />
                        <span>{courseCount}</span>
                    </div>
                    <div className='box-3 h-64 mx-5 my-2 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center  border-zinc-400 border-2 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                        <img className='mx-auto my-4 w-20 h-20' src={teacher} alt="teacher" />
                        <span>Total Teachers</span><br />
                        <span>{teacherCount}</span>
                    </div>
                    <div className='box-4 h-64 mx-5 my-2 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center  border-zinc-400 border-2 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                        <img className='mx-auto my-4 w-20 h-20' src={fee} alt="fee collection" />
                        <span>Fee Collection</span><br />
                        <span>24,000</span>
                    </div>
                </div>
                <span className='mt-20 -mb-14 mx-5 cursor-pointer'><Link to="/admin/notices"><Notice/>Add Notice: </Link> </span>
                {showNoticeTodo.map((todoData, index) => (<div className='mt-20 mx-5 px-5 py-10 border-2 border-gray-500 shadow-2xl shadow-black-900  rounded-3xl' key={index}>
                    <span>Notice: {todoData.title || "N/A"}</span>
                    <p className='text-sm italic'>Date: {todoData.date || "N/A"}</p>
                    <p className='text-xl mt-5 italic'>{todoData.detail || "N/A"}</p>
                </div>))}
            </div>

        </>
    )
}

export default AdminHome