import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface BlogPostCardProps {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  link: string;
  tags: string[];
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  title,
  content,
  date,
  image,
  link,
  tags,
}) => {
  const formattedDate = format(new Date(date), 'MMM dd, yyyy');

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
        <div 
          style={{ 
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%'
          }}
          className="absolute inset-0"
          onLoad={(e: React.SyntheticEvent) => {
            const container = (e.target as HTMLElement).parentElement;
            if (container) {
              container.querySelector('.bg-gray-200')?.remove();
            }
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-gray-300 line-clamp-2">{content}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-gray-300 line-clamp-2">{content}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400 mb-2">{formattedDate}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          View on LinkedIn
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </motion.article>
  );
};

export default BlogPostCard;
