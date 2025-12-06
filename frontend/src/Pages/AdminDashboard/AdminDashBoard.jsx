import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/authProvider';

const AdminDashBoard = () => {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const { logOut } = useAuth();
    const location = useLocation();

    // Toggle Mobile Menu
    const handleMenuBar = () => setMenu(!menu);

    // Logout Handler
    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/dashboard');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    // Navigation Data Configuration
    // Add new sidebar items here to automatically render them
    const navItems = [
        { name: 'Home', path: '/admin/home', icon: <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /> },
        { name: 'Courses', path: '/admin/courses', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" /> },
        { name: 'Subjects', path: '/admin/subjects', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /> },
        { name: 'Teachers', path: '/admin/teachers', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /> },
        { name: 'Students', path: '/admin/adminStudent', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /> },
        { name: 'Notices', path: '/admin/notices', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /> },
        { name: 'Profile', path: '/admin/profile', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /> },
    ];

    return (
        <div className="flex h-screen w-full bg-gray-900 overflow-hidden">
            
            {/* --- Overlay for Mobile when menu is open --- */}
            {menu && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
                    onClick={() => setMenu(false)}
                />
            )}

            {/* --- Sidebar --- */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-30
                w-72 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900
                border-r border-gray-700/50 shadow-2xl
                transition-transform duration-300 ease-in-out
                ${menu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                
                {/* Logo / Header */}
                <div className="h-20 flex items-center justify-center border-b border-gray-700/50 bg-white/5 backdrop-blur-md">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-wide">
                        ADMIN PANEL
                    </h1>
                    {/* Close button Mobile */}
                    <button 
                        onClick={() => setMenu(false)} 
                        className="md:hidden absolute right-4 text-gray-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-hide">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.name}
                                to={item.path}
                                onClick={() => setMenu(false)}
                                className={`
                                    flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
                                    ${isActive 
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20' 
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-transform group-hover:scale-110">
                                    {item.icon}
                                </svg>
                                <span className="font-medium tracking-wide">{item.name}</span>
                            </Link>
                        )
                    })}

                    {/* Logout button */}
                    <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-4 px-4 py-3.5 mt-8 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        <span className="font-medium tracking-wide">Logout</span>
                    </button>
                </nav>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 flex flex-col h-screen relative bg-gray-900">
                
                {/* Mobile Header */}
                <header className="md:hidden flex items-center p-4 bg-slate-900 border-b border-gray-700">
                    <button onClick={handleMenuBar} className="text-gray-300 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <span className="ml-4 text-lg font-semibold text-white">Dashboard</span>
                </header>

                {/* Content Outlet */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-4 md:p-8">
                    {/* Inner container to constrain width if needed, or keep full width */}
                    <div className="max-w-7xl mx-auto animate-fade-in-up">
                        <Outlet />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default AdminDashBoard;