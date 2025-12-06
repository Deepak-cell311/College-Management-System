import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = href;
      } else {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.nav
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/">
            <motion.div
              className="text-2xl font-bold text-primary-600 dark:text-primary-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <motion.li key={link.name}>
                  {link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                    <Link
                      to={link.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <motion.span
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <motion.span
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        {link.name}
                      </motion.span>
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Navigation button */}
          <div className="flex items-center md:hidden space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <motion.li key={link.name}>
                  {link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                    <Link
                      to={link.href}
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 w-full text-left"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.name}
                      </motion.span>
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;