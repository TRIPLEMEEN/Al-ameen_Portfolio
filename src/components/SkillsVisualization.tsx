import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SkillsVisualization = () => {
  // Skills ordered by proficiency (descending)
  const skills: Skill[] = [
    // 90% - Expert
    { name: 'Python', level: 90, category: 'Core' },
    { name: 'Machine Learning', level: 90, category: 'AI/ML' },
    { name: 'Data Analysis', level: 90, category: 'Data Science' },
    { name: 'Excel', level: 90, category: 'Data Science' },
    { name: 'Pandas', level: 90, category: 'Data Science' },
    
    // 85-88% - Advanced
    { name: 'SQL', level: 88, category: 'Data' },
    { name: 'TensorFlow', level: 85, category: 'AI/ML' },
    { name: 'PyTorch', level: 85, category: 'AI/ML' },
    { name: 'Scikit-learn', level: 85, category: 'AI/ML' },
    { name: 'Git', level: 85, category: 'Tools' },
    { name: 'PostgreSQL', level: 85, category: 'Data' },
    { name: 'PowerBI', level: 85, category: 'Data' },
    
    // 80% - Upper Intermediate
    { name: 'NLP', level: 80, category: 'AI/ML' },
    { name: 'Tableau', level: 80, category: 'Data' },
    
    // 70-75% - Intermediate
    { name: 'JavaScript/TypeScript', level: 75, category: 'Core' },
    { name: 'React', level: 70, category: 'Web' },
    
    // 60-65% - Basic to Intermediate
    { name: 'Node.js', level: 65, category: 'Web' },
    { name: 'AWS', level: 60, category: 'Cloud' },
    { name: 'Docker', level: 60, category: 'DevOps' }
  ];

  // Group skills by category
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  // Prepare data for radar chart
  const radarData = categories.map(category => {
    const categorySkills = skills.filter(skill => skill.category === category);
    const avgLevel = Math.round(
      categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length
    );
    
    return {
      category,
      level: avgLevel,
      fullMark: 100,
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
        Skills by Category
      </h3>
      
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{
                fill: 'var(--text-color, #4B5563)',
                fontSize: 14,
                fontWeight: 500,
              }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]}
              tick={false}
            />
            <Radar
              name="Skills"
              dataKey="level"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {skills.map((skill, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate pr-1">
                {skill.name}
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsVisualization;
