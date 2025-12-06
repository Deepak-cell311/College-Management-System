import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, Users, FileText, BarChart3, BookOpen, Shield, Clock, Zap } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated timetable generation with conflict detection and optimization algorithms.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Student Management',
    description: 'Comprehensive student profiles, attendance tracking, and performance analytics.',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Centralized digital repository for all institutional documents and records.',
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time insights and data visualization for informed decision-making.',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    icon: BookOpen,
    title: 'Course Management',
    description: 'Streamlined curriculum planning, assignment tracking, and grading system.',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Secure Access',
    description: 'Role-based access control with enterprise-grade security protocols.',
    gradient: 'from-teal-600 to-cyan-600',
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Automated attendance and working hours monitoring for staff and students.',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Quick Actions',
    description: 'Instant access to frequently used features with customizable shortcuts.',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-white via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Everything you need to manage your educational institution efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1, rotate: 0 }}
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
        >
          <feature.icon className="w-7 h-7 text-white" />
        </motion.div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>

        <motion.div
          initial={{ width: 0 }}
          animate={isHovered ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient}`}
        />
      </motion.div>
    </motion.div>
  );
}

