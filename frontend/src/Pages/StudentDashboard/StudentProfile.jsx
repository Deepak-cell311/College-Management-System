import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';

const StudentProfile = () => {
    const [studentData, setStudentData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', rollNum: '', role: '' });
    const [selectedFile, setSelectedFile] = useState("")
    const [preview, setPreview] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [currentProfileImage, setCurrentProfileImage] = useState("/placeholder.svg?height=200&width=200")
    const fileInputRef = useRef(null)
    const [image, setImage] = useState([])

    console.log("Image: ", image)
    


    useEffect(() => {
        const storedStudentData = localStorage.getItem('Student');
        if (storedStudentData) {
            const parsedData = JSON.parse(storedStudentData);
            setStudentData(parsedData);
            setFormData(parsedData);
        }
    }, []);
    console.log("Studnet id: ", studentData._id)

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        localStorage.setItem('Student', JSON.stringify(formData));
        setStudentData(formData);
        setIsEditing(false);
    };

    const handleSelectClick = () => {
        fileInputRef.current?.click()
    }

    
    const handleImageUpload = async () => {
        if (!selectedFile) {
            setError("Please select an image first")
            return
        }
        setIsUploading(true)
        setError(null)
        try {
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("studentId", studentData._id);  // Ensure adminId is sent

            const response = await axios.post("https://college-management-system-s6xa.onrender.com/Student/StudentProfile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });


            console.log("Upload Response:", response.data);
            console.log("Types of image: ", typeof response.data.student.images)

            if(response.status === 200 && Array.isArray(response.data.student.images)){
                setImage(response.data.student.images)
            } else {
                console.error("Invalid response format:", response.data);
            }

            // Update current profile image with the preview
            setCurrentProfileImage(preview)
            setSuccess("Profile image updated successfully!")

            // Reset selection
            setSelectedFile(null)
            setPreview(null)

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        } catch (error) {
            setError("Failed to upload image. Please try again.")
            console.error("Error: ", error)
        } finally {
            setIsUploading(false)
        }
    }

     const getDetails = async () => {
            const storedStudentData = localStorage.getItem('Student');
            if (!storedStudentData) {
                console.log("No Student is found")
            }
            const parsedStudent = JSON.parse(storedStudentData)
            const id = parsedStudent._id
            try {
                const response = await axios.get(`https://college-management-system-s6xa.onrender.com/Student/Student/${id}`)
                console.log("response of get : ", response.data)
                if (response.status === 200) {
                    setImage(response.data.images)
                }
            } catch (error) {
                console.log(error)
            }
        }

        console.log("image: ", typeof image)
            useEffect(() => {
                getDetails()
            }, [])
        

    
    const handleCancel = () => {
        setSelectedFile(null)
        setPreview(null)
        setError(null)
        setSuccess(null)

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

      const handleFileChange = (e) => {
        setError(null)
        setSuccess(null)

        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.match("image.*")) {
          setError("Please select an image file (jpg, png, etc)")
          return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError("Image size should be less than 5MB")
          return
        }

        setSelectedFile(file)

        // Create preview
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(file)
      }

    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing)
        // If canceling edit, reset any unsaved changes
        if (isEditing) {
            // Reset to original data (in a real app, you'd fetch from API)
        }
    }

    // Get role badge color
    const getRoleBadgeColor = (role) => {
        switch (role.toLowerCase()) {
            case "admin":
                return "bg-red-100 text-red-800"
            case "teacher":
                return "bg-blue-100 text-blue-800"
            case "student":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        // <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900">
        //     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Admin Profile</h2>
        //         <div className="flex items-center flex-col mb-4">
        //             <svg 
        //                 xmlns="http://www.w3.org/2000/svg" 
        //                 fill="none" 
        //                 viewBox="0 0 24 24" 
        //                 strokeWidth={1.5} 
        //                 stroke="currentColor" 
        //                 className="h-40 w-40 text-gray-500 dark:text-gray-400 mr-4"
        //             >
        //                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 1.5c-4.41 0-8 2.69-8 6v1.5h16v-1.5c0-3.31-3.59-6-8-6z" />
        //             </svg>
        //             <div className='flex flex-col text-center text-2xl'>
        //                 {isEditing ? (
        //                     <>
        //                         <input
        //                             type="text"
        //                             name="name"
        //                             value={formData.name}
        //                             onChange={handleInputChange}
        //                             placeholder="Name"
        //                             className="w-full p-2 border border-gray-300 rounded mb-2"
        //                         />
        //                         <input
        //                             type="email"
        //                             name="email"
        //                             value={formData.email}
        //                             onChange={handleInputChange}
        //                             placeholder="Email"
        //                             className="w-full p-2 border border-gray-300 rounded mb-2"
        //                         />
        //                         <input
        //                             type="text"
        //                             name="role"
        //                             value={formData.role}
        //                             onChange={handleInputChange}
        //                             placeholder="Role"
        //                             className="w-full p-2 border border-gray-300 rounded mb-2"
        //                         />
        //                     </>
        //                 ) : (
        //                     <>
        //                         <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white">{adminData.name}</h3>
        //                         <p className="text-gray-600 dark:text-gray-300">{adminData.email}</p>
        //                         <p className="text-gray-600 dark:text-gray-300">{adminData.role}</p>
        //                     </>
        //                 )}
        //             </div>
        //         </div>
        //         <div className="mt-6">
        //             {!isEditing ? (
        //                 <button 
        //                     className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        //                     onClick={handleEditClick}
        //                 >
        //                     Edit Profile
        //                 </button>
        //             ) : (
        //                 <button 
        //                     className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
        //                     onClick={handleSave}
        //                 >
        //                     Save Changes
        //                 </button>
        //             )}
        //         </div>
        //     </div>
        // </div>

        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gray-800 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">User Profile</h2>
                </div>

                <div className="px-6 py-6">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative w-32 h-32 mb-4">
                            <img
                                src={(image.length > 0 ? image[image.length - 1].url : preview) || "/placeholder.svg?height=200&width=200"}
                                alt="Profile"
                                loading='lazy'
                                className="w-full h-full object-cover rounded-full border-4 border-gray-200"
                            />
                            <button
                                onClick={handleSelectClick}
                                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                                title="Change profile picture"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-red-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>

                        {/* File Input (hidden) */}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

                        {/* Image Upload Actions */}
                        {preview && (
                            <div className="flex space-x-2 mb-4">
                                <button
                                    onClick={handleImageUpload}
                                    disabled={isUploading}
                                    className={`px-3 py-1 text-sm rounded-md ${isUploading
                                        ? "bg-blue-400 text-white cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                >
                                    {isUploading ? "Uploading..." : "Save"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={isUploading}
                                    className="px-3 py-1 text-sm border border-gray-300 text-black rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        {/* Role Badge */}
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(formData.role)}`}
                        >
                            {formData.role}
                        </span>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-red-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-green-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-700">{success}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User Information Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">User Information</h3>
                            {/* <button onClick={toggleEditMode} className="text-sm text-blue-600 hover:text-blue-800">
                                {isEditing ? "Cancel" : "Edit"}
                            </button> */}
                        </div>

                        <div className="space-y-4">
                            {/* Name */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <div className="text-sm font-medium text-gray-500">Name</div>
                                <div className="col-span-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    ) : (
                                        <div className="text-sm text-gray-900">{formData.name}</div>
                                    )}
                                </div>
                            </div>

                            {/* Roll number */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <div className="text-sm font-medium text-gray-500">Roll Number</div>
                                <div className="col-span-2">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={formData.rollNum}
                                            onChange={(e) => setFormData({ ...formData, rollNum: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    ) : (
                                        <div className="text-sm text-gray-900">{formData.rollNum}</div>
                                    )}
                                </div>
                            </div>

                            {/* Role */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <div className="text-sm font-medium text-gray-500">Role</div>
                                <div className="col-span-2">
                                    {isEditing ? (
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                            <option value="Student">Student</option>
                                            <option value="Teacher">Teacher</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    ) : (
                                        <div className="text-sm text-gray-900">{formData.role}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Save Button for Edit Mode */}
                        {isEditing && (
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => {
                                        // Here you would save the changes to the backend
                                        setIsEditing(false)
                                        setSuccess("User information updated successfully!")
                                        setTimeout(() => setSuccess(null), 3000)
                                    }}
                                    className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default StudentProfile;
