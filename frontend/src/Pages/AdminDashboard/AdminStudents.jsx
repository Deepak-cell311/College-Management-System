import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Search, Trash2, User, Eye, GraduationCap } from 'lucide-react';
import { ColorRing } from 'react-loader-spinner';

const AdminStudents = () => {
    const [studentTodo, setStudentTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleView = (student) => {
        navigate("/admin/students", {
            state: {
                showStudentData: student,
                subjectData: { text: { sessions: 10, subName: "Subject Name" } },
            },
        });
    };

    const fetchAllStudent = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Student/Students`);
            if (Array.isArray(response.data)) {
                const formattedData = response.data.map((student) => ({
                    _id: student._id || "N/A",
                    name: student.name || "Unknown",
                    rollNum: student.rollNum || "N/A",
                    attendance: student.attendance,
                }));
                setStudentTodo(formattedData);
            } else {
                toast.error("Failed to fetch students.");
            }
        } catch (error) {
            toast.error("An error occurred while fetching students.");
        } finally {
            setLoading(false);
        }
    };

    const deleteStudent = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            await axios.delete(`https://college-management-system-s6xa.onrender.com/Student/Student/${id}`);
            setStudentTodo((prev) => prev.filter((student) => student._id !== id));
            toast.success("Student deleted successfully");
        } catch (error) {
            toast.error("An error occurred while deleting the student.");
        }
    };

    useEffect(() => {
        fetchAllStudent();
    }, []);

    const filteredStudents = studentTodo.filter((student) =>
        String(student.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(student.rollNum).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-100">All Students</h1>
                        <p className="text-gray-400 mt-1">Manage and view all registered students</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search students..."
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
                ) : filteredStudents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
                        <User className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-lg font-medium">No students found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStudents.map((student) => (
                            <div
                                key={student._id}
                                className="group bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                        <User className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleView(student)}
                                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => deleteStudent(student._id, e)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete Student"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-100 mb-1">{student.name}</h3>

                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <GraduationCap className="w-4 h-4" />
                                        <span className="font-mono bg-gray-900 px-2 py-0.5 rounded text-gray-300">{student.rollNum}</span>
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

export default AdminStudents;
