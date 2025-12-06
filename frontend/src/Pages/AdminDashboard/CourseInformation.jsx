import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trash2, Plus, X, Users, BookOpen, GraduationCap, DollarSign, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { ColorRing } from 'react-loader-spinner';

const CourseInformation = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subjectTodos, setSubjectTodos] = useState([]);
  const [studentTodos, setStudentTodos] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [feesData, setFeesData] = useState([]);
  const [rows, setRow] = useState([{ heads: "", semester1: "", semester2: "", semester3: "", semester4: "", semester5: "", semester6: "" }]);

  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, courseName } = location.state || {};
  const { handleSubmit, register, reset } = useForm();

  const onError = (errors) => Object.values(errors).forEach(error => toast.error(error.message));

  const handleTabChange = (tab) => setActiveTab(tab);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subjectsRes, studentsRes, teachersRes, feesRes] = await Promise.all([
        axios.get('https://college-management-system-s6xa.onrender.com/Subject/AllSubjects'),
        axios.get(`https://college-management-system-s6xa.onrender.com/Student/ClassStudents/${courseId}`),
        axios.get('https://college-management-system-s6xa.onrender.com/Teacher/Teachers'),
        axios.get(`https://college-management-system-s6xa.onrender.com/Fees/get-fees/${courseId}`)
      ]);

      if (Array.isArray(subjectsRes.data)) {
        setSubjectTodos(subjectsRes.data.map(s => ({ ...s, courseId: s.sclassName })));
      }
      if (Array.isArray(studentsRes.data)) {
        setStudentTodos(studentsRes.data);
      }
      if (Array.isArray(teachersRes.data)) {
        setTeacherData(teachersRes.data.map(t => ({ ...t, id: t.teachSclass?._id })));
      }
      if (feesRes.status === 200 || feesRes.status === 201) {
        setFeesData(feesRes.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) fetchData();
  }, [courseId]);

  const addSubjectData = async (data) => {
    try {
      const response = await axios.post(`https://college-management-system-s6xa.onrender.com/Subject/SubjectCreate/${courseId}`, { ...data, courseId });
      setSubjectTodos(prev => [...prev, { ...response.data, courseId }]);
      reset();
      setIsModalOpen(false);
      toast.success("Subject added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add subject");
    }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const endpoint = type === 'Subject' ? `Subject/Subject/${id}` : type === 'Student' ? `Student/Student/${id}` : `Teacher/Teacher/${id}`;
      await axios.delete(`https://college-management-system-s6xa.onrender.com/${endpoint}`);
      
      if (type === 'Subject') setSubjectTodos(prev => prev.filter(item => item._id !== id));
      if (type === 'Student') setStudentTodos(prev => prev.filter(item => item._id !== id));
      if (type === 'Teacher') setTeacherData(prev => prev.filter(item => item._id !== id));
      
      toast.success(`${type} deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete ${type}`);
    }
  };

  const onSubmitFeesForm = async (data) => {
    try {
      await axios.post(`https://college-management-system-s6xa.onrender.com/Fees/Fee`, { courseName, rows: data.rows });
      toast.success("Fee data submitted successfully!");
      reset();
      fetchData();
    } catch (error) {
      toast.error("Failed to submit fees");
    }
  };

  const filterSubject = subjectTodos.filter(s => s.courseId === courseId);
  const filterStudent = studentTodos; // Already filtered by API
  const filterTeacher = teacherData.filter(t => t.id === courseId);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">{courseName} Details</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl mb-8 overflow-x-auto">
          {['details', 'subjects', 'students', 'teachers', 'fees'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap
                ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            >
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
            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Users className="w-8 h-8 text-blue-400" />} label="Total Students" value={filterStudent.length} color="bg-blue-500/10" />
                <StatCard icon={<BookOpen className="w-8 h-8 text-purple-400" />} label="Total Subjects" value={filterSubject.length} color="bg-purple-500/10" />
                <StatCard icon={<GraduationCap className="w-8 h-8 text-green-400" />} label="Total Teachers" value={filterTeacher.length} color="bg-green-500/10" />
              </div>
            )}

            {/* Subjects Tab */}
            {activeTab === "subjects" && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Subjects List</h2>
                  <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" /> Add Subject
                  </button>
                </div>
                <Table 
                  headers={['S.No', 'Subject Name', 'Subject Code', 'Sessions', 'Action']}
                  data={filterSubject}
                  renderRow={(item, index) => (
                    <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-300">{item.subName}</td>
                      <td className="px-6 py-4 text-gray-300">{item.subCode}</td>
                      <td className="px-6 py-4 text-gray-300">{item.sessions}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => navigate('/admin/courses/information/subjectInformation', { state: { courseId, courseName, subjectTodo: item } })} className="text-blue-400 hover:text-blue-300">View</button>
                        <button onClick={() => deleteItem('Subject', item._id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  )}
                />
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <Table 
                  headers={['S.No', 'Name', 'Roll Number', 'Action']}
                  data={filterStudent}
                  renderRow={(item, index) => (
                    <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-300">{item.name}</td>
                      <td className="px-6 py-4 text-gray-300">{item.rollNum}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => navigate('/admin/courses/information/courseStudentDetail', { state: { subjectTodos, studentTodo: item._id } })} className="text-blue-400 hover:text-blue-300">View</button>
                        <button onClick={() => deleteItem('Student', item._id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  )}
                />
              </div>
            )}

            {/* Teachers Tab */}
            {activeTab === "teachers" && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <Table 
                  headers={['S.No', 'Name', 'Email', 'Department', 'Action']}
                  data={filterTeacher}
                  renderRow={(item, index) => (
                    <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-300">{item.name}</td>
                      <td className="px-6 py-4 text-gray-300">{item.email}</td>
                      <td className="px-6 py-4 text-gray-300">{item.teachSclass?.sclassName || 'N/A'}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => navigate('/admin/teacherAttendanceDetail', { state: { teacherId: item._id } })} className="text-blue-400 hover:text-blue-300">View</button>
                        <button onClick={() => deleteItem('Teacher', item._id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  )}
                />
              </div>
            )}

            {/* Fees Tab */}
            {activeTab === "fees" && (
              <div className="space-y-8">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-6">Fee Structure & Payment</h2>
                  <form onSubmit={handleSubmit(onSubmitFeesForm)} className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-700">
                          {["Heads", "I Sem", "II Sem", "III Sem", "IV Sem", "V Sem", "VI Sem"].map((h) => (
                            <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((_, idx) => (
                          <tr key={idx} className="border-b border-gray-700">
                            {["heads", "semester1", "semester2", "semester3", "semester4", "semester5", "semester6"].map((field) => (
                              <td key={field} className="p-2">
                                <input {...register(`rows[${idx}].${field}`)} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Save Fee Structure</button>
                  </form>
                </div>
                
                {/* Existing Fees Display */}
                {feesData.length > 0 && (
                  <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <Table 
                      headers={["Heads", "I Sem", "II Sem", "III Sem", "IV Sem", "V Sem", "VI Sem"]}
                      data={feesData}
                      renderRow={(fee, index) => (
                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                          <td className="px-6 py-4 text-gray-300 font-medium">{fee.heads}</td>
                          {[1,2,3,4,5,6].map(sem => (
                            <td key={sem} className="px-6 py-4 text-gray-400">{fee[`semester${sem}`] || '-'}</td>
                          ))}
                        </tr>
                      )}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Subject Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-md border border-gray-700 p-6 relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
              <h2 className="text-xl font-bold mb-6">Add New Subject</h2>
              <form onSubmit={handleSubmit(addSubjectData, onError)} className="space-y-4">
                <input {...register("subName", { required: "Required" })} placeholder="Subject Name" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500" />
                <input {...register("subCode", { required: "Required" })} placeholder="Subject Code" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500" />
                <input {...register("sessions", { required: "Required" })} placeholder="Sessions" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500" />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">Add Subject</button>
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

const Table = ({ headers, data, renderRow }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-900/50 border-b border-gray-700">
        <tr>
          {headers.map((h, i) => <th key={i} className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>)}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {data.length > 0 ? data.map((item, index) => renderRow(item, index)) : (
          <tr><td colSpan={headers.length} className="px-6 py-8 text-center text-gray-500">No data available</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

export default CourseInformation;