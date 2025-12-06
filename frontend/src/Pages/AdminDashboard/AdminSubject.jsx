import React, { useEffect, useState } from 'react';
import { Trash2, BookOpen, Search, Filter, MoreVertical, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const AdminSubject = () => {
  const [subjectTodo, setSubjectTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchSubjectData = async () => {
    setLoading(true);
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
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubjectTodo = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    try {
      await axios.delete(`https://college-management-system-s6xa.onrender.com/Subject/Subject/${id}`);
      setSubjectTodo(prev => prev.filter(subject => subject.id !== id));
      toast.success("Subject deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete subject");
    }
  };

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const filteredSubjects = subjectTodo.filter(subject =>
    subject.text.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.text.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">All Subjects</h1>
            <p className="text-gray-400 mt-1">Manage and view all course subjects</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search subjects..."
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
        ) : filteredSubjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
            <BookOpen className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">No subjects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="group bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/admin/subjects/information', { state: { subjectId: subject.id } })}
                      className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => deleteSubjectTodo(subject.id, e)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete Subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-100 mb-2">{subject.text.subjectName}</h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Code</span>
                    <span className="font-mono text-gray-300 bg-gray-900 px-2 py-1 rounded">{subject.text.subjectCode}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Sessions</span>
                    <span className="text-gray-300">{subject.text.subjectSessions}</span>
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

export default AdminSubject;
