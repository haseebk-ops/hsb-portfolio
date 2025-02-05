import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  X, Home, Github, User, Briefcase, FileText, Code, FileUser, Menu, ChevronLeft, ChevronRight,
  Send, Notebook, Phone, Mail, Linkedin, MapPin, Instagram, ThumbsUp, Share2, Eye, EyeOff  } from 'lucide-react';
import { div } from 'framer-motion/client';


// Sidebar Button Component
const SidebarButton = ({ icon: Icon, label, isActive, isLabelsVisible, hoveredSection, onHover, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => onHover(label)}
      onMouseLeave={() => onHover(null)}
      className={`
        relative p-3 mb-2 rounded-xl
        transition-all duration-200 ease-in-out
        ${isLabelsVisible ? 'w-40 mx-4' : 'w-14 mx-3'}
        ${isActive 
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
          : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="flex items-center"
        animate={{
          justifyContent: isLabelsVisible ? 'flex-start' : 'center',
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-6 h-6 min-w-6" />
        <AnimatePresence mode="wait">
          {isLabelsVisible && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-3 text-sm font-medium"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      {!isLabelsVisible && hoveredSection === label && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap z-50"
        >
          {label}
        </motion.div>
      )}
    </motion.button>
  );
};
  
const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
        setLabelsVisible(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(loadingTimer);
  }, []);

  const sections = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'about', icon: User, label: 'About' },
    { key: 'education', icon: FileText, label: 'Education' },
    { key: 'experience', icon: Briefcase, label: 'Experience' },
    { key: 'projects', icon: Code, label: 'Courses' },
    { key: 'blog', icon: Notebook, label: 'Blog' },
    { key: 'contact', icon: Send, label: 'Contact' }
  ];

  const renderSection = () => {
    const sectionComponents = {
      home: <HomeSection />,
      about: <AboutSection />,
      education: <EducationSection />,
      experience: <ExperienceSection />,
      projects: <ProjectsSection />,
      blog: <BlogPage />,
      contact: <ContactSection />
    };
    return sectionComponents[activeSection];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarVisible(!sidebarVisible)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/90 shadow-lg"
      >
        {sidebarVisible ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Sidebar */}
      <motion.nav
        initial={isMobile ? { x: -320 } : false}
        animate={{ 
          x: sidebarVisible ? 0 : isMobile ? '-250%' : '-320px',
          width: !isMobile && labelsVisible ? '12rem' : '5rem'
        }}
        transition={{ duration: 0.2 }}
        className={`
          fixed top-0 left-0 
          w-64 md:w-20
          bg-white/90 backdrop-blur-md 
          shadow-lg flex flex-col
          h-full z-40
          border-r border-gray-200
          ${isMobile ? 'w-full pt-16' : ''}
        `}
      >
        <div className="flex flex-col justify-center flex-1">
          {sections.map(({ key, icon, label }) => (
            <SidebarButton
              key={key}
              icon={icon}
              label={label}
              isActive={activeSection === key}
              isLabelsVisible={isMobile ? true : labelsVisible}
              hoveredSection={hoveredSection}
              onHover={setHoveredSection}
              onClick={() => {
                setActiveSection(key);
                if (isMobile) setSidebarVisible(false);
              }}
            />
          ))}
        </div>

        {/* Show/Hide Labels button - Only visible on desktop */}
        {!isMobile && (
          <div className="px-3 py-8">
            <motion.button
              onClick={() => setLabelsVisible(!labelsVisible)}
              onMouseEnter={() => setHoveredSection(labelsVisible ? 'Hide labels' : 'Show labels')}
              onMouseLeave={() => setHoveredSection(null)}
              className="relative p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {labelsVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {hoveredSection && (hoveredSection === 'Hide labels' || hoveredSection === 'Show labels') && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap z-50"
                >
                  {hoveredSection}
                </motion.div>
              )}
            </motion.button>
          </div>
        )}
      </motion.nav>

      {/* Main Content */}
      <main
        className={`
          flex-1 transition-all duration-200
          ${sidebarVisible ? (isMobile ? 'ml-0' : (labelsVisible ? 'md:ml-48' : 'md:ml-20')) : 'ml-0'}
          p-8 overflow-y-auto
        `}
      >
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {renderSection()}
        </motion.div>
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarVisible(false)}
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
        />
      )}
    </div>
  );
};
      

// Home Section
const HomeSection = () => (
  <div className=" flex items-center justify-center p-4">
    <div className='w-full flex flex-col justify-center items-center md:flex-row max-w-250 bg-white rounded-xl p-8 
                    shadow-md hover:shadow-lg md:space-x-12 p-6 md:space-y-0 space-y-6 transition-all duration-300 mt-15'>
      {/* Profile Photo */}
      <motion.div 
        className="w-58 h-74 rounded-lg overflow-hidden shadow-lg border-4 border-blue-500"
        whileHover={{ scale: 1.05 }}
      >
        <img 
          src="/images/IMG_0327.jpeg"
          alt="Professional Profile" 
          className="w-full h-full object-cover"
        />
      </motion.div>


      {/* Personal Details */}
      <div className="text-left max-w-lg">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Haseeb K</h1>
        <h2 className="text-2xl text-blue-600 mb-4">Data Analyst</h2>

        {/* Contact Information */}
        <div className="space-y-5 mb-6">
          <div className="flex items-center">
            <Phone size={20} className="mr-3 text-gray-600" />
            <span>+91 97455 81670</span>
          </div>
          <div className="flex items-center">
            <Mail size={20} className="mr-3 text-gray-600" />
            <span>create.haseeb@gmail.com</span>
          </div>
          <div className="flex items-center">
            <MapPin size={20} className="mr-3 text-gray-600" />
            <span>Edavanna, Kerala, India</span>
          </div>
        </div>

        {/* Social Links */}
        {/* Linked IN */}
        <div className="flex space-x-5 mb-6">
          <motion.a 
            href="#" 
            className="hover:text-blue-500"
            whileHover={{ scale: 1.2 }}
          >
            <a href="https://www.linkedin.com/in/haseeb-ops/" className="hover:text-blue-500">
              <Linkedin size={24} />
            </a>
          </motion.a>
          {/* GitHub */}
          <motion.a 
            href="#" 
            className="hover:text-blue-500"
            whileHover={{ scale: 1.2 }}
          >
            <a href="https://github.com/haseeb-ops" className="hover:text-blue-500">
              <Github size={24} />
            </a>
          </motion.a>
          {/* CV */}
          <motion.a 
            href="#" 
            className="hover:text-blue-500"
            whileHover={{ scale: 1.2 }}
          >
            <a href="/pdf/Haseeb New CV.pdf" className="hover:text-blue-500">
              <FileUser size={24} />
            </a>
          </motion.a>
        </div>

        {/* Professional Summary */}
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Professional Summary</h3>
          <p className="text-gray-700">
          Passionate about data science, exploring data analytics, programming, and problem-solving. Driven by curiosity to leverage data for informed decision-making and continuous learning.
          </p>
        </div>
      </div>
    </div>
  </div>
);


// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to a backend
      console.log('Form submitted', formData);
      alert('Message sent successfully!');
      // Reset form after submission
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-150 bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 hover:shadow-lg transition-all duration-300
                ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 hover:shadow-lg transition-all duration-300
                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 hover:shadow-lg transition-all duration-300
                ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 shadow-md border-3 border-blue-600 rounded-full 
                        hover:bg-transparent hover:text-blue-600 transition-all mb-6"
          >
            Send Message
          </button>
        </form>
        {/* Social Links */}
          {/* Linked IN */}
          <div className="flex space-x-5 items-center justify-center">
            <motion.a 
              href="#" 
              className="hover:text-blue-500"
              whileHover={{ scale: 1.2 }}
            >
              <a href="https://www.linkedin.com/in/haseeb-ops/" className="hover:text-blue-500">
                <Linkedin size={24} />
              </a>
            </motion.a>
            {/* GitHub */}
            <motion.a 
              href="#" 
              className="hover:text-blue-500"
              whileHover={{ scale: 1.2 }}
            >
              <a href="https://github.com/haseeb-ops" className="hover:text-blue-500">
                <Github size={24} />
              </a>
            </motion.a>
            {/* CV */}
            <motion.a 
              href="#" 
              className="hover:text-blue-500"
              whileHover={{ scale: 1.2 }}
            >
              <a href="/pdf/Haseeb New CV.pdf" className="hover:text-blue-500">
                <FileUser size={24} />
              </a>
            </motion.a>
            {/* instagram */}
            <motion.a 
              href="#" 
              className="hover:text-blue-500"
              whileHover={{ scale: 1.2 }}
            >
              <a href="https://www.instagram.com/haseeb_shaah_/" className="hover:text-blue-500">
                <Instagram size={24} />
              </a>
            </motion.a>
          </div>      
      </div>
    </div>
  );
};


// About Section
const AboutSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">About Me</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Professional Profile</h3>
        <p>
        Hello, I'm Haseeb, a degree student with a passion for data science. Currently, 
        I am exploring the vast world of data and honing my skills in analytics, programming, 
        and problem-solving. My curiosity and drive for continuous learning guide me as I deepen my 
        understanding of how data can be leveraged to make better decisions.
        </p><br />
        <p> 
        As an individual who enjoys both technical challenges and creative thinking, I am always seeking 
        new ways to apply my knowledge and skills. Outside of my studies, I enjoy working with various tools 
        and techniques that allow me to connect the dots between complex datasets and real-world applications.
        </p><br />
        <p>
        Thank you for visiting my website! I appreciate you taking the time to read a little about me.😊
        </p>
      </div>
      {/* Skills */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
        <div className="flex flex-wrap gap-2 ">
          {['Python', 'SQL', 'Data Analysis', 'Data Visualization', 'Ai Tools'].map(skill => (
            <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm
                                          transform transition-all duration-300 hover:scale-110">
              {skill}
            </span>
          ))}
        </div>
        {/* Software Skills */}
          <br />
        <h3 className="text-xl font-semibold mb-4">Software Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['Adobe Photoshop', 'Adobe Illustrator', 'Excel', 'Access', 'Microsoft Office', 'Power BI', 'Adobe InDesign'].map(skill => (
            <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm
                                          transform transition-all duration-300 hover:scale-110">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);


// Education Section
const EducationSection = () => (
    <div>
      <h2 className="text-3xl font-bold mb-6">Education</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold">Bachelor of Computer Applications</h3>
          <p className="text-gray-600">Yenepoya University</p>
          <p className="text-gray-500">July 2024 - Present</p>  
          <p className="mt-2 font-semibold">Skills Gained:</p>
          <ul className="list-disc ml-6">
            <li>Programming in C</li>
            <li>Data Structures and Algorithms</li>
            <li>Database Management Systems</li>
            <li>Problem-solving and Critical Thinking</li>
          </ul>
        </div>
        {/* Plus two */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold">Senior Secondary</h3>
          <p className="text-gray-600">HMS Higher Secondary</p>
          <p className="text-gray-500">July 2022 - March 2024</p>  
          <p className="text-gray-600">Steam: Science</p>
          <p className="text-gray-600">Grade: 87%</p>
        </div>
        {/* Darul Irfan */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold">Secondary</h3>
          <p className="text-gray-600">Darul Irfan Academy</p>
          <p className="text-gray-500">July 2016 - March 2022</p>  
          <p className="mt-2 font-semibold">Skills Gained:</p>
          <ul className="list-disc ml-6">
            <li>Many softwares</li>
            <li>Literature</li>
          </ul>
        </div>
      </div>
    </div>
);


// Experience Section
const ExperienceSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Professional Experience</h2>
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-semibold">Financial Accountant</h3>
        <p className="text-gray-600">Pompano Arabian Seafood Restaurant</p>
        <p className="text-gray-500">Jun 2024 - Nov 2024 · 6 mos</p>
        <ul className="list-disc list-inside mt-2">
          <li>Collaborated with a colleague to create a Google Sheet for automating daily and monthly stock, expense, and profit calculations</li>
          <li>Streamlined stock tracking processes, reducing errors and improving efficiency by 40%</li>
          <li>Prepared detailed daily and monthly financial reports to support decision-making</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-semibold">Technical Manager</h3>
        <p className="text-gray-600">Riplex Influencer Marketing Agency</p>
        <p className="text-gray-500">Jun 2023 - Nov 2023 · 6 mos</p>
        <ul className="list-disc list-inside mt-2">
          <li>Automated campaign performance reporting using tools like Google Sheets and Excel, reducing manual work by 30%</li>
          <li>Analyzed audience engagement metrics to identify trends and improve campaign effectiveness</li>
          <li>Designed Instagram posts to align with campaign goals and enhance brand visibility</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-semibold"> Freelance Graphic Designer</h3>
        <a 
          href="https://www.instagram.com/magictool.creative.hub/" 
          className="text-gray-600 italic underline hover:text-blue-500 hover:underline"
        >
          Instagram Page
        </a>
        <p className="text-gray-500">Jan 2021 - Oct 2024 · 3 yrs 10 mos</p>
        <ul className="list-disc list-inside mt-2">
          <li>Delivered custom graphic design solutions, including branding, social media posts, and marketing materi als, to help clients enhance their visual identity</li>
          <li>Collaborated with clients to understand their needs and provided creative designs that aligned with their business goals, improving customer engagement</li>
          <li>Delivered custom graphic design solutions for branding, social media posts, and marketing materials, collaborating with clients to create designs aligned with their business goals.</li>
        </ul>
      </div>

    </div>
  </div>
);


// PDF opening Model
const PDFModal = ({ isOpen, onClose, pdfUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalAnimation, setModalAnimation] = useState('opacity-0 scale-95');

  useEffect(() => {
    if (isOpen) {
      setModalAnimation('opacity-100 scale-100');
    } else {
      setModalAnimation('opacity-0 scale-95');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        className={`
          bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 relative
          transform transition-all duration-300 ease-out
          ${modalAnimation}
        `}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Certificate View</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-inner">
            <iframe
              src={pdfUrl}
              className="w-full h-[70vh] min-h-[600px]"
              title="Certificate View"
              frameBorder="0"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Modal
const ProjectModal = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalAnimation, setModalAnimation] = useState('opacity-0 scale-95');

  useEffect(() => {
    if (isOpen) {
      setModalAnimation('opacity-100 scale-100');
    } else {
      setModalAnimation('opacity-0 scale-95');
    }
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const showNavigation = project.images && project.images.length > 1;

  const nextImage = () => {
    if (project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  const currentImage = project.images && project.images[currentImageIndex];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        className={`
          bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 relative
          transform transition-all duration-300 ease-out
          max-h-[90vh] flex flex-col
          ${modalAnimation}
        `}
      >
        <div className="p-4 border-b flex items-center justify-between shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">{project.title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-blue-100">
          {currentImage && (
            <div className="relative rounded-lg overflow-hidden border-2 border-blue-600">
              <motion.img
                key={currentImageIndex}
                src={currentImage}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              />

              {showNavigation && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                             text-white transition-all duration-300 hover:bg-black/70 
                             transform hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                             text-white transition-all duration-300 hover:bg-black/70 
                             transform hover:scale-110 active:scale-95"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 
                                rounded text-sm backdrop-blur-sm">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                </>
              )}
            </div>
          )}
          
          <div>
            <div className="space-x-4 mt-5 flex">
              <a
                href={project.projectUrl}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-md shadow-md border-3 border-blue-600 transition-all 
                            hover:bg-transparent hover:text-blue-600"
              >
                View Project
              </a>
              <a
                href={project.githubUrl}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-md shadow-md border-3 border-blue-600 transition-all 
                            hover:bg-transparent hover:text-blue-600"
              >
                GitHub Repo
              </a>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {project.date && (
              <div>
                <h4 className="font-semibold text-lg">Date</h4>
                <p>{project.date}</p>
              </div>
            )}

            {project.fullDescription && (
              <div>
                <h4 className="font-semibold text-lg">Description</h4>
                <p>{project.fullDescription}</p>
              </div>
            )}

            {project.skills && project.skills.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm
                               transform transition-all duration-300 hover:scale-110"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Project Section -- Main
const ProjectsSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const openModal = (url) => {
    setPdfUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPdfUrl('');
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };


  const certificates = [
    {
      title: "Data Analysis with Spreadsheets and SQL",
      issuedBy: "Meta",
      issueDate: "February 2025",
      credentialId: "ZF5LOYO73PRJ",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/ZF5LOYO73PRJ",
      skills: "Data Analysis, Machine Learning",
      pdfUrl: "/pdf/DA2.pdf",
      category: "Data Analytics",
      isPinned: true
    },
    {
      title: "Intro to SQL",
      issuedBy: "Kaggle",
      issueDate: "February 2025",
      credentialUrl: "https://www.kaggle.com/learn/certification/haseeb666/intro-to-sql",
      skills: "SQL",
      pdfUrl: "/pdf/SQL-Kaggle.pdf",
      category: "Data Analytics",
      isPinned: true
    },
    {
      title: "Data Analysis with Spreadsheets and SQL",
      issuedBy: "Meta",
      issueDate: "February 2025",
      credentialId: "ZF5LOYO73PRJ",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/ZF5LOYO73PRJ",
      skills: "Data Analysis, Machine Learning",
      pdfUrl: "/pdf/DA2.pdf",
      isPinned: true
    },
    {
      title: "Intro to SQL",
      issuedBy: "Kaggle",
      issueDate: "February 2025",
      credentialUrl: "https://www.kaggle.com/learn/certification/haseeb666/intro-to-sql",
      skills: "SQL",
      pdfUrl: "/pdf/SQL-Kaggle.pdf",
      isPinned: true
    },
    {
      title: "Introduction to Data Analytics",
      issuedBy: "Meta",
      issueDate: "January 2025",
      credentialId: "46A0BUNP8V8W",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/46A0BUNP8V8W",
      skills: "Data Analysis",
      pdfUrl: "/pdf/DA1.pdf",
      isPinned: true
    },
    {
      title: "Introduction to Data Analysis using Microsoft Excel",
      issuedBy: "Coursera Project Network",
      issueDate: "August 2024",
      credentialId: "SRYB8Q35SLZ2",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/SRYB8Q35SLZ2",
      skills: "Microsoft Excel",
      pdfUrl: "/pdf/EX1.pdf",
      isPinned: false
    },
    {
      title: "Web Development With HTML",
      issuedBy: "Edapt",
      issueDate: "June 2022",
      credentialId: "EDPT1655911527629M",
      skills: "HTML, Cascading Style Sheets (CSS)",
      pdfUrl: "/pdf/HTML.pdf",
      isPinned: false
    }
  ];

  const projects = [
    {
      title: "Project 1",
      shortDescription: "Brief project description, technologies used",
      fullDescription: "Detailed explanation of the project, its goals, and implementation details.asfgnsdfkjgnsdrthodfiugvbzfn,clgdhizug dl;fgbzdflkgjdrzighfnxcvbnzitughfnbjkn cvsdigherouig righdfkgj dirutghdf, ertghdfkghaeurfgsdgjkd rtguihdfgbjZHrio asghfdkbv rdyhfugijvnfvbxhniughdfbkjcvnbuyzdgdf difghzudghfkbjnuzyhgf gdziuoghdfjkgbvnvc",
      projectUrl: "#",
      githubUrl: "#",
      date: "January 2024",
      skills: ["React", "Node.js", "MongoDB"],
      images: [
        "/images/IMG_0327.jpeg",
        "/images/HTML.png",
        "/images/CA2.jpeg"
      ]
    },
    // ... other projects
  ];

  const pinnedCertificates = certificates.filter(cert => cert.isPinned);
  const displayedCertificates = showAll ? certificates : pinnedCertificates;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Certificates & Projects</h2>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">Certificates ({certificates.length})</h3>
          {certificates.length > pinnedCertificates.length && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative inline-flex shadow-md items-center px-4 py-2 text-sm font-medium text-white 
                        bg-blue-600 rounded-full border-3 border-blue-600 transition-all duration-300 
                        hover:bg-transparent hover:text-blue-600 group"
            >             
                            
              <span className="relative">
                {showAll ? 'Show Less' : 'Show All'}
              </span>
              <span className={`ml-2 transform transition-transform duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`}>
                ↓
              </span>
            </button>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {displayedCertificates.map((cert, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 
                         transform opacity-0 animate-fade-slide-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <h4 className="text-xl font-semibold mb-3">{cert.title}</h4>
              <p className="text-gray-600">Issued By: {cert.issuedBy}</p>
              <p className="text-gray-600">Issue Date: {cert.issueDate}</p>
              {cert.credentialId && (
                <p className="text-gray-600">Credential ID: {cert.credentialId}</p>
              )}
              {cert.credentialUrl && (
                <p className="text-gray-600">
                  Credential URL: <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </p>
              )}
              <p className="text-gray-600">Skills Gained: {cert.skills}</p>
              <div className="mt-4">
                <button
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-md border-3 border-blue-600 
                            transition-all duration-300 hover:bg-transparent hover:text-blue-600 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => openModal(cert.pdfUrl)}
                >
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-slide-up {
          animation: fade-slide-up 0.5s ease-out;
        }
      `}</style>
      
      <PDFModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pdfUrl={pdfUrl}
      />

      {/* Projects Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl"
            >
              <h4 className="text-xl font-semibold">{project.title}</h4>
              <p>{project.shortDescription}</p>
              <div className="mt-5 flex items-center justify-between">
                <div className="space-x-4">
                  <a
                    onClick={() => openProjectModal(project)}
                    className="bg-transparent text-blue-600 px-3 py-1.5 rounded-md shadow-md border-3 border-blue-600 transition-all 
                                hover:bg-blue-600 hover:text-white"
                  >
                    View Project
                  </a>
                  <a
                    href={project.githubUrl}
                    className="bg-transparent text-blue-600 px-3 py-1.5 rounded-md shadow-md border-3 border-blue-600 transition-all 
                                hover:bg-blue-600 hover:text-white"
                  >
                    GitHub Repo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeProjectModal}
          project={selectedProject}
        />
      </div>
    </div>
  );
};


// Blog
const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState("");

  useEffect(() => {
    const fetchMarkdownFiles = async () => {
      const postDates = [
        { date: "2025-02-03",
          title: "Understanding SQL Joins",
          image: "https://www.devtodev.com/upload/images/sql5_2.png"}
        // { date: "2025-01-10", 
        //   title: "Mastering CSS Grid",
        //   image: "https://www.devtodev.com/upload/images/sql5_2.png"},
        // { date: "2025-01-05", title: 
        //   "JavaScript Best Practices",
        //   image: "https://www.devtodev.com/upload/images/sql5_2.png"}
      ]; // Custom titles added here

      const posts = await Promise.all(
        postDates.map(async ({ date, title, image}) => {
          const response = await fetch(`/blogPosts/${date}.md`);
          if (!response.ok) return null;
          const content = await response.text();
          return { id: date, title, content, likes: 0, image}; // Add a like count for each post
        })
      );
      setBlogPosts(posts.filter(Boolean));
    };

    fetchMarkdownFiles();
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission (you can store it, or post to a backend)
    alert(`Your comment: ${comments}`);
    setComments(""); // Clear comment input after submission
  };

  const postVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  const handleLike = (postId) => {
    setBlogPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  if (selectedPost) {
    return (
      <motion.div className="max-w-4xl mx-auto px-4 py-8 font-montserrat" initial="hidden" animate="visible" variants={postVariants}>
        <button
          onClick={() => setSelectedPost(null)}
          className="text-blue-500 hover:text-blue-600 transition-all duration-300 hover:-translate-x-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Posts
        </button>
        <article className="prose lg:prose-xl">
          <h1 className="text-5xl font-bold mt-10">{selectedPost.title}</h1> {/* Main heading styling */}
          <p className="text-sm text-gray-500 mt-4 font-semibold">
            Posted on: {new Date(selectedPost.id).toLocaleDateString()}
          </p>
          <img 
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-full object-cover mt-5"
          />
          {/* Add grey line below Posted on */}
          <div className="border-b border-gray-300 mt-5"></div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-bold mt-10">{children}</h1>,
              h2: ({ children }) => <h2 className="text-3xl font-bold mt-8">{children}</h2>,
              h3: ({ children }) => <h3 className="text-2xl font-bold mt-6">{children}</h3>,
              p: ({ children }) => <p className="text-lg leading-relaxed mt-2">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
              table: ({ children }) => (
                <table className="border-collapse border border-gray-300 w-full">{children}</table>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 bg-gray-200 px-3 py-2">{children}</th>
              ),
              td: ({ children }) => <td className="border border-gray-300 px-3 py-2">{children}</td>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-600">
                  {children}
                </blockquote>
              ),
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div">
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-red-500" {...props}>
                    {children}
                  </code>
                );
              },
              hr: () => <hr className="my-4 border-t-2 border-gray-300" />,
            }}
          >
            {selectedPost.content}
          </ReactMarkdown>
        </article>

        {/* Line under the content */}
        <div className="border-b border-gray-300 mt-8"></div>

        {/* Like and Share buttons */}
        <div className="flex items-center justify-between mt-4">
          <motion.button
            className="flex items-center text-blue-500 hover:text-blue-600 font-semibold"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleLike(selectedPost.id)}
          >
            <ThumbsUp size={20} className="mr-2" /> {selectedPost.likes} Likes
          </motion.button>
          <motion.button
            className="flex items-center text-blue-500 hover:text-blue-600 font-semibold"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Share2 size={20} className="mr-2" /> Share
          </motion.button>
        </div>

        {/* Comment Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Add a Comment</h3>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Write your comment here..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            <motion.button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
              variants={buttonVariants}
              whileHover={{scale: 1.02}}
              whileTap="tap"
            >
              Submit Comment
            </motion.button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mb-12 animate-fadeIn">
    <h2 className="text-3xl font-bold mb-6">Blog</h2>
    <div className="grid md:grid-cols-3 gap-8">
    {blogPosts.map(post => (
      <div 
        key={post.id} 
        className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      >
        <div className="p-6">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
          <p className="text-gray-500 text-sm mb-2 font-semibold">Posted on: {new Date(post.id).toLocaleDateString()}</p>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="flex justify-between items-center">
            <button 
              className="text-blue-500 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
              onClick={() => setSelectedPost(post)}
            >
              Read More →
            </button>
            <button 
              className="flex items-center text-blue-500 font-semibold hover:text-blue-600 
                          hover:scale-105 transition-all duration-300"
              onClick={() => handleLike(post.id)}
            >
              <ThumbsUp size={20} className="mr-2 " /> {post.likes} Likes
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};


export default PortfolioWebsite;
