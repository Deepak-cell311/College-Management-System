import React, { useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import { format } from 'date-fns'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom';


const CourseStudentDetail = () => {
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("attendance")
    const [studentData, setStudentData] = useState([])
    const [marksData, setMarksData] = useState([])
    const [studentId, setStudentId] = useState(null)
    const location = useLocation()
    const handleTabChange = (tab) => setActiveTab(tab)
    const { studentTodo } = location.state || {}

    const totalClasses = studentData.length > 0 ? studentData[0].attendance.length : 0;
    const totalPresent = studentData.length > 0 ? studentData[0].attendance.filter(att => att.status === "Present").length : 0;
    const totalAbsent = studentData.length > 0 ? studentData[0].attendance.filter(att => att.status === "Absent").length : 0;
    const attendancePercentage = totalClasses > 0 ? (totalPresent / totalClasses) * 100 + " % " : 0;

    const attendance = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark1",
        title: {
            text: "Chart"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
                { y: parseFloat(totalPresent), label: "Present" },
                { y: parseFloat(totalAbsent), label: "Absent" },
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
            dataPoints: studentData.length > 0 ? studentData[0].examResult.map(item => ({
                y: item.marksObtained,
                label: item.subName
            })) : []
        }]
    }

    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Student/Student/${studentTodo}`);
            console.log("Response data:", response.data);

            if (response.data) {
                const formattedData = [{
                    _id: response.data._id,
                    name: response.data.name,
                    rollNum: response.data.rollNum,
                    sclassName: response.data.sclassName.sclassName,
                    attendance: response.data.attendance.map((student) => ({
                        status: student.status,
                        date: student.date
                    })),
                    examResult: response.data.examResult.map((result) => ({
                        subName: result.subName,
                        marksObtained: result.marksObtained
                    }))
                }];
                console.log("formattedData: ", formattedData)
                setStudentData(formattedData);
            }
        } catch (error) {
            setError("Error fetching student data.");
            console.error("Error fetching student data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    console.log("studentData ddd: ", studentData)
    const studentInfo = fetchStudentData()
    console.log("fetchStudentData", studentInfo)

    useEffect(() => {
        const initialStudentId = studentId;
        setStudentId(initialStudentId);
    }, []);

    useEffect(() => {
        if (studentId) {
            fetchStudentData(studentId);
        }
    }, [studentId]);



    useEffect(() => {
        if (studentId) {
            fetchStudentData();
        }
    }, [studentId]);

    console.log("studentInform: ", studentData);


    return (
        <div className='w-full bg-zinc-800 h-auto pb-80'>
            <nav>
                <ul className='flex p-3  shadow shadow-black'>
                    <li onClick={() => handleTabChange("attendance")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'attendence' ? 'text-gray-500' : ''}`}>ATTENDENCE</li>
                    <li onClick={() => handleTabChange("marks")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'marks' ? 'text-gray-500' : ''}`}>MARKS</li>
                </ul>
            </nav>
            <div className='mx-5'>
                {activeTab === "attendance" && (<>
                    <h1 className='text-5xl text-center mt-10 font-extrabold'><u>Attendance</u></h1>
                    <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10`}>
                        <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className='px-6 py-3'>Name</th>
                                <th scope="col" className='px-6 py-3'>Roll No</th>
                                <th scope="col" className='px-6 py-3'>Course</th>
                                <th scope="col" className='px-6 py-3'>Total Present</th>
                                <th scope="col" className='px-6 py-3'>Total Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? (
                                    <tr>
                                        <td colSpan="5">
                                            <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
                                        </td>
                                    </tr>
                                ) :
                                    (
                                        studentData.map((student, index) => (
                                            <tr key={index} className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`}  >
                                                <th className='px-6 py-4 text-black font-bold'>{student.name}</th>
                                                <th className='px-6 py-4 text-black font-bold'>{student.rollNum}</th>
                                                <th className='px-6 py-4 text-black font-bold'>{student.sclassName}</th>
                                                <th className='px-6 py-4 text-black font-bold'>{student.attendance.filter((student) => student.status === "Present").length}</th>
                                                <th className='px-6 py-4 text-black font-bold'>{attendancePercentage}</th>
                                            </tr>
                                        ))
                                    )}
                        </tbody>
                    </table>

                    <div className='mt-10 mx-80'>
                        <div className='absolute left-80'>
                            <h1 className='text-3xl text-center mb-2'>Detail</h1>
                            <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
                                <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        <th scope="col" className='px-6 py-3'>Date</th>
                                        <th scope="col" className='px-6 py-3'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.length > 0 && studentData[0].attendance.length > 0 ? (
                                        studentData[0].attendance.map((student, index) => (
                                            <tr key={index} className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`}  >
                                                <th className='px-6 py-4 text-black font-bold'>{format(new Date(student.date), 'MMMM dd, yyyy, h:mm a')}</th>
                                                <th className='px-6 py-4 text-black font-bold'>{student.status}</th>
                                            </tr>
                                        ))) :
                                        (<tr>
                                            <td colSpan="2" className="text-center">No attendance records available.</td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className=' w-10/12 border-2 border-zinc-800 mx-44'>
                            <div className='mt-20'>
                                <CanvasJSChart options={attendance} className="mt-96" /></div>
                        </div>
                    </div>

                </>)}
            </div>

            {activeTab === "marks" && (
                <>
                    <div className={`text-black  mx-5 mt-5 mb-20`}>
                        <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
                            <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope="col" className='px-6 py-3'>Subject Name</th>
                                    <th scope="col" className='px-6 py-3'>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData[0].examResult.length > 0 ? (
                                    studentData[0].examResult.map((result, index) => (
                                        <tr key={index} className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`}  >
                                            <th className='px-6 py-4 text-black font-bold'>{result.subName}</th>
                                            <th className='px-6 py-4 text-black font-bold'>{result.marksObtained}</th>
                                        </tr>
                                    ))) :
                                    (<tr>
                                        <td colSpan="2" className="text-center">No marks records available.</td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className='mx-60'>
                        <CanvasJSChart options={marks} className="mt-96" />
                    </div>


                </>
            )}
        </div>
    )
}

export default CourseStudentDetail