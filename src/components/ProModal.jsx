import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default ProjectModal;