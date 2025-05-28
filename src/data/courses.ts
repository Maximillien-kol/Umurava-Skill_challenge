import { Course } from '@/types';

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    shortDescription: 'Learn the core concepts of JavaScript programming language',
    fullDescription: 'This comprehensive course covers JavaScript from the ground up, including variables, functions, objects, arrays, and modern ES6+ features. Perfect for beginners who want to start their programming journey or developers looking to solidify their JavaScript foundation.',
    duration: '4 weeks',
    instructor: 'Sarah Johnson',
    prerequisites: ['Basic HTML knowledge', 'Understanding of web browsers'],
    category: 'Programming',
    level: 'Beginner',
    tags: ['javascript', 'programming', 'web development', 'frontend']
  },
  {
    id: '2',
    title: 'React Development Mastery',
    shortDescription: 'Master React.js and build modern web applications',
    fullDescription: 'Dive deep into React.js ecosystem including hooks, context, state management, and modern development patterns. Learn to build scalable, maintainable React applications with best practices and industry standards.',
    duration: '6 weeks',
    instructor: 'Michael Chen',
    prerequisites: ['JavaScript fundamentals', 'HTML & CSS', 'ES6+ syntax'],
    category: 'Frontend Development',
    level: 'Intermediate',
    tags: ['react', 'frontend', 'components', 'hooks', 'jsx']
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    shortDescription: 'Build scalable server-side applications with Node.js',
    fullDescription: 'Learn to create robust backend applications using Node.js, Express.js, and MongoDB. Cover authentication, API design, database integration, security best practices, and deployment strategies.',
    duration: '8 weeks',
    instructor: 'David Rodriguez',
    prerequisites: ['JavaScript fundamentals', 'Basic understanding of databases'],
    category: 'Backend Development',
    level: 'Intermediate',
    tags: ['nodejs', 'backend', 'api', 'express', 'mongodb']
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    shortDescription: 'Create intuitive and beautiful user interfaces',
    fullDescription: 'Master the principles of user interface and user experience design. Learn design thinking, wireframing, prototyping, color theory, typography, and how to create user-centered designs that solve real problems.',
    duration: '5 weeks',
    instructor: 'Emma Thompson',
    prerequisites: ['Basic computer skills', 'Creative mindset'],
    category: 'Design',
    level: 'Beginner',
    tags: ['design', 'ui', 'ux', 'figma', 'prototyping']
  },
  {
    id: '5',
    title: 'Cloud Computing with AWS',
    shortDescription: 'Deploy and manage applications on Amazon Web Services',
    fullDescription: 'Comprehensive course on Amazon Web Services covering EC2, S3, RDS, Lambda, and other core services. Learn cloud architecture, security, monitoring, and cost optimization strategies for modern applications.',
    duration: '10 weeks',
    instructor: 'James Wilson',
    prerequisites: ['Basic networking knowledge', 'Command line familiarity'],
    category: 'Cloud Computing',
    level: 'Advanced',
    tags: ['aws', 'cloud', 'devops', 'infrastructure', 'deployment']
  },
  {
    id: '6',
    title: 'Data Science with Python',
    shortDescription: 'Analyze data and build machine learning models',
    fullDescription: 'Complete data science workflow using Python, pandas, numpy, and scikit-learn. Learn data cleaning, visualization, statistical analysis, and machine learning fundamentals to extract insights from data.',
    duration: '12 weeks',
    instructor: 'Dr. Lisa Park',
    prerequisites: ['Basic programming knowledge', 'High school mathematics'],
    category: 'Data Science',
    level: 'Intermediate',
    tags: ['python', 'data science', 'machine learning', 'pandas', 'visualization']
  },
  {
    id: '7',
    title: 'Cybersecurity Fundamentals',
    shortDescription: 'Protect systems and data from cyber threats',
    fullDescription: 'Essential cybersecurity concepts including network security, encryption, threat analysis, incident response, and security frameworks. Learn to identify vulnerabilities and implement security measures.',
    duration: '7 weeks',
    instructor: 'Robert Kim',
    prerequisites: ['Basic networking concepts', 'Understanding of operating systems'],
    category: 'Security',
    level: 'Intermediate',
    tags: ['security', 'cybersecurity', 'networking', 'encryption', 'threats']
  },
  {
    id: '8',
    title: 'Mobile App Development with Flutter',
    shortDescription: 'Build cross-platform mobile applications',
    fullDescription: 'Create beautiful, native mobile apps for iOS and Android using Flutter and Dart. Cover UI components, state management, navigation, API integration, and app store deployment.',
    duration: '9 weeks',
    instructor: 'Anna Martinez',
    prerequisites: ['Basic programming knowledge', 'Object-oriented concepts'],
    category: 'Mobile Development',
    level: 'Intermediate',
    tags: ['flutter', 'mobile', 'dart', 'ios', 'android', 'cross-platform']
  }
];