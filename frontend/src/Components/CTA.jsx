import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Transform Your Institution?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Join hundreds of institutions already benefiting from our comprehensive ERP solution
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 group"
            >
              Start Free Trial
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-all"
            >
              Contact Sales
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-white"
          >
            {['No credit card required', '30-day free trial', '24/7 support', 'Easy migration'].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
