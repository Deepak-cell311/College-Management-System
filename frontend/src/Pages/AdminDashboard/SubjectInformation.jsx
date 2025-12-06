import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Users, BookOpen, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

const SubjectInformation = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [studentTodo, setStudentTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, courseName, subjectTodo } = location.state || {};

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleStudentRoute = (student) => {
    navigate('/admin/students', {
      state: {
        courseId,
        courseName,
        studentTodo: student,
        showStudentData: student,
        subjectData: subjectTodo
      }
    });
  };

  const handleAttendance = (student) => {
    navigate("/admin/subjectInformation/attendence", {
      state: {
        courseId,
        showSubjectData: subjectTodo,
        studentId: student._id
      }
    });
  };

  const fetchAllStudent = async () => {
    setLoading(true);
    try {
      // Fetch the student detail using the API call
      // Note: Using courseId to fetch students assuming all students in course take the subject
      const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Student/ClassStudents/${courseId}`);

      if (Array.isArray(response.data)) {
        const formattedData = response.data.map((student) => ({
          _id: student._id || "N/A",
          name: student.name || "Unknown",
          rollNum: student.rollNum || "N/A",
          attendance: student.attendance || "N/A"
        }));
        setStudentTodo(formattedData);
      } else {
        toast.error("Failed to fetch students.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred while fetching students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) fetchAllStudent();
  }, [courseId]);

  if (!subjectTodo) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">No subject selected</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Subjects
        </button>

        <h1 className="text-3xl font-bold text-gray-100 mb-2">{subjectTodo?.text?.subjectName || subjectTodo?.subName}</h1>
        <p className="text-gray-400 mb-8">Course: {courseName}</p>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl mb-8 w-fit">
          {['details', 'students'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all capitalize
                ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            >
              {tab === 'details' && <BookOpen className="w-4 h-4" />}
              {tab === 'students' && <Users className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#60a5fa', '#34d399', '#f472b6', '#a78bfa', '#fbbf24']} />
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  icon={<BookOpen className="w-8 h-8 text-blue-400" />}
                  label="Subject Name"
                  value={subjectTodo?.text?.subjectName || subjectTodo?.subName}
                  color="bg-blue-500/10"
                />
                <StatCard
                  icon={<BookOpen className="w-8 h-8 text-purple-400" />}
                  label="Subject Code"
                  value={subjectTodo?.text?.subjectCode || subjectTodo?.subCode}
                  color="bg-purple-500/10"
                />
                <StatCard
                  icon={<Users className="w-8 h-8 text-green-400" />}
                  label="Total Students"
                  value={studentTodo.length}
                  color="bg-green-500/10"
                />
              </div>
            )}

            {activeTab === "students" && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Enrolled Students
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-900/50 border-b border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">S.No</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Roll Number</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {studentTodo.length > 0 ? (
                        studentTodo.map((student, index) => (
                          <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                            <td className="px-6 py-4 text-gray-300 font-medium">{student.name}</td>
                            <td className="px-6 py-4 text-gray-300 font-mono text-sm">{student.rollNum}</td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleStudentRoute(student)}
                                  className="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-medium transition-colors"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleAttendance(student)}
                                  className="px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  Attendance
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No students found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
      <span className="text-xl font-bold text-white truncate max-w-[150px]" title={value}>{value || 0}</span>
    </div>
    <p className="text-gray-400 font-medium">{label}</p>
  </div>
);

export default SubjectInformation;