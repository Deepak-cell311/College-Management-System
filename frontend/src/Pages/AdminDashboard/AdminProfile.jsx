import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Mail, Shield, Camera, Save, X, Edit2, Upload } from 'lucide-react';
import { ColorRing } from 'react-loader-spinner';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);

    const getDetails = async () => {
        setLoading(true);
        const storedAdminData = localStorage.getItem('Admin');
        if (!storedAdminData) {
            setLoading(false);
            return;
        }
        const parsedAdmin = JSON.parse(storedAdminData);
        setAdminData(parsedAdmin);
        setFormData(parsedAdmin);

        try {
            const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Admin/Admin/${parsedAdmin._id}`);
            if (response.status === 200) {
                setImage(response.data.images || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.match("image.*")) {
            toast.error("Please select an image file (jpg, png, etc)");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleImageUpload = async () => {
        if (!selectedFile) return;
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("adminId", adminData._id);

            const response = await axios.post("https://college-management-system-s6xa.onrender.com/Admin/Admin/profileImage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200 && Array.isArray(response.data.admin.images)) {
                setImage(response.data.admin.images);
                toast.success("Profile image updated successfully!");
                handleCancelUpload();
            }
        } catch (err) {
            toast.error("Failed to upload image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancelUpload = () => {
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSaveProfile = () => {
        // In a real app, you'd send a PUT request here
        localStorage.setItem('Admin', JSON.stringify({ ...adminData, ...formData }));
        setAdminData({ ...adminData, ...formData });
        setIsEditing(false);
        toast.success("Profile updated successfully");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
            {loading ? (
                <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#60a5fa', '#34d399', '#f472b6', '#a78bfa', '#fbbf24']} />
            ) : (
                <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-700 flex flex-col md:flex-row">

                    {/* Left Side - Profile Image */}
                    <div className="md:w-1/3 bg-gray-800 border-r border-gray-700 p-8 flex flex-col items-center justify-center relative">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg relative">
                                <img
                                    src={preview || (image.length > 0 ? image[image.length - 1].url : "/placeholder.svg?height=200&width=200")}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                {!preview && (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                )}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                        </div>

                        {preview && (
                            <div className="flex gap-2 mt-4 w-full">
                                <button
                                    onClick={handleImageUpload}
                                    disabled={isUploading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    {isUploading ? <ColorRing height="20" width="20" colors={['#fff']} /> : <><Upload className="w-4 h-4" /> Save</>}
                                </button>
                                <button
                                    onClick={handleCancelUpload}
                                    disabled={isUploading}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        <h2 className="mt-4 text-xl font-bold text-gray-100">{adminData.name}</h2>
                        <span className="px-3 py-1 mt-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20 capitalize">
                            {adminData.role}
                        </span>
                    </div>

                    {/* Right Side - Details */}
                    <div className="md:w-2/3 p-8 bg-gray-800/50">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-100">Profile Details</h3>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit Profile
                                </button>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <User className="w-4 h-4" /> Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-colors"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-200 border-b border-gray-700 pb-2">{adminData.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-colors"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-200 border-b border-gray-700 pb-2">{adminData.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> Role
                                </label>
                                <p className="text-lg text-gray-200 border-b border-gray-700 pb-2 capitalize">{adminData.role}</p>
                            </div>

                            {isEditing && (
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-4 h-4" /> Save Changes
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData(adminData);
                                        }}
                                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X className="w-4 h-4" /> Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;
