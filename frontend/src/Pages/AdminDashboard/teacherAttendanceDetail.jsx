import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { format } from 'date-fns';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, PieChart, CheckCircle, XCircle, User } from 'lucide-react';

const TeacherAttendanceDetail = () => {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("attendance");
    const [teacherData, setTeacherData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { teacherId } = location.state || {};

    const totalClasses = teacherData[0]?.attendance?.length || 0;
    const totalPresent = teacherData[0]?.attendance?.filter(att => att.status === "Present").length || 0;
    const attendancePercentage = totalClasses > 0 ? ((totalPresent / totalClasses) * 100).toFixed(2) + "%" : "0%";

    const attendanceChartOptions = {
        animationEnabled: true,
        theme: "dark2",
        backgroundColor: "transparent",
        title: {
            text: "Attendance Overview",
            fontColor: "#e5e7eb",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: 20
        },
        legend: {
            fontColor: "#9ca3af",
            fontFamily: "sans-serif"
        },
        data: [{
            type: "doughnut",
            innerRadius: "60%",
            showInLegend: true,
            indexLabelFontColor: "#e5e7eb",
            indexLabel: "{label}: {y}",
            toolTipContent: "<b>{label}</b>: {y} (#percent%)",
            dataPoints: [
                { y: parseFloat(totalPresent), label: "Present", color: "#3b82f6" },
                { y: totalClasses - totalPresent, label: "Absent", color: "#ef4444" }
            ]
        }]
    };

    const fetchTeacherData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Teacher/Teacher/${teacherId}`);
            if (response.data) {
                setTeacherData([{
                    ...response.data,
                    attendance: response.data.attendance.map(att => ({
                        ...att,
                        date: format(new Date(att.date), 'MMMM dd, yyyy, h:mm a')
                    }))
                }]);
            }
        } catch (error) {
            setError("Error fetching teacher data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (teacherId) fetchTeacherData();
    }, [teacherId]);

    if (!teacherId) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">No teacher selected</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Teachers
                </button>

                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#60a5fa', '#34d399', '#f472b6', '#a78bfa', '#fbbf24']} />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20">{error}</div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-100">{teacherData[0]?.name}</h1>
                                <p className="text-gray-400 mt-1 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {teacherData[0]?.email}
                                </p>
                            </div>
                            <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                                <span className="text-gray-400 text-sm">Attendance Rate</span>
                                <p className="text-2xl font-bold text-blue-400">{attendancePercentage}</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl w-fit">
                            {[
                                { id: 'attendance', icon: Calendar, label: 'Attendance' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all
                                        ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Chart Section */}
                            <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                                <CanvasJSChart options={attendanceChartOptions} />
                            </div>

                            {/* Data Table Section */}
                            <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                                <div className="p-4 border-b border-gray-700">
                                    <h2 className="text-lg font-semibold flex items-center gap-2">
                                        <PieChart className="w-5 h-5 text-blue-400" />
                                        Attendance History
                                    </h2>
                                </div>

                                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-gray-900/50 border-b border-gray-700 sticky top-0">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date & Time</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {teacherData[0]?.attendance?.map((att, index) => (
                                                <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4 text-gray-300 text-sm">{att.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                                                            ${att.status === 'Present'
                                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                                : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                                            {att.status === 'Present' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                            {att.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherAttendanceDetail;
