const API_BASE_URL = 'http://localhost:5002/api';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level?: number;
}

export interface SkillsData {
  technical: Skill[];
  soft: string[];
  tools: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  link: string;
  tags: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  resume: string;
  interests: string[];
}

const api = {
  // Profile
  getProfile: async (): Promise<ProfileData> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        name: data.name || '',
        title: data.title || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        about: data.about || '',
        summary: data.summary || '',
        social: {
          linkedin: data.social?.linkedin || '',
          github: data.social?.github || ''
        },
        resume: data.resume || '',
        interests: data.interests || []
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Return default values if the API call fails
      return {
        name: 'Al-Ameen Abdulkareem',
        title: 'Analyst | Machine Learning Engineer | Educator | AI Specialist',
        email: 'abdulkareemalameen18@gmail.com',
        phone: '+44 (0) 7405681617',
        location: 'E16 2PJ London, United Kingdom',
        about: 'Results-driven software developer with expertise in data science, cloud technologies, and Python-based solutions.',
        summary: 'Data-driven professional with a Master’s degree in Computer Science (Distinction) from Teesside University.',
        social: {
          linkedin: 'https://linkedin.com/in/al-ameen-abdulkareem-1524ba123',
          github: 'https://github.com/triplemeen'
        },
        resume: '/resume.pdf',
        interests: ['Cooking', 'Basketball', 'Video making and editing']
      };
    }
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  },

  // Experience
  getExperience: async (): Promise<Experience[]> => {
    const response = await fetch(`${API_BASE_URL}/experience`);
    if (!response.ok) {
      throw new Error('Failed to fetch experience');
    }
    return response.json();
  },

  // Education
  getEducation: async (): Promise<Education[]> => {
    const response = await fetch(`${API_BASE_URL}/education`);
    if (!response.ok) {
      throw new Error('Failed to fetch education');
    }
    return response.json();
  },

  // Skills
  getSkills: async (): Promise<SkillsData> => {
    const response = await fetch(`${API_BASE_URL}/skills`);
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    return response.json();
  },

  // Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    return response.json();
  },

  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return response.json();
  },

  // Contact Form
  sendMessage: async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Add any additional fields required by your backend
          to: 'abdulkareemalameen18@gmail.com', // Your email address
          from: formData.email,
          text: `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message. Please try again later.');
    }
  },
};

export default api;
