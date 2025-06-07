// Database seeder to help initialize the database with sample content
import { addDocument } from './firestoreUtils';
import { COLLECTIONS } from './firestoreUtils';
import { Service, PortfolioProject, TeamMember, BlogPost } from './contentTypes';

/**
 * Seeds the database with some initial services
 */
export async function seedServices() {
  const services: Partial<Service>[] = [
    {
      title: 'Web Development',
      description: 'Custom web application development using modern technologies',
      icon: 'code',
      details: 'We build custom web applications using React, Next.js, and other modern technologies.',
      tools: 'React, Next.js, Firebase, Node.js',
      features: ['Responsive Design', 'Fast Performance', 'SEO Optimization', 'Secure Authentication'],
      process: ['Requirements Gathering', 'Design', 'Development', 'Testing', 'Deployment', 'Maintenance'],
      order: 1,
      slug: 'web-development',
      category: 'Development',
      featured: true,
      date: '2024-01-01',
      published: true
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design solutions for digital products',
      icon: 'design',
      details: 'We create user-centered design solutions for digital products.',
      tools: 'Figma, Adobe XD, Sketch',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
      process: ['Research', 'Ideation', 'Wireframing', 'Prototyping', 'User Testing'],
      order: 2,
      slug: 'ui-ux-design',
      category: 'Design',
      featured: true,
      date: '2024-01-02',
      published: true
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile app development',
      icon: 'mobile',
      details: 'We develop native and cross-platform mobile applications for iOS and Android.',
      tools: 'React Native, Flutter, Swift, Kotlin',
      features: ['Cross-Platform Support', 'Offline Mode', 'Push Notifications', 'Analytics Integration'],
      process: ['Requirements Gathering', 'Design', 'Development', 'Testing', 'App Store Submission'],
      order: 3,
      slug: 'mobile-app-development',
      category: 'Development',
      featured: false,
      date: '2024-01-03',
      published: true
    }
  ];

  for (const service of services) {
    await addDocument<Service>(COLLECTIONS.SERVICES, service as Service);
  }

  return services.length;
}

/**
 * Seeds the database with some initial portfolio projects
 */
export async function seedPortfolio() {
  const portfolioProjects: Partial<PortfolioProject>[] = [
    {
      title: 'E-Commerce Website',
      description: 'A modern e-commerce website built with Next.js and Shopify',
      client: 'Acme Corporation',
      category: 'web',
      tags: ['Next.js', 'Shopify', 'Tailwind CSS'],
      imageUrl: 'https://via.placeholder.com/800x600?text=E-Commerce+Project',
      challenge: 'The client needed a fast, modern e-commerce website with a seamless shopping experience.',
      solution: 'We built a custom e-commerce website using Next.js and Shopify, with a focus on performance and user experience.',
      results: 'The website saw a 40% increase in conversion rate and a 25% decrease in bounce rate.',
      featured: true,
      order: 1,
      slug: 'e-commerce-website',
      date: '2023-10-15',
      published: true
    },
    {
      title: 'Mobile Banking App',
      description: 'A secure mobile banking application for iOS and Android',
      client: 'Global Bank',
      category: 'mobile',
      tags: ['React Native', 'Firebase', 'Biometric Authentication'],
      imageUrl: 'https://via.placeholder.com/800x600?text=Banking+App',
      challenge: 'The client needed a secure mobile banking application with a focus on user experience.',
      solution: 'We developed a cross-platform mobile app using React Native, with secure authentication and real-time data updates.',
      results: 'The app has a 4.8/5 rating on both the App Store and Google Play, with over 100,000 downloads.',
      featured: true,
      order: 2,
      slug: 'mobile-banking-app',
      date: '2023-11-20',
      published: true
    }
  ];

  for (const project of portfolioProjects) {
    await addDocument<PortfolioProject>(COLLECTIONS.PORTFOLIO, project as PortfolioProject);
  }

  return portfolioProjects.length;
}

/**
 * Seeds the database with some initial blog posts
 */
export async function seedBlog() {
  const blogPosts: Partial<BlogPost>[] = [
    {
      title: "The Future of Web Development in 2024",
      excerpt: "Discover the latest trends and technologies shaping the web development landscape in 2024.",
      content: "# The Future of Web Development in 2024\n\nWeb development is constantly evolving, and staying ahead of the curve is essential for developers and businesses alike. In this article, we'll explore the most significant trends and technologies that are shaping the web development landscape in 2024.\n\n## 1. AI-Driven Development\n\nArtificial Intelligence is revolutionizing how we build websites. From code generation to automated testing, AI tools are making developers more productive and efficient. Expect to see more AI assistants integrated into development workflows.\n\n## 2. WebAssembly Goes Mainstream\n\nWebAssembly (Wasm) continues to gain traction, allowing developers to run high-performance code in browsers. This technology enables complex applications like video editing and 3D games to run smoothly on the web.\n\n## 3. Edge Computing Expansion\n\nEdge computing is bringing processing closer to users, reducing latency and improving performance. Frameworks like Next.js and Remix are leveraging edge functions to deliver faster, more responsive web experiences.\n\n## 4. Progressive Web Apps Evolve\n\nPWAs continue to bridge the gap between web and native applications. With improved APIs and better platform support, PWAs are becoming increasingly sophisticated and capable.\n\n## 5. Sustainability in Web Development\n\nEnvironmental concerns are influencing web development practices. Green hosting, efficient code, and optimizing for reduced energy consumption are becoming important considerations in project planning.\n\nStay tuned as we explore each of these trends in more detail in upcoming articles!",
      date: "2024-05-15",
      author: "Jane Smith",
      authorRole: "Lead Developer",
      authorImage: "/team/jane-smith.jpg",
      category: "Technology",
      tags: ["Web Development", "React", "AI", "Performance"],
      readTime: "5 min",
      image: "/blog/web-dev-2024.jpg",
      featured: true,
      slug: "future-of-web-development-2024",
      published: true
    },
    {
      title: "Optimizing React Applications for Performance",
      excerpt: "Learn how to enhance your React application's performance with these proven strategies.",
      content: "# Optimizing React Applications for Performance\n\nPerformance optimization is a critical aspect of building React applications that provide a smooth user experience. In this article, we'll explore several practical strategies to improve your React app's performance.\n\n## 1. Use React.memo for Component Memoization\n\n```jsx\nconst MyComponent = React.memo(function MyComponent(props) {\n  // Your component logic\n});\n```\n\nThis prevents unnecessary re-renders when the props haven't changed, which can significantly improve performance in components that render frequently.\n\n## 2. Implement Code Splitting\n\nReduce your initial bundle size by splitting your code and loading components only when needed:\n\n```jsx\nconst LazyComponent = React.lazy(() => import('./LazyComponent'));\n\nfunction MyApp() {\n  return (\n    <React.Suspense fallback={<Spinner />}>\n      <LazyComponent />\n    </React.Suspense>\n  );\n}\n```\n\n## 3. Virtualize Long Lists\n\nFor large lists, use virtualization libraries like `react-window` to render only the items currently visible in the viewport:\n\n```jsx\nimport { FixedSizeList } from 'react-window';\n\nfunction MyList({ items }) {\n  const renderRow = ({ index, style }) => (\n    <div style={style}>{items[index]}</div>\n  );\n\n  return (\n    <FixedSizeList\n      height={500}\n      width={300}\n      itemCount={items.length}\n      itemSize={35}\n    >\n      {renderRow}\n    </FixedSizeList>\n  );\n}\n```\n\n## 4. Use the useCallback and useMemo Hooks\n\nPrevent unnecessary function recreations and expensive calculations:\n\n```jsx\nconst memoizedCallback = useCallback(\n  () => {\n    doSomething(a, b);\n  },\n  [a, b],\n);\n\nconst memoizedValue = useMemo(\n  () => computeExpensiveValue(a, b),\n  [a, b]\n);\n```\n\n## 5. Implement Proper Key Usage in Lists\n\nAlways use stable, unique keys for list items to help React identify which items have changed:\n\n```jsx\n{items.map(item => (\n  <ListItem key={item.id} {...item} />\n))}\n```\n\nBy applying these strategies, you'll be well on your way to creating faster, more efficient React applications. Remember to measure performance before and after optimization to ensure your changes are having the desired effect.",
      date: "2024-05-08",
      author: "Michael Johnson",
      authorRole: "Frontend Specialist",
      authorImage: "/team/michael-johnson.jpg",
      category: "Development",
      tags: ["React", "Performance", "JavaScript", "Optimization"],
      readTime: "7 min",
      image: "/blog/react-performance.jpg",
      featured: true,
      slug: "optimizing-react-applications-performance",
      published: true
    }
  ];

  for (const post of blogPosts) {
    await addDocument<BlogPost>(COLLECTIONS.BLOG, post as BlogPost);
  }

  return blogPosts.length;
}

/**
 * Seeds the database with some initial team members
 */
export async function seedTeam() {
  const teamMembers: Partial<TeamMember>[] = [
    {
      name: 'John Doe',
      role: 'CEO',
      bio: 'John has over 10 years of experience in the tech industry and is passionate about building great products.',
      imageUrl: 'https://via.placeholder.com/300x300?text=John+Doe',
      order: 1,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe'
      },
      published: true
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'Jane is a technology leader with a background in software engineering and architecture.',
      imageUrl: 'https://via.placeholder.com/300x300?text=Jane+Smith',
      order: 2,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/janesmith',
        github: 'https://github.com/janesmith'
      },
      published: true
    }
  ];

  for (const member of teamMembers) {
    await addDocument<TeamMember>(COLLECTIONS.TEAM, member as TeamMember);
  }

  return teamMembers.length;
}

/**
 * Seeds the database with initial data
 */
export async function seedDatabase() {
  const results = {
    services: 0,
    portfolio: 0,
    team: 0,
    blog: 0
  };

  try {
    console.log('Starting database seeding...');
    
    // Seed services
    results.services = await seedServices();
    console.log(`Seeded ${results.services} services`);
    
    // Seed portfolio
    results.portfolio = await seedPortfolio();
    console.log(`Seeded ${results.portfolio} portfolio items`);
    
    // Seed team
    results.team = await seedTeam();
    console.log(`Seeded ${results.team} team members`);
    
    // Seed blog
    results.blog = await seedBlog();
    console.log(`Seeded ${results.blog} blog posts`);
    
    console.log('Database seeding completed successfully!');
    return results;
  } catch (error) {
    console.error('Error seeding database:', error);
    return results;
  }
} 