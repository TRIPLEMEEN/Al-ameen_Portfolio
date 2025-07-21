import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaFileDownload, FaArrowRight } from 'react-icons/fa';
import api, { ProfileData, Testimonial } from '../services/api';
// Profile image will be loaded from the backend
import SkillsVisualization from '../components/SkillsVisualization';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, testimonialsData] = await Promise.all([
          api.getProfile(),
          api.getTestimonials()
        ]);
        
        setProfile(profileData);
        setTestimonials(testimonialsData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Profile not found'}</p>
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
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Hi, I'm <span className="text-primary-600 dark:text-primary-400">{profile.name}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              {profile.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {profile.about}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2 font-medium"
              >
                Contact Me
              </button>
              <a
                href={`${import.meta.env.VITE_API_URL}/download-resume`}
                download="AL-AMEEN_ABDULKAREEM_RESUME.pdf"              
                className="px-6 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors inline-flex items-center gap-2 font-medium"
              >
                <FaFileDownload /> Download CV
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              {profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              )}
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary-500 dark:border-primary-400 shadow-2xl">
              <img
                src={profile.profile_image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <button 
              onClick={() => scrollToSection('skills')}
              className="p-4 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <h3 className="font-semibold">Skills</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">My expertise</p>
            </button>
            <button 
              onClick={() => navigate('/projects')}
              className="p-4 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <h3 className="font-semibold">Projects</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">My work</p>
            </button>
            <Link 
              to="/experience"
              className="p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <h3 className="font-semibold">Experience</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">My journey</p>
            </Link>
            <Link 
              to="/blog"
              className="p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <h3 className="font-semibold">Blog</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">My thoughts</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-primary-600 dark:text-primary-400">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A visual representation of my technical skills and expertise across different domains
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SkillsVisualization />
        </motion.div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
              What People Say
            </h2>
            <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
              Testimonials from colleagues and clients
            </p>
            
            <Testimonials testimonials={testimonials} />
            
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/contact')} 
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Get in Touch <FaArrowRight className="ml-2" />
              </button>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Home;
