import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as Notice } from 'lucide-react';
import student from "../../assets/student.png"
import courses from "../../assets/courses.png"
import teacher from "../../assets/teachers.png"
import fee from "../../assets/fee.png"
import {
    Bell,
    BookOpen,
    DollarSign,
    GraduationCap,
    Plus,
    Users
} from 'lucide-react';

import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

const AdminHome = () => {
    const [studentCount, setStudentCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);
    const [noticeList, setNoticeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Count the total number of students
    const tStudentCount = async () => {
        try {
            const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Student/Students`)
            setStudentCount(response.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    // count the total number of teachers
    const tTeacherCount = async () => {
        try {
            const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Teacher/Teachers`)
            setTeacherCount(response.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch Notice List
    const fetchNoticeList = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Notice/NoticeList`)
            setNoticeList(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.log("error: ", error)
            setError("Failed to fetch notices");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Fetching course count
        const coursesData = localStorage.getItem("courseTodo");
        if (coursesData) {
            const parsedCourses = JSON.parse(coursesData);
            setCourseCount(Array.isArray(parsedCourses) ? parsedCourses.length : 0);
        }
        tStudentCount();
        tTeacherCount();
        fetchNoticeList();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-100">Dashboard Overview</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<img src={student} alt="Student" className="w-8 h-8" />}
                        label="Total Students"
                        value={studentCount}
                        color="bg-blue-500/10"
                    />
                    <StatCard
                        icon={<img src={courses} alt="Courses" className="w-8 h-8" />}
                        label="Total Courses"
                        value={courseCount}
                        color="bg-purple-500/10"
                    />
                    <StatCard
                        icon={<img src={teacher} alt="Teacher" className="w-8 h-8" />}
                        label="Total Teachers"
                        value={teacherCount}
                        color="bg-green-500/10"
                    />
                    <StatCard
                        icon={<img src={fee} alt="Fee" className="w-8 h-8" />}
                        label="Fee Collection"
                        value="24,000"
                        color="bg-yellow-500/10"
                    />
                </div>

                {/* Notices Section */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Bell className="w-5 h-5 text-blue-400" />
                            Notice Board
                        </h2>
                        <Link
                            to="/admin/notices"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add Notice
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="loading"
                                colors={['#60a5fa', '#34d399', '#f472b6', '#a78bfa', '#fbbf24']}
                            />
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-400 py-10 bg-red-500/10 rounded-lg">
                            {error}
                        </div>
                    ) : noticeList.length === 0 ? (
                        <div className="text-center text-gray-400 py-10">
                            No notices found.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {noticeList.map((notice, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg text-gray-200 group-hover:text-blue-400 transition-colors">
                                            {notice.title || "Untitled Notice"}
                                        </h3>
                                        <span className="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded">
                                            {notice.date ? new Date(notice.date).toLocaleDateString() : "N/A"}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {notice.details || "No details available."}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                {icon}
            </div>
            <span className="text-2xl font-bold text-white">{value || 0}</span>
        </div>
        <p className="text-gray-400 font-medium">{label}</p>
    </div>
);

export default AdminHome;
