import React, { useEffect, useState } from 'react'
import student from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/student.png"
import teacher from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/teachers.png"
import courses from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/courses.png"
import fee from "/home/kali/Desktop/VsCode Workspace/CMS/frontend/src/assets/fee.png"

const AdminHome = () => {

    const [showNoticeTodo, setShowNoticeTodo] = useState([])

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
    }, [])

    console.log(showNoticeTodo);

    return (
        <>
            <div className="bg-white w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl">
                <div className='flex w-full flex-wrap md:flex-nowrap justify-center'>
                    <div className='box-1 h-64 mx-5 my-2 mt-20 bg-white  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-10 md:px-0'>
                        <img className='mx-auto my-4 w-20 h-20' src={student} alt="student" />
                        <span className=''>Total Students</span><br />
                        <span>0</span>
                    </div>
                    <div className='box-2 h-64 mx-5 my-2 bg-white md:h-60 md:w-1/2 md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-12 md:px-0'>
                        <img className='mx-auto my-4 w-20 h-20' src={courses} alt="courses" />
                        <span >Total Classes</span><br />
                        <span>0</span>
                    </div>
                    <div className='box-3 h-64 mx-5 my-2 bg-white md:h-60 md:w-1/2 md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-10 md:px-0'>
                        <img className='mx-auto my-4 w-20 h-20' src={teacher} alt="teacher" />
                        <span>Total Teachers</span><br />
                        <span>0</span>
                    </div>
                    <div className='box-4 h-64 mx-5 my-2 bg-white md:h-60 md:w-1/2 md:m-5 flex flex-col items-center text-black border-2 border-black-900 shadow-2xl shadow-black-900 px-10 md:px-0'>
                        <img className='mx-auto my-4 w-20 h-20' src={fee} alt="fee collection" />
                        <span>Fee Collection</span><br />
                        <span>0</span>
                    </div>
                </div>
                {showNoticeTodo.map((todoData, index) => (<div className='mt-20 mx-5 px-5 py-10 border-2 border-black-900 shadow-2xl shadow-black-900' key={index}>
                <span className='text-black '>Notice: {todoData.title || "N/A"} on {todoData.date || "N/A"}</span>
                    <p className='text-black text-xl mt-5 italic'>{todoData.detail || "N/A"}</p>
                </div>)) }
            </div>

        </>
    )
}

export default AdminHome