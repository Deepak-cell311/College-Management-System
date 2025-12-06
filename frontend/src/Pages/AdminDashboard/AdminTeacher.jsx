import React, { useEffect, useState } from 'react';
import { Trash2, User, Mail, BookOpen, Search, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

const AdminTeacher = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleTeacherRoute = (teacherId) => {
    navigate('/admin/teacherAttendanceDetail', { state: { teacherId } });
  };

  const fetchTeacherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://college-management-system-s6xa.onrender.com/Teacher/Teachers');
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((teacher) => ({
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          teachSclass: teacher.teachSclass?.sclassName || "N/A"
        }));
        setTeacherData(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while fetching teachers");
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacher = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      await axios.delete(`https://college-management-system-s6xa.onrender.com/Teacher/Teacher/${id}`);
      setTeacherData(prev => prev.filter(teacher => teacher._id !== id));
      toast.success("Teacher deleted successfully");
    } catch (error) {
      toast.error("Failed to delete teacher");
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const filteredTeachers = teacherData.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">All Teachers</h1>
            <p className="text-gray-400 mt-1">Manage and view all registered teachers</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-gray-100 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#60a5fa', '#34d399', '#f472b6', '#a78bfa', '#fbbf24']} />
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
            <User className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">No teachers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher._id}
                className="group bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <User className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTeacherRoute(teacher._id)}
                      className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => deleteTeacher(teacher._id, e)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete Teacher"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-100 mb-1">{teacher.name}</h3>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{teacher.teachSclass}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeacher;
