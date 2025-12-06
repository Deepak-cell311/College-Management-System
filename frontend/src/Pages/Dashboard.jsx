import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate()
    const handleNavigate = (path) => {
        console.log(`Navigating to: ${path}`)
        navigate(path)
    }

    const cards = [
        {
            title: "Admin",
            description: "Manage all administrative tasks.",
            path: "/adminLogin",
            gradient: "from-blue-600 to-blue-800",
            icon: (
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            ),
        },
        {
            title: "Student",
            description: "Access course materials and assignments.",
            path: "/studentLogin",
            gradient: "from-cyan-500 to-blue-600",
            icon: (
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
        },
        {
            title: "Teacher",
            description: "Create courses and track progress.",
            path: "/teacherLogin",
            gradient: "from-indigo-500 to-blue-700",
            icon: (
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                </svg>
            ),
        },
    ]

    // Floating particles animation
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 4,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
    }))

    return (
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-screen flex justify-center items-center relative overflow-hidden">
            {/* Animated background particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-blue-400/20"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                    }}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{
                        y: "-100vh",
                        opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Glowing orbs */}
            <motion.div
                className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Main content */}
            <div className="flex flex-col justify-center items-center z-10 px-4">
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Welcome to the{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Dashboard</span>
                </motion.h1>

                <motion.p
                    className="text-blue-200/70 text-lg mb-10 text-center max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Select your role to continue
                </motion.p>

                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            onClick={() => handleNavigate(card.path)}
                            className={`p-8 bg-gradient-to-br ${card.gradient} rounded-2xl shadow-2xl text-white flex flex-col items-center cursor-pointer min-w-[220px] border border-white/10 backdrop-blur-sm`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2 + index * 0.15,
                                ease: "easeOut",
                            }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    delay: 0.4 + index * 0.15,
                                }}
                            >
                                {card.icon}
                            </motion.div>
                            <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
                            <p className="text-center text-blue-100/80 text-sm">{card.description}</p>
                            <motion.div className="mt-4 flex items-center text-sm text-white/70" whileHover={{ x: 5 }}>
                                Enter
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
