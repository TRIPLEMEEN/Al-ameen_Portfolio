import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api, { Education as EducationType } from '../services/api';
import { FaGraduationCap } from 'react-icons/fa';

const Education = () => {
  const [education, setEducation] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await api.getEducation();
        setEducation(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch education:', err);
        setError('Failed to load education. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
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
        My <span className="text-indigo-600 dark:text-indigo-400">Education</span>
      </h1>
      
      <div className="max-w-3xl mx-auto space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                    <FaGraduationCap className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="inline-block mt-1 md:mt-0 px-3 py-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-lg text-indigo-600 dark:text-indigo-400 mt-1">
                    {edu.institution}
                  </p>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
