import { AnimatePresence, motion } from 'framer-motion';
import { title } from 'framer-motion/client';
import {
  BadgeCheck,
  Briefcase,
  Eye, EyeOff,
  FileText,
  FileUser,
  Github,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Notebook, Phone, ArrowLeft,
  Send,
  Share2,
  Heart, Search,
  User,
  X
} from 'lucide-react';
import React, { useState, useEffect } from 'react';





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
    { key: 'experience', icon: Briefcase, label: 'Experiences' },
    { key: 'certificate', icon: BadgeCheck, label: 'Certificates' },
    // { key: 'projects', icon: Code, label: 'Projects' },
    { key: 'blog', icon: Notebook, label: 'Blogs' },
    { key: 'contact', icon: Send, label: 'Contact' }
  ];

  const renderSection = () => {
    const sectionComponents = {
      home: <HomeSection />,
      about: <AboutSection />,
      education: <EducationSection />,
      experience: <ExperienceSection />,
      certificate: <CertificateSection />,
      // projects: <ProjectsSection />,
      blog: <BlogSection />,
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
        className="md:hidden fixed bottom-4 left-4 z-50 p-2 rounded-lg bg-white/90 shadow-lg"
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
  <div className="flex items-center justify-center p-4">
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
          <a
            href="#" 
            className="text-white border bg-blue-600 p-2 border-3 border-blue-600 rounded-md
                        hover:text-blue-600 hover:bg-transparent transition-all duration-300"
          >
            <a href="https://www.linkedin.com/in/haseeb-ops/">
              <Linkedin size={24} />
            </a>
          </a>
          {/* GitHub */}
          <a 
            href="#" 
            className="text-white border bg-blue-600 p-2 border-3 border-blue-600 rounded-md
                        hover:text-blue-600 hover:bg-transparent transition-all duration-300"
          >
            <a href="https://github.com/haseeb-ops" className="hover:text-blue-500">
              <Github size={24} />
            </a>
          </a>
          {/* CV */}
          <a 
            href="#" 
            className="text-white border bg-blue-600 p-2 border-3 border-blue-600 rounded-md
                        hover:text-blue-600 hover:bg-transparent transition-all duration-300"
          >
            <a href="/pdf/Haseeb New CV.pdf" className="hover:text-blue-500">
              <FileUser size={24} />
            </a>
          </a>
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
    <div className="flex items-center justify-center p-4">
      <div className="w-full mt-16 md:flex-row max-w-150 bg-white rounded-xl p-8 
                  shadow-md hover:shadow-lg md:space-x-12 md:space-y-0 space-y-6 transition-all duration-300">
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
              className="hover:text-blue-500 "
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
            <span key={skill} className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm
                                          transform transition-all duration-300 hover:scale-105">
              {skill}
            </span>
          ))}
        </div>
        {/* Software Skills */}
          <br />
        <h3 className="text-xl font-semibold mb-4">Software Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['Adobe Photoshop', 'Adobe Illustrator', 'Excel', 'Access', 'Microsoft Office', 'Power BI', 'Adobe InDesign'].map(skill => (
            <span key={skill} className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm
                                          transform transition-all duration-300 hover:scale-105">
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


// Certificate Section
const CertificateSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openModal = (url) => {
    if (!isMobile) {
      setPdfUrl(url);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setPdfUrl('');
  };

  const certificates = [
    {
      title: "Python for Data Science, AI & Development",
      issuedBy: "IBM",
      issueDate: "February 2025",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/F7EDZ1JZ9J1O",
      skills: "Python, NumPy, Pandas",
      pdfUrl: "/pdf/Python for DS.pdf"
    },
    {
      title: "Python for Data Science and AI",
      issuedBy: "IBM",
      issueDate: "February 2025",
      credentialUrl: "https://www.credly.com/badges/ba360df7-5076-407d-9be5-dc023d59bbed",
      skills: "Python",
      pdfUrl: "/pdf/Badge1.pdf"
    },
    {
      title: "Data Analysis with Spreadsheets and SQL",
      issuedBy: "Meta",
      issueDate: "February 2025",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/ZF5LOYO73PRJ",
      skills: "SQL, Spreadsheet, Tableau",
      pdfUrl: "/pdf/DA2.pdf"
    },
    {
      title: "Intro to SQL",
      issuedBy: "Kaggle",
      issueDate: "February 2025",
      credentialUrl: "https://www.kaggle.com/learn/certification/haseeb666/intro-to-sql",
      skills: "SQL",
      pdfUrl: "/pdf/SQL-Kaggle.pdf"
    },
    {
      title: "Introduction to Data Analytics",
      issuedBy: "Meta",
      issueDate: "January 2025",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/46A0BUNP8V8W",
      skills: "Data Analysis",
      pdfUrl: "/pdf/DA1.pdf"
    },
    {
      title: "Introduction to Data Analysis using Microsoft Excel",
      issuedBy: "Coursera Project Network",
      issueDate: "August 2024",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/SRYB8Q35SLZ2",
      skills: "Microsoft Excel",
      pdfUrl: "/pdf/EX1.pdf"
    },
    {
      title: "Web Development With HTML",
      issuedBy: "Edapt",
      issueDate: "June 2022",
      skills: "HTML, Cascading Style Sheets (CSS)",
      pdfUrl: "/pdf/HTML.pdf"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Certificates ({certificates.length})</h2>
      <div className="mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold">{cert.title}</h4>
              <p className="text-gray-600">Issued By: {cert.issuedBy}</p>
              <p className="text-gray-600">Issue Date: {cert.issueDate}</p>
              {cert.credentialUrl && (
                <p className="text-gray-600">
                  Credential URL: <a href={cert.credentialUrl} target="_blank" className="text-blue-600 hover:underline">View</a>
                </p>
              )}
              <p className="text-gray-600">Skills Gained: {cert.skills}</p>
              <div className="mt-4 flex text-center">
                {!isMobile && (
                  <button 
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-md border-3 border-blue-600 transition-all 
                      hover:bg-transparent hover:text-blue-600"
                    onClick={() => openModal(cert.pdfUrl)}
                  >
                    View Certificate
                  </button>
                )}
                <a 
                  href={cert.credentialUrl}
                  target="_blank"
                  className={`bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-md border-3 border-blue-600 transition-all 
                    hover:bg-transparent hover:text-blue-600 ${!isMobile ? 'ml-3' : ''}`}
                >
                  View Credential
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PDFModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pdfUrl={pdfUrl}
      />
    </div>
  );
};



// Project Section
// const ProjectsSection = ({ project }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   if (!project) {
//     return <p className="text-center text-gray-500">Project not found.</p>;
//   }

//   const showNavigation = project.images && project.images.length > 1;
//   const currentImage = project.images && project.images[currentImageIndex];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === project.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const previousImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? project.images.length - 1 : prev - 1
//     );
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
//       <div className="relative rounded-lg overflow-hidden border-2 border-blue-600 mb-6">
//         {currentImage && (
//           <motion.img
//             key={currentImageIndex}
//             src={currentImage}
//             alt={`${project.title} - Image ${currentImageIndex + 1}`}
//             className="w-full h-64 object-cover"
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//           />
//         )}
//         {showNavigation && (
//           <>
//             <button
//               onClick={previousImage}
//               className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full 
//               text-white hover:bg-black/70 transform hover:scale-110"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full 
//               text-white hover:bg-black/70 transform hover:scale-110"
//             >
//               <ChevronRight size={24} />
//             </button>
//             <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
//               {currentImageIndex + 1} / {project.images.length}
//             </div>
//           </>
//         )}
//       </div>

//       <div className="space-y-6">
//         {project.fullDescription && (
//           <div>
//             <h2 className="text-lg font-semibold">Description</h2>
//             <p className="text-gray-700">{project.fullDescription}</p>
//           </div>
//         )}
//         {project.date && (
//           <div>
//             <h2 className="text-lg font-semibold">Date</h2>
//             <p>{project.date}</p>
//           </div>
//         )}
//         {project.skills && project.skills.length > 0 && (
//           <div>
//             <h2 className="text-lg font-semibold">Skills & Technologies</h2>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {project.skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="mt-4 flex space-x-4">
//           <a
//             href={project.projectUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-transparent hover:text-blue-600 border border-blue-600"
//           >
//             View Project
//           </a>
//           <a
//             href={project.githubUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-transparent hover:text-blue-600 border border-blue-600"
//           >
//             GitHub Repo
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// Blog
// const BlogPage = () => {
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [comments, setComments] = useState("");

//   useEffect(() => {
//     const fetchMarkdownFiles = async () => {
//       const postDates = [
//         { date: "2025-02-03",
//           title: "Understanding SQL Joins",
//           image: "https://www.devtodev.com/upload/images/sql5_2.png"}
//         // { date: "2025-01-10", 
//         //   title: "Mastering CSS Grid",
//         //   image: "https://www.devtodev.com/upload/images/sql5_2.png"},
//         // { date: "2025-01-05", title: 
//         //   "JavaScript Best Practices",
//         //   image: "https://www.devtodev.com/upload/images/sql5_2.png"}
//       ]; // Custom titles added here

//       const posts = await Promise.all(
//         postDates.map(async ({ date, title, image}) => {
//           const response = await fetch(`/blogPosts/${date}.md`);
//           if (!response.ok) return null;
//           const content = await response.text();
//           return { id: date, title, content, likes: 0, image}; // Add a like count for each post
//         })
//       );
//       setBlogPosts(posts.filter(Boolean));
//     };

//     fetchMarkdownFiles();
//   }, []);

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     // Handle comment submission (you can store it, or post to a backend)
//     alert(`Your comment: ${comments}`);
//     setComments(""); // Clear comment input after submission
//   };

//   const postVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.5 } },
//   };

//   const buttonVariants = {
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//     tap: { scale: 0.9 },
//   };

//   const handleLike = (postId) => {
//     setBlogPosts(prevPosts =>
//       prevPosts.map(post =>
//         post.id === postId ? { ...post, likes: post.likes + 1 } : post
//       )
//     );
//   };

//   if (selectedPost) {
//     return (
//       <motion.div className="max-w-4xl mx-auto px-4 py-8 font-montserrat" initial="hidden" animate="visible" variants={postVariants}>
//         <button
//           onClick={() => setSelectedPost(null)}
//           className="text-blue-500 hover:text-blue-600 transition-all duration-300 hover:-translate-x-1"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           ← Back to Posts
//         </button>
//         <article className="prose lg:prose-xl">
//           <h1 className="text-5xl font-bold mt-10">{selectedPost.title}</h1> {/* Main heading styling */}
//           <p className="text-sm text-gray-500 mt-4 font-semibold">
//             Posted on: {new Date(selectedPost.id).toLocaleDateString()}
//           </p>
//           <img 
//             src={selectedPost.image}
//             alt={selectedPost.title}
//             className="w-full h-full object-cover mt-5"
//           />
//           {/* Add grey line below Posted on */}
//           <div className="border-b border-gray-300 mt-5"></div>
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             components={{
//               h1: ({ children }) => <h1 className="text-4xl font-bold mt-10">{children}</h1>,
//               h2: ({ children }) => <h2 className="text-3xl font-bold mt-8">{children}</h2>,
//               h3: ({ children }) => <h3 className="text-2xl font-bold mt-6">{children}</h3>,
//               p: ({ children }) => <p className="text-lg leading-relaxed mt-2">{children}</p>,
//               ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
//               ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
//               table: ({ children }) => (
//                 <table className="border-collapse border border-gray-300 w-full">{children}</table>
//               ),
//               th: ({ children }) => (
//                 <th className="border border-gray-300 bg-gray-200 px-3 py-2">{children}</th>
//               ),
//               td: ({ children }) => <td className="border border-gray-300 px-3 py-2">{children}</td>,
//               blockquote: ({ children }) => (
//                 <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-600">
//                   {children}
//                 </blockquote>
//               ),
//               code({ node, inline, className, children, ...props }) {
//                 const match = /language-(\w+)/.exec(className || "");
//                 return !inline && match ? (
//                   <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div">
//                     {String(children).replace(/\n$/, "")}
//                   </SyntaxHighlighter>
//                 ) : (
//                   <code className="bg-gray-100 px-1 py-0.5 rounded text-red-500" {...props}>
//                     {children}
//                   </code>
//                 );
//               },
//               hr: () => <hr className="my-4 border-t-2 border-gray-300" />,
//             }}
//           >
//             {selectedPost.content}
//           </ReactMarkdown>
//         </article>

//         {/* Line under the content */}
//         <div className="border-b border-gray-300 mt-8"></div>

//         {/* Like and Share buttons */}
//         <div className="flex items-center justify-between mt-4">
//           <motion.button
//             className="flex items-center text-blue-500 hover:text-blue-600 font-semibold"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={() => handleLike(selectedPost.id)}
//           >
//             <ThumbsUp size={20} className="mr-2" /> {selectedPost.likes} Likes
//           </motion.button>
//           <motion.button
//             className="flex items-center text-blue-500 hover:text-blue-600 font-semibold"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//           >
//             <Share2 size={20} className="mr-2" /> Share
//           </motion.button>
//         </div>

//         {/* Comment Section */}
//         <div className="mt-8">
//           <h3 className="text-2xl font-bold mb-4">Add a Comment</h3>
//           <form onSubmit={handleCommentSubmit} className="space-y-4">
//             <textarea
//               className="w-full p-4 border border-gray-300 rounded-lg"
//               rows="4"
//               placeholder="Write your comment here..."
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//             />
//             <motion.button
//               type="submit"
//               className="px-6 py-2 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
//               variants={buttonVariants}
//               whileHover={{scale: 1.02}}
//               whileTap="tap"
//             >
//               Submit Comment
//             </motion.button>
//           </form>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="mb-12 animate-fadeIn">
//     <h2 className="text-3xl font-bold mb-6">Blog</h2>
//     <div className="grid md:grid-cols-3 gap-8">
//     {blogPosts.map(post => (
//       <div 
//         key={post.id} 
//         className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
//       >
//         <div className="p-6">
//           <img 
//             src={post.image} 
//             alt={post.title}
//             className="w-full h-48 object-cover"
//           />
//           <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
//           <p className="text-gray-500 text-sm mb-2 font-semibold">Posted on: {new Date(post.id).toLocaleDateString()}</p>
//           <div className="border-b border-gray-300 mb-4"></div>
//           <div className="flex justify-between items-center">
//             <button 
//               className="text-blue-500 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
//               onClick={() => setSelectedPost(post)}
//             >
//               Read More →
//             </button>
//             <button 
//               className="flex items-center text-blue-500 font-semibold hover:text-blue-600 
//                           hover:scale-105 transition-all duration-300"
//               onClick={() => handleLike(post.id)}
//             >
//               <ThumbsUp size={20} className="mr-2 " /> {post.likes} Likes
//             </button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
//   );
// };




const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likes, setLikes] = useState({});
  const [currentBlog, setCurrentBlog] = useState(null);
  const [blogContent, setBlogContent] = useState('');

  useEffect(() => {
    const savedLikes = localStorage.getItem('blogLikes');
    if (savedLikes) {
      setLikes(JSON.parse(savedLikes));
    }
  }, []);

  const blogs = [
    {
    id: 1,
    title: "Understanding SQL Joins",
    category: "Data Analysis",
    date: "2025-02-06",
    image: "https://media.licdn.com/dms/image/v2/D5622AQETuTSUAvnKVA/feedshare-shrink_2048_1536/B56ZSHvakgHQAo-/0/1737444143590?e=1741824000&v=beta&t=xe_cMUG_eHAtZY3EIj0A2sEfRO2Wpd5uXz1y0_xey88",
    excerpt: "SQL Joins are a fundamental concept in database...",
    filePath: "/blogPosts/SQL Joins.html"
    },
  ];

  const categories = ["All", "Data Analysis"];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.category.toLowerCase() === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (blogId, e) => {
    e?.preventDefault();
    const newLikes = {
      ...likes,
      [blogId]: (likes[blogId] || 0) + 1
    };
    setLikes(newLikes);
    localStorage.setItem('blogLikes', JSON.stringify(newLikes));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleBlogClick = async (blog, e) => {
    e.preventDefault();
    try {
      const response = await fetch(blog.filePath);
      const content = await response.text();
      setBlogContent(content);
      setCurrentBlog(blog);
    } catch (error) {
      console.error('Error loading blog content:', error);
    }
  };

  // Blog Detail View
  if (currentBlog) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-gray-50 p-6"
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <button 
            onClick={() => setCurrentBlog(null)}
            className="text-blue-500 hover:text-blue-600 transition-all duration-300 hover:-translate-x-1"
          >
            ← Back to Blogs
          </button>

          <h1 className="text-4xl font-bold mb-4">{currentBlog.title}</h1>
          <img
            src={currentBlog.image}
            alt={currentBlog.title}
            className="w-full h-64 object-cover rounded-lg mt-5 mb-6"
          />

          <div 
            dangerouslySetInnerHTML={{ __html: blogContent }}
            className="prose max-w-none mb-8"
          />

          <div className="flex justify-between items-center border-t pt-4">
            <button
              onClick={() => handleLike(currentBlog.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart 
                size={20} 
                className={likes[currentBlog.id] ? 'fill-red-500 text-red-500' : ''} 
              />
              <span>{likes[currentBlog.id] || 0}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Blog List View
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-6"
    >
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 bg-blue-600 rounded-full transition-all duration-300 ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-blue-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredBlogs.map(blog => (
          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow h-full overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(blog.date).toLocaleDateString()}
                </span>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 line-clamp-2">{blog.excerpt}</p>
                <div className="flex justify-between items-center">
                  <a key={blog.id}
                      href={blog.filePath}
                      onClick={(e) => handleBlogClick(blog, e)} 
                      className="text-blue-500 hover:text-blue-600 transition-all 
                                  duration-300 hover:translate-x-1">
                    Read More →
                  </a>
                  <button
                    onClick={(e) => handleLike(blog.id, e)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-500 
                    transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={likes[blog.id] ? 'fill-red-500 text-red-500' : ''} 
                    />
                    <span>{likes[blog.id] || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};



export default PortfolioWebsite;
