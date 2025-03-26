import { Module } from './types';

export const modules: Module[] = [
  {
    id: 'web-basics',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    completed: false,
    videoUrl: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
    instructor: 'Sarah Johnson',
    duration: '2h 15m',
    projects: [
      {
        id: 'personal-portfolio',
        title: 'Personal Portfolio',
        description: 'Create your own portfolio website showcasing your skills',
        points: 100,
        completed: false,
        difficulty: 'beginner',
        requirements: [
          'Responsive design',
          'At least 3 project showcases',
          'Contact form'
        ],
        submissionType: 'code'
      },
      {
        id: 'responsive-landing',
        title: 'Responsive Landing Page',
        description: 'Build a responsive landing page for a business',
        points: 150,
        completed: false,
        difficulty: 'intermediate',
        requirements: [
          'Mobile-first design',
          'Performance optimization',
          'SEO best practices'
        ],
        submissionType: 'code'
      },
      {
        id: 'interactive-game',
        title: 'Interactive Web Game',
        description: 'Develop a simple browser-based game',
        points: 200,
        completed: false,
        difficulty: 'advanced',
        requirements: [
          'Game logic implementation',
          'Score tracking',
          'Sound effects'
        ],
        submissionType: 'code'
      }
    ]
  },
  {
    id: 'react-fundamentals',
    title: 'React.js Fundamentals',
    description: 'Master the basics of React.js development',
    completed: false,
    videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    instructor: 'Michael Chen',
    duration: '3h 30m',
    projects: [
      {
        id: 'todo-app',
        title: 'Todo Application',
        description: 'Build a full-featured todo application with React',
        points: 150,
        completed: false,
        difficulty: 'beginner',
        requirements: [
          'CRUD operations',
          'Local storage',
          'Filter and search'
        ],
        submissionType: 'code'
      },
      {
        id: 'weather-dashboard',
        title: 'Weather Dashboard',
        description: 'Create a weather dashboard using a weather API',
        points: 200,
        completed: false,
        difficulty: 'intermediate',
        requirements: [
          'API integration',
          'Location search',
          'Weather forecasts'
        ],
        submissionType: 'code'
      },
      {
        id: 'social-media-clone',
        title: 'Social Media Clone',
        description: 'Develop a simplified social media platform',
        points: 300,
        completed: false,
        difficulty: 'advanced',
        requirements: [
          'User authentication',
          'Post creation and interaction',
          'Real-time updates'
        ],
        submissionType: 'code'
      }
    ]
  }
] as const;