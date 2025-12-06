import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Calendar, CheckCircle, XCircle, BookOpen, ArrowLeft, User } from 'lucide-react';

const StudentAttendence = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showSubjectData, studentId } = location.state || {};

  const { handleSubmit, register, reset } = useForm();

  const onError = (errors) => {
    Object.values(errors).forEach(error => toast.error(error.message));
  };

  const handleOnSubmitAttendance = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(`https://college-management-system-s6xa.onrender.com/Student/StudentAttendance/${studentId}`, {
        subName: data.subName,
        status: data.status,
        date: data.date
      });

      if (response.data) {
        toast.success("Attendance Marked Successfully");
        reset();
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error(error.response?.data?.message || "An error occurred while marking attendance");
    } finally {
      setLoading(false);
    }
  };

  if (!studentId) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">No student selected</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors self-start"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700 bg-gray-800/50">
            <h1 className="text-2xl font-bold text-center text-gray-100 mb-2">Mark Attendance</h1>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span>{showSubjectData?.name || "Student"}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleOnSubmitAttendance, onError)} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Subject Name
              </label>
              <input
                {...register("subName", { required: "Subject Name is Required" })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter subject name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Attendance Status
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="Present"
                    {...register("status", { required: "Status is required" })}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-700 bg-gray-900 peer-checked:bg-green-500/20 peer-checked:border-green-500 peer-checked:text-green-400 hover:bg-gray-700 transition-all">
                    <CheckCircle className="w-5 h-5" />
                    Present
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="Absent"
                    {...register("status", { required: "Status is required" })}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-700 bg-gray-900 peer-checked:bg-red-500/20 peer-checked:border-red-500 peer-checked:text-red-400 hover:bg-gray-700 transition-all">
                    <XCircle className="w-5 h-5" />
                    Absent
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <input
                type="date"
                {...register("date", { required: "Date is Required" })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? "Marking..." : "Submit Attendance"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendence;