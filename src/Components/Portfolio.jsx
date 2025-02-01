import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FileText, Code, Send } from 'lucide-react';
 
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
    { key: 'experience', icon: Briefcase, label: 'Experience' },
    { key: 'education', icon: FileText, label: 'Education' },
    { key: 'projects', icon: Code, label: 'Projects' },
    { key: 'contact', icon: Send, label: 'Contact' }
  ];

  const renderSection = () => {
    const sectionComponents = {
      home: <HomeSection />,
      about: <AboutSection />,
      experience: <ExperienceSection />,
      education: <EducationSection />,
      projects: <ProjectsSection />,
      contact: <ContactSection />
    };
    return sectionComponents[activeSection];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <nav className="w-20 bg-white shadow-lg flex flex-col items-center py-8">
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
      <main className="flex-1 p-8 overflow-y-auto">
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

const HomeSection = () => (
  <div className="flex justify-center items-center h-full">
    <motion.div 
      className="relative group"
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src="http://fakeimg.pl/500x600?text=My Profile&font=bebas" 
        alt="Profile" 
        className="w-full max-w-md rounded-lg shadow-lg"
      />
      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
        <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
          Welcome to My Portfolio   
        </span>
      </div>
    </motion.div>
  </div>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Sending...');

    try {
      // Simulated form submission 
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('Message sent successfully!');
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('Error sending message');
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded-lg" 
            required 
          />
        </div>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded-lg" 
            required 
          />
        </div>
        <div className="mb-4">
          <textarea 
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full p-2 border rounded-lg" 
            rows="4"
            required
          ></textarea>
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Send Message
        </button>
        {submitStatus && (
          <p className="mt-4 text-center text-sm text-gray-600">
            {submitStatus}
          </p>
        )}
      </form>
    </div>
  );
};

const AboutSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">About Me</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Professional Profile</h3>
        <p>
          Detail your journey from graphic design to data science. Highlight transferable 
          skills like visual communication, attention to detail, and creative problem-solving.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['Python', 'R', 'SQL', 'Tableau', 'Machine Learning', 'Data Visualization'].map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ExperienceSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Professional Experience</h2>
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Graphic Designer</h3>
        <p className="text-gray-600">Company Name | Date Range</p>
        <ul className="list-disc list-inside mt-2">
          <li>Brief description of graphic design role</li>
          <li>Key achievements and responsibilities</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Data Analytics Internship/Role</h3>
        <p className="text-gray-600">Company Name | Date Range</p>
        <ul className="list-disc list-inside mt-2">
          <li>Data analysis projects</li>
          <li>Technologies and tools used</li>
        </ul>
      </div>
    </div>
  </div>
);

const EducationSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Education</h2>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Data Analytics Certification/Degree</h3>
      <p className="text-gray-600">Institution Name | Graduation Date</p>
      <p className="mt-2">Relevant coursework, key learnings, projects</p>
    </div>
  </div>
);

const ProjectsSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Data Science Projects</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2, 3].map((project) => (
        <div key={project} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Project {project} Title</h3>
          <p>Brief project description, technologies used</p>
          <div className="mt-4">
            <a 
              href="#" 
              className="text-blue-600 hover:underline mr-4"
            >
              View Project
            </a>
            <a 
              href="#" 
              className="text-blue-600 hover:underline"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
); 

export default PortfolioWebsite;
