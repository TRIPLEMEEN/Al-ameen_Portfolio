import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogPostCard from '../components/blog/BlogPostCard';
import api from '../services/api';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  link: string;
  tags: string[];
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await api.getBlogs();
        if (data && Array.isArray(data)) {
          setPosts(data);
        } else {
          throw new Error('Invalid blog posts data format');
        }
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
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

  const uniqueCategories = Array.from(new Set(posts.flatMap(post => post.tags)));
  const filteredPosts = category === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(category));

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold text-center mb-12">
        My <span className="text-indigo-600 dark:text-indigo-400">Blog Posts</span>
      </h1>

      {uniqueCategories.length > 0 && (
        <div className="mb-8">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <BlogPostCard
                id={post.id}
                title={post.title}
                content={post.excerpt}
                date={post.date}
                image={post.image}
                link={post.link}
                tags={post.tags}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No posts found in this category
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;