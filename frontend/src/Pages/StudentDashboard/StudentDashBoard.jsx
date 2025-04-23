import React, { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/authProvider'
import { toast } from 'react-toastify'

const AdminDashBoard = () => {
    const [menu, setMenu] = useState(true)
    const navigate = useNavigate()
    const { authStudent, setAuthStudent, logoutStudent } = useAuth()
    const location = useLocation()

    const handleMenuBar = () => {
        setMenu(!menu)
    }

    const handleLogout = async () => {
        try {
            await logoutStudent()
            navigate('/dashboard')
            toast.success("Logout sucessfully")
        } catch (error) {
            console.error("Logout failed: ", error)
        }
    }

    const linkStyle = (path) => (
        location.pathname === path ? "bg-gray-700 text-white" : "text-gray-200"
    )

    return (
        <>
            {/* Sidebar and main layout */}
            <div className="flex h-screen bg-gray-900 text-white">
                {/* Sidebar toggle button for small screens */}
                <button
                    onClick={handleMenuBar}
                    className="md:hidden p-4 z-20 text-white hover:text-gray-400 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Sidebar */}
                <div className={`bg-gray-800 shadow-lg transition-transform duration-300 transform ${menu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 h-full flex-shrink-0`}>
                    <div className="flex flex-col h-full">
                        <div className="p-6 text-center text-xl font-semibold text-gray-100 border-b border-gray-700">
                            Student Dashboard
                        </div>
                        <div className="flex-grow overflow-y-auto mt-8">
                            <ul>
                                <li className="mb-4">
                                    <Link to="/student/home" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/student/home')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>

                                        Home
                                    </Link>
                                </li>
                                <li className="mb-4">
                                <Link to="/student/attendance" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/student/attendance')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                        </svg>
                                        Attendance
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/student/subjects" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/student/subjects')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                        </svg>
                                        Subject
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/student/fees" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/student/fees')}`}>
                                        <svg className='w-5 h-5 invert mr-4' xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 474 511.88"><path d="M371.15 306.19c56.8 0 102.85 46.05 102.85 102.85 0 56.79-46.05 102.84-102.85 102.84-56.79 0-102.84-46.05-102.84-102.84 0-56.8 46.05-102.85 102.84-102.85zm35.94-24.44V23.26H23.26v400.48l8.32-4.92c4.73-2.79 10.63-1.85 14.28 1.95l35.96 34.21 37.42-33.49c4.52-4.04 11.34-3.89 15.66.2l36.04 33.89 34.85-33.78c4.41-4.29 11.38-4.35 15.88-.27l20.78 18.03c3.61 15.27 9.87 29.52 18.26 42.24-2.89.15-5.84-.77-8.2-2.81l-38.19-33.14-35.18 34.09c-4.42 4.3-11.5 4.4-16.03.13l-36.35-34.22-37.06 33.17c-4.43 4.37-11.58 4.46-16.12.13l-37.73-35.89-17.7 10.48c-1.87 1.26-4.11 2-6.52 2-6.42 0-11.63-5.22-11.63-11.63V11.63C0 5.21 5.21 0 11.63 0h407.09c6.42 0 11.63 5.21 11.63 11.63V290.8c-7.39-3.72-15.16-6.76-23.26-9.05zM107.63 168.69H84.98V83.52h50.32v18.49h-27.67v16.23h25.51v18.48h-25.51v31.97zm92.23 0h-50.58V83.52h50.58v18.49h-27.58v13.36h25.53v18.49h-25.53v16.1h27.58v18.73zm65.48 0h-50.58V83.52h50.58v18.49h-27.58v13.36h25.53v18.49h-25.53v16.1h27.58v18.73zm70.56-25.84c0 5.29-1.33 9.98-4.01 14.08-2.69 4.09-6.54 7.27-11.59 9.56-5.05 2.26-10.98 3.39-17.76 3.39-5.67 0-10.44-.39-14.28-1.19-3.83-.79-7.83-2.19-11.99-4.17V144c4.38 2.25 8.95 4 13.68 5.27 4.74 1.25 9.09 1.89 13.05 1.89 3.42 0 5.92-.6 7.51-1.77 1.59-1.18 2.39-2.71 2.39-4.56 0-1.17-.32-2.18-.97-3.06-.64-.87-1.67-1.75-3.09-2.64-1.41-.9-5.18-2.72-11.33-5.49-5.55-2.53-9.71-4.97-12.49-7.34-2.76-2.36-4.83-5.09-6.16-8.14-1.33-3.07-2.01-6.71-2.01-10.9 0-7.83 2.85-13.96 8.55-18.35 5.7-4.4 13.56-6.58 23.54-6.58 8.81 0 17.8 2.02 26.96 6.1l-7.04 17.73c-7.97-3.63-14.83-5.47-20.62-5.47-2.97 0-5.16.54-6.52 1.59-1.36 1.06-2.04 2.37-2.04 3.92 0 1.67.87 3.19 2.6 4.5s6.4 3.72 14.06 7.21c7.34 3.3 12.42 6.87 15.29 10.64 2.84 3.8 4.27 8.55 4.27 14.3zm-.16 103.05H85.14v-23.26h250.6v23.26zm-65.02 77.22H85.14v-23.27h211.37c-6.77 4.64-13.09 9.89-18.87 15.67v.12c-2.4 2.4-4.7 4.89-6.92 7.48zm70.8 69.82 17.4 16.44 39.46-40.7c3.41-3.45 5.56-6.24 9.75-1.9l13.64 13.96c4.47 4.42 4.25 7.03.02 11.15l-55.08 54.84c-8.91 8.72-7.36 9.26-16.38.31l-31.76-31.59c-1.88-2.02-1.69-4.08.38-6.12l15.82-16.41c2.4-2.53 4.32-2.3 6.75.02z"/></svg>
                                        Fees Detail
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/student/feesPayment" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/student/feesPayment')}`}>
                                        <svg className='w-5 h-5 invert mr-4' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.28 122.88"><defs><style>.cls-1</style></defs><title>payment</title><path class="cls-1" d="M0,49.17,49.6,0,81.28,31.13l-5.11,2.38-22-21.59-.26-.27a5.06,5.06,0,0,0-7.15.16l-1.79,1.86-.06-.06-8.4,8.9L4.34,53.42,0,49.17ZM13.41,76.85l-.3,1.92c-.79,5.12-2.07,13.44-2.59,16.38a2.18,2.18,0,0,1-.17.51,1.29,1.29,0,0,1-.26.42,19.68,19.68,0,0,0-1.61,2.39,6.65,6.65,0,0,0-.76,1.89,2.23,2.23,0,0,0,0,1,1.73,1.73,0,0,0,.48.79C13.08,107.05,18.26,112,23,117a6.54,6.54,0,0,0,5.34,1.68,31.75,31.75,0,0,0,5.3-1.15,43.8,43.8,0,0,0,5.54-1.61,15.85,15.85,0,0,0,4.9-3l4.08-4.26a1.37,1.37,0,0,1,.19-.22l0,0c.12-.12.47-.47,1-.94l0,0c2.7-2.64,6-5.89,4.13-8.59l-1.37-1.37-1,.9L49.8,99.53c-.7.61-1.35,1.19-1.94,1.77a2.11,2.11,0,0,1-3-3c.63-.63,1.39-1.31,2.18-2l.1-.08c2.65-2.35,5.68-5,4.2-7.2l-1.61-1.61c-.38.39-.78.76-1.18,1.13s-1,.92-1.52,1.36L46.9,90c-.68.6-1.32,1.16-1.91,1.75a2.11,2.11,0,0,1-3-3c.61-.61,1.36-1.28,2.15-2l.12-.11c2.65-2.34,5.68-5,4.21-7.2-.56-.55-1.13-1.1-1.67-1.67l-4.48,4.48a2.11,2.11,0,0,1-3-3l9-9a7.51,7.51,0,0,0,1.89-2.88,4.36,4.36,0,0,0,.08-2.8,3.8,3.8,0,0,0-.37-.79,3.69,3.69,0,0,0-.52-.66,3.48,3.48,0,0,0-.67-.53,4,4,0,0,0-.78-.36,4.34,4.34,0,0,0-2.79.1,8.14,8.14,0,0,0-2.94,2L20.59,86.06a2.11,2.11,0,0,1-3-3l.94-.93-5.16-5.27Zm10.15.28L36.42,64.27l-.24-.07A9.18,9.18,0,1,1,47.87,58a8.27,8.27,0,0,1,1.41.33h0a8,8,0,0,1,1.65.76,8.1,8.1,0,0,1,1.45,1.14l0,0a7.7,7.7,0,0,1,.54.6L65.12,48.41a6,6,0,0,1,.1-8.43L54.06,28.58a6,6,0,0,1-8.44-.09h0L15,59.9A6,6,0,0,1,15,68.33l8.61,8.8Zm30.78-8.58v0a11.7,11.7,0,0,1-3,4.85l-1.47,1.46,1.74,1.74.16.18.14.19a6.16,6.16,0,0,1,.52,7.14l.05,0a2.91,2.91,0,0,1,.33.26l1.7,1.71a.93.93,0,0,1,.16.18l.13.17a6.48,6.48,0,0,1,1.42,4.23A7,7,0,0,1,55,94.19l1.69,1.68.16.19.12.17c4.14,5.66-.68,10.37-4.57,14.17-.26.31-.69.69-1,1-1.36,1.42-3,3.34-4.4,4.6-3.92,3.55-7.78,4.5-12.25,5.59a32.67,32.67,0,0,1-6.12,1.27,10.61,10.61,0,0,1-8.52-2.9L5.33,105.18a5.8,5.8,0,0,1-1.59-2.55,6.49,6.49,0,0,1-.08-3.08v0a10.41,10.41,0,0,1,1-2.74A19.92,19.92,0,0,1,6.52,93.9c.38-2.17,1.21-7.7,2-12.78.45-3.05.89-5.92,1.22-8L1.43,64.63,50.6,15h0L78.83,43.85,54.34,68.55Z"/></svg>
                                        Fees Payment
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/student/profile" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/student/profile')}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-4">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                        </svg>
                                        Profile
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <button onClick={handleLogout} className="flex items-center w-full px-6 py-3 text-gray-200 hover:bg-red-600 hover:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-4">
                                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                        Logout
                                    </button>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow p-6 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminDashBoard

