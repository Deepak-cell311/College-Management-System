import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import icon from "../assets/erp-icon.png";

export default function Navbar_landing() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );

  const navItems = [
    { title: "Features", id: "features" },
    { title: "Modules", id: "modules" },
    { title: "Benefits", id: "benefits" },
    { title: "Pricing", id: "pricing" },
    { title: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const section = document.getElementById(id);
    if(section) section.scrollIntoView({behavior: "smooth"})
  };
  return (
    <motion.nav
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg backdrop-blur-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg"
            >
              <img src={icon} alt="" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Apex Campus Solutions
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                // href={item.title}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors relative group cursor-pointer ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.title}
                <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Link to="/dashboard">Sign In</Link>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link to="/dashboard">Get Started</Link>
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  href={`#${item.title.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium text-left"
              >
                <Link to="/dashboard">Sign In</Link>
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                href="/dashboard"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg shadow-lg"
              >
                <Link to="/dashboard">Get Started</Link>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
