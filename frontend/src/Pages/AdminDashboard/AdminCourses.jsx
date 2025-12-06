import React, { useEffect, useState } from 'react';
import { Trash2, Plus, X, BookOpen, ChevronRight } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';

const AdminCourses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onError = (errors) => {
    Object.values(errors).forEach((error) => toast.error(error.message));
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://college-management-system-s6xa.onrender.com/Sclass/SclassList');
      if (Array.isArray(response.data)) {
        setCourses(response.data);
        localStorage.setItem('courseTodo', JSON.stringify(response.data));
      }
    } catch (error) {
      toast.error("Failed to fetch courses");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmitCourse = async (data) => {
    try {
      const response = await axios.post('https://college-management-system-s6xa.onrender.com/Sclass/SclassCreate', {
        sclassName: data.courseName,
        sclassCode: data.courseCode,
      });
      if (response.data) {
        toast.success('Course added successfully');
        reset();
        setIsModalOpen(false);
        fetchCourses();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to create course");
      console.error(error);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const response = await axios.delete(`https://college-management-system-s6xa.onrender.com/Sclass/Sclass/${id}`);
      if (response.status === 200) {
        setCourses(courses.filter((course) => course._id !== id));
        toast.success('Course deleted successfully');
      }
    } catch (error) {
      toast.error("Failed to delete course");
      console.error(error);
    }
  };

  const handleInformationRoute = (course) => {
    navigate('/admin/courses/information', {
      state: {
        courseId: course._id,
        courseName: course.sclassName,
      },
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Courses Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New Course
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 p-6 relative animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-100">Add New Course</h2>

              <form onSubmit={handleSubmit(handleOnSubmitCourse, onError)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Course Name</label>
                  <input
                    {...register("courseName", { required: "Course Name is required", minLength: { value: 2, message: "Min 2 chars" } })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Course Code</label>
                  <input
                    {...register("courseCode", { minLength: { value: 2, message: "Min 2 chars" } })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. CS101"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4"
                >
                  Create Course
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Course Grid */}
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
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No courses found.</p>
            <p className="text-sm">Get started by adding a new course.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                    title="Delete Course"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-100 mb-2">{course.sclassName}</h3>
                <p className="text-gray-400 text-sm mb-6">Code: {course.sclassCode || "N/A"}</p>

                <button
                  onClick={() => handleInformationRoute(course)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 border border-gray-700 text-gray-300 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminCourses;
