import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Target, Sparkles, Rocket, Award } from 'lucide-react';

const benefits = [
    {
        icon: Target,
        title: 'Streamlined Operations',
        description: 'Automate repetitive tasks and reduce administrative workload by up to 70%. Focus on what matters most - education.',
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        icon: Sparkles,
        title: 'Enhanced Collaboration',
        description: 'Connect students, teachers, and parents on a unified platform. Real-time communication and updates keep everyone informed.',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        icon: Rocket,
        title: 'Data-Driven Decisions',
        description: 'Leverage powerful analytics to identify trends, track performance, and make informed strategic decisions for your institution.',
        image: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        icon: Award,
        title: 'Improved Outcomes',
        description: 'Increase student engagement and academic performance with personalized learning paths and timely interventions.',
        image: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
];

export default function Benefits() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    return (
        <section ref={containerRef} className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Why Choose Our ERP?
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Transform your institution with cutting-edge technology
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            benefit={benefit}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BenefitCard({
    benefit,
    index,
    scrollYProgress,
}) {
    const isEven = index % 2 === 0;
    const ref = useRef(null);

    const y = useTransform(
        scrollYProgress,
        [index * 0.25, (index + 1) * 0.25],
        [100, -100]
    );

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
        >
            <motion.div
                style={{ y }}
                className="flex-1 relative group"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden rounded-2xl shadow-2xl mt-20"
                >
                    <img
                        src={benefit.image}
                        width="640"
                        height="320"
                        loading="eager"
                        fetchpriority="high"
                        decoding="async"
                        className="w-full h-80 object-cover top-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
            </motion.div>

            <motion.div className="flex-1 space-y-4">
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className={`inline-flex w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl items-center justify-center shadow-xl`}
                >
                    <benefit.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {benefit.title}
                </h3>

                <p className="text-lg text-gray-700 leading-relaxed">
                    {benefit.description}
                </p>

                <motion.button
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold group"
                >
                    Learn More
                    <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        →
                    </motion.span>
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
