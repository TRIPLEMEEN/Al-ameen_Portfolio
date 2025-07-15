import { Project, Experience, Education, Skill, Testimonial, ProfileData } from '../types';
import { readFileSync } from 'fs';
import { join } from 'path';

const API_BASE_URL = 'http://localhost:5002/api';

export interface Blog {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  link: string;
  tags: string[];
}

const api = {
  // Profile
  getProfile: async (): Promise<ProfileData> => {
    const data = JSON.parse(readFileSync(join(__dirname, '../data/profile.json'), 'utf-8'));
    return data;
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const data = JSON.parse(readFileSync(join(__dirname, '../data/projects.json'), 'utf-8'));
    return data;
  },

  // Experience
  getExperience: async (): Promise<Experience[]> => {
    const data = JSON.parse(readFileSync(join(__dirname, '../data/experience.json'), 'utf-8'));
    return data;
  },

  // Education
  getEducation: async (): Promise<Education[]> => {
    const data = JSON.parse(readFileSync(join(__dirname, '../data/education.json'), 'utf-8'));
    return data;
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    const data = JSON.parse(readFileSync(join(__dirname, '../data/skills.json'), 'utf-8'));
    return data;
  },

  // Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    const data = JSON.parse(readFileSync(join(__dirname, '../data/testimonials.json'), 'utf-8'));
    return data;
  },

  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    const data = JSON.parse(readFileSync(join(__dirname, '../data/blogs.json'), 'utf-8'));
    return data;
  },

  // Contact Form
  sendMessage: async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> => {
    // TODO: Implement email sending logic
    return { success: true, message: 'Message sent successfully!' };
  }
};

export default api;
