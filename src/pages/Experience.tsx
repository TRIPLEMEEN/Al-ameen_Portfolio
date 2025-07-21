import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api, { Experience as ExperienceType } from '../services/api';
import { FaBriefcase,  } from 'react-icons/fa';

const Experience = () => {
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await api.getExperience();
        setExperience(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch experience:', err);
        setError('Failed to load experience. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold text-center mb-12">
        Work <span className="text-indigo-600 dark:text-indigo-400">Experience</span>
      </h1>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 w-1 h-full bg-indigo-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
        
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="md:flex items-center">
              {/* Left side (for even items) */}
              {index % 2 === 0 && (
                <div className="hidden md:block w-1/2 pr-8 text-right">
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">{exp.period}</p>
                </div>
              )}
              
              {/* Timeline dot */}
              <div className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${index === 0 ? 'top-0' : 'top-1/2'}`}>
                <FaBriefcase className="w-4 h-4" />
              </div>
              
              {/* Card */}
              <div className={`w-full md:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                <div className="md:hidden mb-2">
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">{exp.period}</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                <p className="text-lg text-indigo-600 dark:text-indigo-400 mb-2">{exp.company}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {exp.responsibilities.map((responsibility, i) => (
                    <li key={i}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              
              {/* Right side (for odd items) */}
              {index % 2 !== 0 && (
                <div className="hidden md:block w-1/2 pl-8">
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">{exp.period}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
