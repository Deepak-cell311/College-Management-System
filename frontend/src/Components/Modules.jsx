import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, BookOpen, DollarSign, Library, ClipboardList, TrendingUp } from 'lucide-react';

const modules = [
  {
    icon: Users,
    title: 'Student Portal',
    description: 'Complete student lifecycle management from admission to graduation',
    features: ['Admission Management', 'Profile Management', 'Attendance Tracking', 'Grade Reports'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: 'Academic Management',
    description: 'Comprehensive tools for curriculum planning and course management',
    features: ['Course Creation', 'Timetable Generation', 'Exam Management', 'Assignment Tracking'],
    color: 'from-cyan-500 to-teal-500',
  },
  {
    icon: DollarSign,
    title: 'Finance & Accounting',
    description: 'Complete financial management with fee collection and reporting',
    features: ['Fee Management', 'Payment Gateway', 'Financial Reports', 'Budget Planning'],
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: Library,
    title: 'Library Management',
    description: 'Digital library system with book tracking and online catalogs',
    features: ['Book Cataloging', 'Issue & Return', 'Fine Management', 'Digital Resources'],
    color: 'from-blue-600 to-indigo-600',
  },
  {
    icon: ClipboardList,
    title: 'HR Management',
    description: 'Streamlined human resource and payroll management',
    features: ['Employee Records', 'Payroll Processing', 'Leave Management', 'Performance Review'],
    color: 'from-cyan-600 to-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Reports & Analytics',
    description: 'Powerful analytics and customizable reporting tools',
    features: ['Custom Reports', 'Data Visualization', 'Performance Analytics', 'Export Options'],
    color: 'from-emerald-600 to-teal-600',
  },
];

export default function Modules() {
  const [activeModule, setActiveModule] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Comprehensive Modules
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            All-in-one solution for every aspect of educational management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveModule(index)}
              onMouseLeave={() => setActiveModule(null)}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-white/20"
              >
                <motion.div
                  animate={{
                    scale: activeModule === index ? 1.1 : 1,
                    rotate: activeModule === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <module.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-blue-200 mb-4">{module.description}</p>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeModule === index ? 'auto' : 0,
                    opacity: activeModule === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 pt-4 border-t border-white/20">
                    {module.features.map((feature, fIndex) => (
                      <motion.li
                        key={fIndex}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                          x: activeModule === index ? 0 : -20,
                          opacity: activeModule === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: fIndex * 0.05 }}
                        className="text-sm text-blue-100 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeModule === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${module.color} origin-left`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
