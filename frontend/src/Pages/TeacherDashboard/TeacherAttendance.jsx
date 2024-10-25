import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TeacherAttendance = () => {
    const [studentData, setStudentData] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`http://192.168.149.125:5000/Student/ClassStudents/6704c0485811b5fa01f8b288`);
            if (Array.isArray(response.data)) {
                const formattedStudents = response.data.map((student) => ({
                    _id: student._id,
                    rollNum: student.rollNum,
                    name: student.name,
                    present: false
                }));
                setStudentData(formattedStudents);
            } else {
                toast.info(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while fetching students");
            console.error(error.response);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);

    const handleAttendanceChange = (id) => {
        setStudentData((prevData) =>
            prevData.map((student) =>
                student._id === id ? { ...student, present: !student.present } : student
            )
        );
    };

    const handleSelectAll = (selected) => {
        setStudentData((prevData) => prevData.map((student) => ({ ...student, present: selected })));
    };

    const handleSubmit = async () => {
        if (studentData.length === 0) {
            toast.warning("No students found in the class.");
            return;
        }

        setIsSubmitting(true);
        const currentDate = new Date().toISOString();
        const subjectId = "6707f384ca890fd8648604a9"; 

        try {
            
            const attendanceData = studentData.map(student => ({
                studentId: student._id,
                status: student.present ? "Present" : "Absent",
                date: currentDate,
                subjectId: subjectId
            }));

            const response = await axios.put(`http://192.168.149.125:5000/Student/StudentAttendances`, {
                    attendanceData,
                    subjectId
                }
            );
            console.log("response: ", response.data)

            if (response.data.success) {
                toast.success("Attendance submitted successfully!");
                setStudentData(prevData => prevData.map(student => ({ ...student, present: false })));
                fetchStudentData();
            } else {
                toast.warning(response.data.message || "Submission completed with some issues");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit attendance");
            console.error("Attendance submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-4xl">
                <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                    Student Attendance
                </h2>

                <div className="mb-4 flex justify-end space-x-4">
                    <button
                        onClick={() => handleSelectAll(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Mark All Present
                    </button>
                    <button
                        onClick={() => handleSelectAll(false)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Mark All Absent
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Roll No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                            {studentData.map((student) => (
                                <tr 
                                    key={student._id} 
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                        {student.rollNum || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                        {student.name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={student.present}
                                                onChange={() => handleAttendanceChange(student._id)}
                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                            />
                                            <span className={`text-sm ${student.present ? 'text-green-600' : 'text-red-600'}`}>
                                                {student.present ? 'Present' : 'Absent'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherAttendance;