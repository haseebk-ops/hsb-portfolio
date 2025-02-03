import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import {
  X, Home, Github, User, Search, ArrowLeft, Briefcase, FileText, Code, FileUser, 
  Send, Notebook, Phone, Mail, Loader, Linkedin, MapPin, Instagram } from 'lucide-react';
 
const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(loadingTimer);
  }, []);

  const sections = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'about', icon: User, label: 'About' },
    { key: 'education', icon: FileText, label: 'Education' },
    { key: 'experience', icon: Briefcase, label: 'Experience' },
    { key: 'projects', icon: Code, label: 'Projects' },
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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <nav className="fixed top-0 left-0 w-20 bg-white shadow-lg flex flex-col items-center justify-center py-8 h-full z-10">
        {sections.map(({ key, icon: Icon, label }) => (
          <motion.button
            key={key}
            onClick={() => setActiveSection(key)}
            onMouseEnter={() => setHoveredSection(label)}
            onMouseLeave={() => setHoveredSection(null)}
            className={`relative p-3 mb-4 rounded-lg group ${
              activeSection === key 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon />
            {hoveredSection === label && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded"
              >
                {label}
              </motion.span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Home Section

const HomeSection = () => (
  <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 p-6">
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:shadow-lg transition-all duration-300">
              {skill}
            </span>
          ))}
        </div>
        {/* Software Skills */}
          <br />
        <h3 className="text-xl font-semibold mb-4">Software Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['Adobe Photoshop', 'Adobe Illustrator', 'Excel', 'Access', 'Microsoft Office', 'Power BI', 'Adobe InDesign'].map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
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
      <div className="space-y-6">
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


// Project Section -- Main
const ProjectsSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const openModal = (url) => {
    setPdfUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPdfUrl('');
  };

  const certificates = [
    {
      title: "Data Analysis with Spreadsheets and SQL",
      issuedBy: "Meta",
      issueDate: "February 2025",
      credentialId: "ZF5LOYO73PRJ",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/ZF5LOYO73PRJ",
      skills: "Data Analysis, Machine Learning",
      pdfUrl: "/pdf/DA2.pdf"
    },
    {
      title: "Introduction to Data Analytics",
      issuedBy: "Meta",
      issueDate: "January 2025",
      credentialId: "46A0BUNP8V8W",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/46A0BUNP8V8W",
      skills: "Data Analysis",
      pdfUrl: "/pdf/DA1.pdf"
    },
    {
      title: "Introduction to Data Analysis using Microsoft Excel",
      issuedBy: "Coursera Project Network",
      issueDate: "August 2024",
      credentialId: "SRYB8Q35SLZ2",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/SRYB8Q35SLZ2",
      skills: "Microsoft Excel",
      pdfUrl: "/pdf/EX1.pdf"
    },
    {
      title: "Web Development With HTML",
      issuedBy: "Edapt",
      issueDate: "June 2022",
      credentialId: "EDPT1655911527629M",
      skills: "HTML, Cascading Style Sheets (CSS)",
      pdfUrl: "/pdf/HTML.pdf"
    }
  ];

  // const projects = [
  //   {
  //     title: "Project 1",
  //     description: "Brief project description, technologies used",
  //     projectUrl: "#",
  //     githubUrl: "#"
  //   },
  //   {
  //     title: "Project 2",
  //     description: "Brief project description, technologies used",
  //     projectUrl: "#",
  //     githubUrl: "#"
  //   },
  //   {
  //     title: "Project 3",
  //     description: "Brief project description, technologies used",
  //     projectUrl: "#",
  //     githubUrl: "#"
  //   }
  // ];


  return (
    <div>
      {/* <h2 className="text-3xl font-bold mb-6">Courses & Projects</h2> */}
      <h2 className="text-3xl font-bold mb-6">Courses</h2>

      {/* Courses Section */}
      <div className="mb-8">  
        {/* <h3 className="text-2xl font-semibold mb-4">Relevant Courses</h3> */}

        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold">{cert.title}</h4>
              <p className="text-gray-600">Issued By: {cert.issuedBy}</p>
              <p className="text-gray-600">Issue Date: {cert.issueDate}</p>
              <p className="text-gray-600">Credential ID: {cert.credentialId}</p>
              {cert.credentialUrl && (
                <p className="text-gray-600">
                  Credential URL: <a href={cert.credentialUrl} className="text-blue-600 hover:underline">View</a>
                </p>
              )}
              <p className="text-gray-600">Skills Gained: {cert.skills}</p>
              <div className="mt-4">
                <button 
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-md border-3 border-blue-600 transition-all 
                    hover:bg-transparent hover:text-blue-600"
                  onClick={() => openModal(cert.pdfUrl)}
                >
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Modal */}
      <PDFModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pdfUrl={pdfUrl}
      />

      {/* Projects Section */}
      {/* <div>
        <h3 className="text-2xl font-semibold mb-4">Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">{project.title}</h4>
              <p>{project.description}</p>
              <div className="mt-4">
                <a
                  href={project.projectUrl}
                  className="text-blue-600 hover:underline mr-4"
                >
                  View Project
                </a>
                <a
                  href={project.githubUrl}
                  className="text-blue-600 hover:underline"
                >
                  GitHub Repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

// Blog

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Simulated loading for demo purposes
  const simulateLoading = (callback) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, 500);
  };

  const handleReadMore = (post) => {
    setIsTransitioning(true);
    simulateLoading(() => {
      setSelectedPost(post);
      setIsTransitioning(false);
    });
  };

  const handleBackToList = () => {
    setIsTransitioning(true);
    simulateLoading(() => {
      setSelectedPost(null);
      setIsTransitioning(false);
    });
  };

  const handleCategoryChange = (category) => {
    setIsLoading(true);
    simulateLoading(() => {
      setSelectedCategory(category);
    });
  };

  // Sample blog data - replace with your actual data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and how to build your first component",
      content: "React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamental concepts of React and walk through building your first component. We'll cover topics like JSX, props, state, and component lifecycle methods.",
      category: "Development",
      date: "2025-01-15",
      isFeatured: true,
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Mastering CSS Grid",
      excerpt: "A comprehensive guide to CSS Grid layout system",
      content: "CSS Grid is a revolutionary layout system that has transformed how we design web layouts. This in-depth guide covers everything from basic grid concepts to advanced layout techniques. Learn how to create responsive, complex layouts with minimal code.",
      category: "Design",
      date: "2025-01-10",
      isFeatured: true,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "JavaScript Best Practices",
      excerpt: "Write cleaner and more efficient JavaScript code",
      content: "Discover the best practices for writing maintainable and efficient JavaScript code. We'll discuss code organization, performance optimization, error handling, and modern JavaScript features that will help you become a better developer.",
      category: "Development",
      date: "2025-01-05",
      isFeatured: false,
      image: "/api/placeholder/400/250"
    }
  ];
  const categories = ["All", "Development", "Design", "Career", "Tips"];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.isFeatured);
  const regularPosts = filteredPosts.filter(post => !post.isFeatured);

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="animate-spin">
        <Loader size={40} className="text-blue-500" />
      </div>
    </div>
  );

  if (selectedPost) {
    return (
      <div className={`max-w-4xl mx-auto px-4 py-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {isLoading && <LoadingOverlay />}
        
        <button 
          onClick={handleBackToList}
          className="flex items-center text-blue-500 hover:text-blue-600 mb-8 transition-transform duration-300 hover:-translate-x-1"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Posts
        </button>
        
        <article className="animate-fadeIn">
          <img 
            src={selectedPost.image} 
            alt={selectedPost.title}
            className="w-full h-64 object-cover rounded-lg mb-8 transition-transform duration-500 hover:scale-[1.02]"
          />
          <div className="space-y-4">
            <span className="text-sm text-blue-500 inline-block transition-colors duration-300">{selectedPost.category}</span>
            <h1 className="text-4xl font-bold">{selectedPost.title}</h1>
            <p className="text-gray-500">
              {new Date(selectedPost.date).toLocaleDateString()}
            </p>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {selectedPost.content}
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {isLoading && <LoadingOverlay />}
      
      <h1 className="text-4xl font-bold mb-8 animate-fadeIn">Blog</h1>
      
      <div className="mb-8 space-y-4">
        <div className="relative transition-transform duration-300 hover:scale-[1.01]">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full p-3 pl-10 border rounded-lg transition-shadow duration-300 hover:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {featuredPosts.length > 0 && (
        <div className="mb-12 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map(post => (
              <div 
                key={post.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="p-6">
                  <span className="text-sm text-blue-500">{post.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <button 
                      className="text-blue-500 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
                      onClick={() => handleReadMore(post)}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {regularPosts.map(post => (
          <div 
            key={post.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="p-6">
              <span className="text-sm text-blue-500">{post.category}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <button 
                  className="text-blue-500 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
                  onClick={() => handleReadMore(post)}
                >
                  Read More →
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
