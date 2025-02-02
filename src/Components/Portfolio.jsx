import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  Briefcase, 
  FileText, 
  Code, 
  Send,
  Phone, 
  Mail, 
  Linkedin, 
  MapPin } from 'lucide-react';
 
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
    { key: 'contact', icon: Send, label: 'Contact' }
  ];


  const renderSection = () => {
    const sectionComponents = {
      home: <HomeSection />,
      about: <AboutSection />,
      education: <EducationSection />,
      experience: <ExperienceSection />,
      projects: <ProjectsSection />,
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



const HomeSection = () => (
  <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 p-6">
    {/* Profile Photo */}
    <motion.div 
      className="w-58 h-74 rounded-lg overflow-hidden shadow-lg border-4 border-blue-500"
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src="IMG_03227.jpeg"
        alt="Professional Profile" 
        className="w-full h-full object-cover"
      />
</motion.div>


    {/* Personal Details */}
    <div className="text-left max-w-lg">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Haseeb K</h1>
      <h2 className="text-2xl text-blue-600 mb-4">Data Analyst</h2>

      {/* Contact Information */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Phone className="mr-3 text-gray-600" />
          <span>+91 97455 81670</span>
        </div>
        <div className="flex items-center">
          <Mail className="mr-3 text-gray-600" />
          <span>create.haseeb@gmail.com</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-3 text-gray-600" />
          <span>Edavanna, Kerala, India</span>
        </div>
      </div>

      {/* Social Links */}
      {/* Linked IN */}
      <div className="flex space-x-4 mb-6">
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
          href="https://github.com/haseeb-ops" 
          className="hover:text-blue-500"
          whileHover={{ scale: 1.2 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </motion.a>
        {/* CV */}
        <motion.a 
          href="Haseeb New CV.pdf" 
          className="hover:text-blue-500"
          whileHover={{ scale: 1.2 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2H18a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm12 0V6H6V4h12zM8 6h8M8 10h8M8 14h4"></path>
          </svg>
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
        <div className="flex flex-wrap gap-2">
          {['Python', 'SQL', 'Data Analysis', 'Data Visualization'].map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
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

const EducationSection = () => (
    <div>
      <h2 className="text-3xl font-bold mb-6">Education</h2>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Senior Secondary</h3>
          <p className="text-gray-600">HMS Higher Secondary</p>
          <p className="text-gray-500">July 2022 - March 2024</p>  
          <p className="text-gray-600">Steam: Science</p>
          <p className="text-gray-600">Grade: 87%</p>
        </div>
        {/* Darul Irfan */}
        <div className="bg-white p-6 rounded-lg shadow-md">
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

const ExperienceSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Professional Experience</h2>
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Financial Accountant</h3>
        <p className="text-gray-600">Pompano Arabian Seafood Restaurant</p>
        <p className="text-gray-500">Jun 2024 - Nov 2024 · 6 mos</p>
        <ul className="list-disc list-inside mt-2">
          <li>Collaborated with a colleague to create a Google Sheet for automating daily and monthly stock, expense, and profit calculations</li>
          <li>Streamlined stock tracking processes, reducing errors and improving efficiency by 40%</li>
          <li>Prepared detailed daily and monthly financial reports to support decision-making</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Technical Manager</h3>
        <p className="text-gray-600">Riplex Influencer Marketing Agency</p>
        <p className="text-gray-500">Jun 2023 - Nov 2023 · 6 mos</p>
        <ul className="list-disc list-inside mt-2">
          <li>Automated campaign performance reporting using tools like Google Sheets and Excel, reducing manual work by 30%</li>
          <li>Analyzed audience engagement metrics to identify trends and improve campaign effectiveness</li>
          <li>Designed Instagram posts to align with campaign goals and enhance brand visibility</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Courses & Data Science Projects</h2>

      {/* Courses Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Relevant Courses</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3].map((course) => (
            <div
              key={course}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h4 className="text-xl font-semibold">Course {course} Title</h4>
              <p className="text-gray-600">Certificate: Certificate Name</p>
              <p className="text-gray-600">Issued By: Issuing Organization</p>
              <p className="text-gray-600">Issue Date: 01/01/2024</p>
              <p className="text-gray-600">Credential ID: ABC12345</p>
              <p className="text-gray-600">Credential URL: <a href="#" className="text-blue-600 hover:underline">View</a></p>
              <p className="text-gray-600">Skills Gained: Data Analysis, Machine Learning</p>

              {/* Add a Button to Upload PDF */}
              <div className="mt-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => openModal('/path/to/certificate.pdf')}
                >
                  View Certificate PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for PDF */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              title="Certificate"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}

      {/* Projects Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Data Science Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3].map((project) => (
            <div key={project} className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Project {project} Title</h4>
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
    </div>
  );
};

export default PortfolioWebsite;
