
// Proposed implementation
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://al-ameen-portfolio.onrender.com';

// Helper function to handle fetch requests with better error handling
export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
}


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

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  link: string;
  tags: string[];
  read_time: string;
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  summary?: string;
  profile_image: string;
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
      const data = await fetchData<ProfileData>(`${API_BASE_URL}/profile`);
      return {
        name: data.name || '',
        title: data.title || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        about: data.about || '',
        summary: data.summary || '',
        profile_image: data.profile_image || '/images/al-ameen-profile.jpg',
        social: {
          linkedin: data.social?.linkedin || '',
          github: data.social?.github || '',
          twitter: data.social?.twitter || ''
        },
        resume: data.resume || '',
        interests: Array.isArray(data.interests) ? data.interests : []
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
        summary: 'Data-driven professional with a Master\'s degree in Computer Science (Distinction) from Teesside University.',
        profile_image: '/images/al-ameen-profile.jpg',
        social: {
          linkedin: 'https://linkedin.com/in/al-ameen-abdulkareem-1524ba123',
          github: 'https://github.com/triplemeen',
          twitter: ''
        },
        resume: '/resume.pdf',
        interests: ['Cooking', 'Basketball', 'Video making and editing']
      };
    }
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    return fetchData<Project[]>(`${API_BASE_URL}/projects`);
  },

  // Experience
  getExperience: async (): Promise<Experience[]> => {
    return fetchData<Experience[]>(`${API_BASE_URL}/experience`);
  },

  // Education
  getEducation: async (): Promise<Education[]> => {
    return fetchData<Education[]>(`${API_BASE_URL}/education`);
  },

  // Skills
  getSkills: async (): Promise<SkillsData> => {
    const data = await fetchData<SkillsData>(`${API_BASE_URL}/skills`);
    return {
      technical: Array.isArray(data?.technical) ? data.technical : [],
      soft: Array.isArray(data?.soft) ? data.soft : [],
      tools: Array.isArray(data?.tools) ? data.tools : []
    };
  },

  // Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    return fetchData<Testimonial[]>(`${API_BASE_URL}/testimonials`);
  },

  // Blogs
  getBlogs: async (): Promise<BlogPost[]> => {
    return fetchData<BlogPost[]>(`${API_BASE_URL}/blogs`);
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
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to send message');
      }

      // Map the backend's success response to the expected format
      return {
        success: responseData.status === 'success',
        message: responseData.message || 'Message sent successfully!'
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message. Please try again later.');
    }
  },
};

export default api;
