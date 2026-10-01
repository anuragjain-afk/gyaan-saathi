export interface CareerPathway {
  id: string;
  title: string;
  targetRole: string;
  matchScore: number;
  description: string;
  avgStartingSalary: string;
  steps: Array<{
    phase: string;
    skills: string[];
    description: string;
  }>;
  recommendedCourses: string[];
}

export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: 'frontend-dev',
    title: 'Frontend Web Developer',
    targetRole: 'Junior Frontend Engineer',
    matchScore: 92,
    description: 'Build modern user interfaces, web applications, and interactive digital experiences for web browsers.',
    avgStartingSalary: '₹3.5L - ₹6.0L / year',
    steps: [
      {
        phase: '1. Fundamentals',
        skills: ['HTML5', 'CSS3', 'Basic JavaScript'],
        description: 'Understand web structure, styling, responsiveness, and web page layout.'
      },
      {
        phase: '2. Modern Web & Frameworks',
        skills: ['React.js', 'Tailwind CSS', 'Git & GitHub'],
        description: 'Build single page web applications using component state and styling tools.'
      },
      {
        phase: '3. Real Projects & Internship',
        skills: ['PWA', 'REST APIs', 'Portfolio Project'],
        description: 'Create offline-first web apps, consume REST APIs, and apply for remote or local tech internships.'
      }
    ],
    recommendedCourses: ['Python Fundamentals', 'Web Development Basics']
  },
  {
    id: 'backend-dev',
    title: 'Backend Software Engineer',
    targetRole: 'Junior Backend / Node.js Developer',
    matchScore: 85,
    description: 'Design database schemas, develop RESTful APIs, manage server logic, and handle data synchronization.',
    avgStartingSalary: '₹4.0L - ₹7.0L / year',
    steps: [
      {
        phase: '1. Core Language & Logic',
        skills: ['Python', 'Node.js', 'Algorithms'],
        description: 'Master server-side programming syntax, data structures, and async programming.'
      },
      {
        phase: '2. Databases & APIs',
        skills: ['PostgreSQL', 'SQL', 'Express.js', 'Authentication'],
        description: 'Design relational tables, write queries, and secure web endpoints.'
      },
      {
        phase: '3. Deployment & Cloud',
        skills: ['Docker', 'Vercel / Render', 'RAG / Vector DBs'],
        description: 'Deploy backend microservices and integrate AI / LLM APIs.'
      }
    ],
    recommendedCourses: ['Python Fundamentals', 'Database Management Systems']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst / BI Specialist',
    targetRole: 'Junior Data Analyst',
    matchScore: 88,
    description: 'Transform raw data into meaningful business insights, create visual dashboards, and query databases.',
    avgStartingSalary: '₹3.8L - ₹6.5L / year',
    steps: [
      {
        phase: '1. Data Processing & SQL',
        skills: ['Python', 'SQL Queries', 'Advanced Excel'],
        description: 'Clean data, filter datasets, and perform aggregation queries.'
      },
      {
        phase: '2. Data Visualization',
        skills: ['Pandas', 'Matplotlib', 'Power BI / Tableau'],
        description: 'Generate charts, inspect trends, and publish executive reports.'
      },
      {
        phase: '3. Analytics Projects',
        skills: ['Statistical Analysis', 'Business Insight Presentations'],
        description: 'Solve real-world datasets from agriculture, education, or government records.'
      }
    ],
    recommendedCourses: ['Python Fundamentals', 'Database Management Systems']
  }
];
