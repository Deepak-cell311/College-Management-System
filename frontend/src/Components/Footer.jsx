import { motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Apex Campus Solutions</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering educational institutions with cutting-edge management solutions.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {['Student Management', 'Academic Tools', 'Finance Module', 'HR System', 'Analytics', 'Mobile App'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Partners', 'Blog', 'Resources', 'Support'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 mt-0.5 text-blue-400" />
                <span>contact@apexcampus.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 mt-0.5 text-blue-400" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 text-blue-400" />
                <span>123 Education Street<br />Tech City, TC 12345</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Apex Campus Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -2 }}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
