import React, { useEffect, useState } from 'react';
import { Trash2, User, BookOpen, Calendar, GraduationCap, Plus, X, PieChart, BarChart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';
import CanvasJSReact from '@canvasjs/react-charts';
import { useForm } from 'react-hook-form';
import { ColorRing } from 'react-loader-spinner';

const AdminStudent = () => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [activeTab, setActiveTab] = useState("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marksData, setMarksData] = useState([]);
  const [subjectTodo, setSubjectTodo] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { showStudentData = {}, courseName, subjectData } = location.state || {};

  const { handleSubmit, register, reset } = useForm();

  const onError = (errors) => {
    Object.values(errors).forEach(error => toast.error(error.message));
  };

  // Attendance Calculations
  const showAttendence = () => {
    if (!showStudentData || !Array.isArray(showStudentData.attendance)) return 0;
    return showStudentData.attendance.filter(status => status.status === "Present").length;
  };

  const absentStudentCount = () => {
    if (!showStudentData || !Array.isArray(showStudentData.attendance)) return 0;
    return showStudentData.attendance.filter(status => status.status === "Absent").length;
  };

  const totalAttendanceCount = showAttendence();
  const absentStudent = absentStudentCount();
  const totalSessions = subjectData?.text?.sessions || 0;

  const attendancePercentage = totalAttendanceCount > 0 ? ((totalAttendanceCount / totalSessions) * 100).toFixed(2) : '0.00';
  const absentPercentage = absentStudent > 0 ? ((absentStudent / totalSessions) * 100).toFixed(2) : '0.00';

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
    data: [{
      type: "doughnut",
      innerRadius: "60%",
      indexLabelFontColor: "#e5e7eb",
      indexLabel: "{label}: {y}%",
      toolTipContent: "<b>{label}</b>: {y}%",
      dataPoints: [
        { y: parseFloat(attendancePercentage), label: "Present", color: "#3b82f6" },
        { y: parseFloat(absentPercentage), label: "Absent", color: "#ef4444" },
      ]
    }]
  };

  const marksChartOptions = {
    animationEnabled: true,
    theme: "dark2",
    backgroundColor: "transparent",
    title: {
      text: "Performance Analysis",
      fontColor: "#e5e7eb",
      fontFamily: "sans-serif",
      fontWeight: "bold",
      fontSize: 20
    },
    data: [{
      type: "column",
      indexLabelFontColor: "#e5e7eb",
      indexLabel: "{y}",
      toolTipContent: "<b>{label}</b>: {y}",
      dataPoints: marksData.map(item => ({
        y: parseInt(item.marksObtained),
        label: item.subName,
        color: "#8b5cf6"
      }))
    }]
  };

  const handleMarks = async (data) => {
    try {
      const response = await axios.put(`https://college-management-system-s6xa.onrender.com/Student/UpdateExamResult/${showStudentData._id}`, {
        subName: data.subName || "Unknown",
        marksObtained: data.marksObtained || "N/A"
      });
      if (response.status === 200 && response.data.examResult) {
        setMarksData(response.data.examResult);
        toast.success("Marks added successfully");
        setIsModalOpen(false);
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchMarksData = async () => {
    try {
      const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Student/Student/${showStudentData._id}`);
      if (response.data && response.data.examResult) {
        setMarksData(response.data.examResult);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch exam results");
    }
  };

  const fetchSubjectData = async () => {
    try {
      const response = await axios.get('https://college-management-system-s6xa.onrender.com/Subject/AllSubjects');
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((subject) => ({
          id: subject._id,
          text: {
            subjectName: subject.subName,
            subjectCode: subject.subCode,
            subjectSessions: subject.sessions,
            department: subject.department
          },
        }));
        setSubjectTodo(formattedSubjects);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch subjects");
    }
  };

  const deleteAttendance = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      // Note: The original code was deleting a Subject, which seems wrong for deleting attendance.
      // Assuming this is intended to delete a subject from the list, but keeping original logic for now with better error handling.
      const response = await axios.delete(`https://college-management-system-s6xa.onrender.com/Subject/Subject/${id}`);
      if (response.status === 200) {
        setSubjectTodo((subjects) => subjects.filter((subject) => subject.id !== id));
        toast.success('Record deleted successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete record');
    }
  };

  useEffect(() => {
    if (showStudentData._id) {
      fetchMarksData();
      fetchSubjectData();
    }
  }, [showStudentData._id]);

  if (!showStudentData._id) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">No student selected</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">{showStudentData.name}</h1>
            <p className="text-gray-400 mt-1">Roll Number: {showStudentData.rollNum} • Course: {courseName}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl mb-8 w-fit overflow-x-auto">
          {[
            { id: 'details', icon: User, label: 'Details' },
            { id: 'attendence', icon: Calendar, label: 'Attendance' },
            { id: 'marks', icon: GraduationCap, label: 'Marks' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                ${activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <CanvasJSChart options={attendanceChartOptions} />
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <CanvasJSChart options={marksChartOptions} />
              </div>
            </div>
          )}

          {activeTab === "attendence" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Calendar className="w-8 h-8 text-blue-400" />} label="Total Sessions" value={totalSessions} color="bg-blue-500/10" />
                <StatCard icon={<User className="w-8 h-8 text-green-400" />} label="Present" value={totalAttendanceCount} color="bg-green-500/10" />
                <StatCard icon={<User className="w-8 h-8 text-red-400" />} label="Absent" value={absentStudent} color="bg-red-500/10" />
              </div>

              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold">Attendance History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-900/50 border-b border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {Array.isArray(showStudentData?.attendance) && showStudentData.attendance.length > 0 ? (
                        showStudentData.attendance.slice().reverse().map((attendance, index) => (
                          <tr key={attendance._id || index} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 text-gray-300">{format(new Date(attendance.date), 'MMMM dd, yyyy, h:mm a')}</td>
                            <td className="px-6 py-4 text-gray-300">{attendance.subName}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${attendance.status === 'Present' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {attendance.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-6 py-8 text-center text-gray-500">No attendance records found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "marks" && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Exam Results</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Marks
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-900/50 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">S.No</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject Name</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Marks Obtained</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {marksData.length > 0 ? (
                      marksData.map((marks, index) => (
                        <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                          <td className="px-6 py-4 text-gray-300">{marks.subName}</td>
                          <td className="px-6 py-4 text-gray-300 font-medium">{marks.marksObtained}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-8 text-center text-gray-500">No marks records found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Add Marks Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-md border border-gray-700 p-6 relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold mb-6">Add Exam Marks</h2>
              <form onSubmit={handleSubmit(handleMarks, onError)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Subject Name</label>
                  <input
                    {...register("subName", { required: "Subject Name is required", minLength: { value: 2, message: "Minimum 2 characters required" } })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 text-white"
                    placeholder="e.g. Mathematics"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Marks Obtained</label>
                  <input
                    type="number"
                    {...register("marksObtained", { required: "Marks is required" })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 text-white"
                    placeholder="e.g. 85"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Save Marks
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <span className="text-2xl font-bold text-white">{value || 0}</span>
    </div>
    <p className="text-gray-400 font-medium">{label}</p>
  </div>
);

export default AdminStudent;
