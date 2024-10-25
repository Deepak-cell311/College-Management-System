import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const AdminStudents = () => {
    const [studentTodo, setStudentTodo] = useState([])
    const navigate = useNavigate()
    const handleView = (student) => {
        navigate("/admin/students", { state: { showStudentData: student, subjectData: { text: { sessions: 10, subName: "Subject Name" } } } });
    };
    console.log(studentTodo)
    const fetchAllStudent = async (data) => {
        try {
            const response = await axios.get(`http://192.168.149.125:5000/Student/Students`);
            if (Array.isArray(response.data)) {
                const formattedData = response.data.map((student) => ({
                    _id: student._id || "N/A",
                    name: student.name || "Unknown",
                    rollNum: student.rollNum || "N/A",
                    attendance: student.attendance
                }))
                setStudentTodo(formattedData);
            } else {
                toast.error("Failed to fetch subjects.");
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "An error occurred while fetching subjects.");
        }
    };

    useEffect(() => {
        fetchAllStudent()
    }, [])

    return (
        <>
            <div className='bg-zinc-800 w-full'>
                <div className=' flex flex-wrap md:flex-nowrap md:flex-col h-auto mx-10'>
                    <h1 className='tracking-wide mb-4 mt-10 text-center text-3xl'>Student List </h1>
                    <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
                        <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className='px-6 py-3'>Student Name</th>
                                <th scope="col" className='px-6 py-3'>Roll number</th>
                                <th scope="col" className='px-6 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentTodo.map((student, index) => (
                                <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={index} >
                                    <th className='px-6 py-4 text-black font-bold'>{student.name}</th>
                                    <th className='px-6 py-4 text-black font-bold'>{student.rollNum}</th>
                                    <th className='px-6 py-4 text-black font-bold'>
                                        <div className='-mx-5'>
                                            <button className={`bg-cyan-500 hover:bg-cyan-600 px-3 py-2  rounded-lg cursor-pointer`} onClick={() => handleView(student)}>View</button>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminStudents