import React, { useEffect, useState } from 'react';
import { Trash2, Plus, X, Calendar, FileText, Type } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "axios";
import { ColorRing } from 'react-loader-spinner';

const Notice = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm();

    const onError = (errors) => {
        Object.values(errors).forEach(error => {
            toast.error(error.message);
        });
    };

    const fetchNotices = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://college-management-system-s6xa.onrender.com/Notice/NoticeList');
            if (Array.isArray(response.data)) {
                setNotices(response.data);
            } else {
                toast.info(response.data.message || "No notices found");
            }
        } catch (error) {
            toast.error("Failed to fetch notices");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://college-management-system-s6xa.onrender.com/Notice/NoticeCreate", data);
            if (response.data) {
                toast.success("Notice added successfully");
                reset();
                setIsFormOpen(false);
                fetchNotices();
            } else {
                toast.error(response.data.message || "Failed to add notice");
            }
        } catch (error) {
            toast.error("Error creating notice");
            console.error(error);
        }
    };

    const deleteNotice = async (id) => {
        if (!window.confirm("Are you sure you want to delete this notice?")) return;
        try {
            const response = await axios.delete(`https://college-management-system-s6xa.onrender.com/Notice/Notice/${id}`);
            if (response.status === 200) {
                setNotices(notices.filter(n => n._id !== id));
                toast.success("Notice deleted successfully");
            }
        } catch (error) {
            toast.error("Failed to delete notice");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-100">Notice Board</h1>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Notice
                    </button>
                </div>

                {/* Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                        <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700 p-6 relative animate-in fade-in zoom-in duration-200">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-2xl font-bold mb-6 text-gray-100">Create Notice</h2>

                            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            {...register("title", { required: "Title is required", minLength: { value: 2, message: "Min 2 chars" } })}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Enter notice title"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Details</label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                        <textarea
                                            {...register("details", { required: "Details are required", minLength: { value: 5, message: "Min 5 chars" } })}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[100px]"
                                            placeholder="Enter notice details..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="date"
                                            {...register("date", { required: "Date is required" })}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4"
                                >
                                    Publish Notice
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Notices List */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
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
                    ) : notices.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <p className="text-lg">No notices found.</p>
                            <p className="text-sm">Click "Add New Notice" to create one.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-900/50 border-b border-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Details</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {notices.map((notice) => (
                                        <tr key={notice._id} className="hover:bg-gray-700/50 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-gray-200">{notice.title}</td>
                                            <td className="px-6 py-4 text-gray-400 max-w-md truncate" title={notice.details}>
                                                {notice.details}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                                                {notice.date ? new Date(notice.date).toLocaleDateString() : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => deleteNotice(notice._id)}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete Notice"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notice;


