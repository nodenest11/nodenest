"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageLoadWrapper from "../../components/PageLoadWrapper";

// Sample career data
const careerOpenings = [
  {
    id: "senior-frontend-developer",
    title: "Senior Frontend Developer",
    location: "Remote (US/Europe)",
    type: "Full-time",
    department: "Engineering",
    experience: "5+ years",
    postedDate: "May 25, 2025",
    salary: "$120K - $150K",
    description: "We're looking for a Senior Frontend Developer who is passionate about creating exceptional user experiences with modern web technologies. You'll be working on cutting-edge projects for clients across various industries.",
    responsibilities: [
      "Architect and implement frontend solutions using React, Next.js, and other modern web technologies",
      "Collaborate with designers to transform UI/UX wireframes into responsive, cross-browser compatible code",
      "Optimize applications for maximum speed and scalability",
      "Lead frontend development efforts and mentor junior developers",
      "Implement automated testing and ensure code quality and best practices",
      "Work closely with backend developers to integrate frontend with APIs and services"
    ],
    requirements: [
      "5+ years of professional experience in frontend development",
      "Expert knowledge of React, TypeScript, and Next.js",
      "Strong understanding of responsive design principles and accessibility standards",
      "Experience with state management solutions (Redux, Context API, etc.)",
      "Familiarity with testing frameworks (Jest, React Testing Library)",
      "Understanding of CI/CD pipelines and deployment strategies",
      "Excellent problem-solving and communication skills"
    ],
    niceToHave: [
      "Experience with 3D libraries (Three.js, React Three Fiber)",
      "Knowledge of motion libraries (Framer Motion, GSAP)",
      "Experience with headless CMS platforms",
      "Contribution to open-source projects",
      "Knowledge of design tools (Figma, Adobe XD)"
    ]
  },
  {
    id: "ux-ui-designer",
    title: "UX/UI Designer",
    location: "Hybrid (New York)",
    type: "Full-time",
    department: "Design",
    experience: "3+ years",
    postedDate: "May 28, 2025",
    salary: "$90K - $120K",
    description: "We're seeking a creative and detail-oriented UX/UI Designer to join our growing design team. You'll create beautiful, intuitive designs for web and mobile applications while working closely with our development and product teams.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback",
      "Design wireframes, mockups, and prototypes for digital products",
      "Develop UI components and interactive elements with a focus on aesthetics and usability",
      "Work closely with developers to ensure accurate implementation of designs",
      "Conduct usability testing and iterate on designs based on user feedback",
      "Create and maintain design systems to ensure consistency across products"
    ],
    requirements: [
      "3+ years of experience in UX/UI design for digital products",
      "Strong portfolio demonstrating your design process and problem-solving abilities",
      "Proficiency in design tools like Figma, Adobe XD, or Sketch",
      "Understanding of user-centered design principles and methodologies",
      "Experience creating wireframes, prototypes, and user flows",
      "Knowledge of accessibility standards and responsive design principles",
      "Excellent communication and collaboration skills"
    ],
    niceToHave: [
      "Experience with animation and micro-interactions design",
      "Basic understanding of HTML, CSS, and JavaScript",
      "Knowledge of design systems and component libraries",
      "Experience with user research and usability testing",
      "Understanding of data visualization principles"
    ]
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer (Flutter)",
    location: "Remote (Worldwide)",
    type: "Full-time",
    department: "Engineering",
    experience: "2+ years",
    postedDate: "June 1, 2025",
    salary: "$80K - $120K",
    description: "Join our mobile development team to build beautiful, high-performance cross-platform applications using Flutter. You'll work on innovative mobile projects for clients across various industries and contribute to our internal mobile frameworks.",
    responsibilities: [
      "Develop high-quality mobile applications for iOS and Android using Flutter",
      "Work with product managers and designers to define features and roadmaps",
      "Write clean, maintainable code and participate in code reviews",
      "Create unit and integration tests to ensure application quality",
      "Troubleshoot and fix bugs to optimize application performance",
      "Stay up-to-date with new Flutter features and best practices"
    ],
    requirements: [
      "2+ years of professional experience with Flutter development",
      "Strong knowledge of Dart programming language",
      "Experience with state management solutions in Flutter (Provider, Riverpod, Bloc, etc.)",
      "Understanding of RESTful APIs and asynchronous programming",
      "Experience with version control systems (Git)",
      "Familiarity with native iOS and Android development is a plus",
      "Problem-solving mindset and attention to detail"
    ],
    niceToHave: [
      "Experience with Firebase or other backend services",
      "Knowledge of CI/CD for mobile applications",
      "Understanding of app store submission processes",
      "Experience with animations and custom UI components in Flutter",
      "Contributions to open-source Flutter packages"
    ]
  },
  {
    id: "project-manager",
    title: "Technical Project Manager",
    location: "Hybrid (London)",
    type: "Full-time",
    department: "Operations",
    experience: "4+ years",
    postedDate: "May 20, 2025",
    salary: "$100K - $130K",
    description: "We're looking for an experienced Technical Project Manager to oversee the successful delivery of web and mobile projects. You'll work closely with clients, developers, and designers to ensure projects are completed on time, within scope, and to the highest quality standards.",
    responsibilities: [
      "Lead project planning, execution, monitoring, and closure",
      "Develop detailed project plans, timelines, and resource allocations",
      "Coordinate internal resources and third parties for flawless execution of projects",
      "Ensure that all projects are delivered on time, within scope and budget",
      "Assist in defining project scope and objectives, involving all relevant stakeholders",
      "Create and maintain comprehensive project documentation",
      "Proactively identify and resolve issues and risks"
    ],
    requirements: [
      "4+ years of experience managing digital or software development projects",
      "Strong knowledge of project management methodologies (Agile, Scrum, Kanban)",
      "Experience with project management tools (Jira, Asana, Trello, etc.)",
      "Understanding of software development processes and lifecycles",
      "Excellent communication, leadership, and client management skills",
      "Strong problem-solving abilities and attention to detail",
      "PMP or Agile certification is a plus"
    ],
    niceToHave: [
      "Technical background in web or mobile development",
      "Experience in a digital agency or consulting environment",
      "Knowledge of budgeting and resource allocation",
      "Experience with client-facing roles and stakeholder management",
      "Understanding of UX/UI design principles"
    ]
  }
];

// Define type for job category
type JobCategory = "All" | "Engineering" | "Design" | "Operations" | "Marketing";

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<JobCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter jobs based on category and search
  const filteredJobs = careerOpenings.filter(job => {
    const matchesCategory = activeCategory === "All" || job.department === activeCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <PageLoadWrapper>
      <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center pt-32 gap-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] animate-gradient-x mb-4">
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl text-[var(--foreground)]/80 max-w-3xl mx-auto">
              We're looking for passionate individuals to help us build exceptional digital experiences.
            </p>
          </motion.div>
          
          {/* Culture Section */}
          <motion.section 
            className="w-full mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--foreground)]">
                  Our Culture & Values
                </h2>
                <div className="space-y-4 text-[var(--foreground)]/80">
                  <p>
                    At Atom Flow, we believe that great products are built by great teams. We're committed to fostering an inclusive, collaborative environment where creativity and innovation can thrive.
                  </p>
                  <p>
                    Our team is made up of passionate individuals who are dedicated to pushing the boundaries of what's possible in digital experiences. We value continuous learning, technical excellence, and a user-centered approach to everything we build.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="glass-effect border border-[var(--border-color)] rounded-xl p-5 hover:border-[var(--primary-gradient-from)]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Innovation</h3>
                    <p className="text-[var(--foreground)]/70 text-sm">
                      We embrace new technologies and approaches, constantly pushing the boundaries of what's possible.
                    </p>
                  </div>
                  
                  <div className="glass-effect border border-[var(--border-color)] rounded-xl p-5 hover:border-[var(--primary-gradient-from)]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Collaboration</h3>
                    <p className="text-[var(--foreground)]/70 text-sm">
                      We believe the best results come from diverse teams working together toward shared goals.
                    </p>
                  </div>
                  
                  <div className="glass-effect border border-[var(--border-color)] rounded-xl p-5 hover:border-[var(--primary-gradient-from)]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Quality</h3>
                    <p className="text-[var(--foreground)]/70 text-sm">
                      We take pride in our craft, paying attention to every detail to deliver exceptional results.
                    </p>
                  </div>
                  
                  <div className="glass-effect border border-[var(--border-color)] rounded-xl p-5 hover:border-[var(--primary-gradient-from)]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Growth</h3>
                    <p className="text-[var(--foreground)]/70 text-sm">
                      We invest in continuous learning and professional development for our team members.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                    alt="Atom Flow team working together" 
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent"></div>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glass-effect border border-[var(--border-color)] rounded-xl p-5 backdrop-blur-lg">
                    <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
                      Benefits & Perks
                    </h3>
                    <ul className="grid grid-cols-2 gap-3 text-sm text-[var(--foreground)]/80">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-gradient-from)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Flexible working hours
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-gradient-from)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Remote work options
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-gradient-from)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Health insurance
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-gradient-from)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Professional development
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-gradient-from)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Team retreats
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-gradient-from)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Modern equipment
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Job Listings Section */}
          <motion.section 
            className="w-full mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--foreground)]">
              Open Positions
            </h2>
            
            {/* Filter and Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex flex-wrap gap-2">
                {["All", "Engineering", "Design", "Operations", "Marketing"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category as JobCategory)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)]'
                        : 'glass-effect border border-[var(--border-color)] text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:border-[var(--primary-gradient-from)]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 pr-10 rounded-full glass-effect border border-[var(--border-color)] bg-transparent text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:outline-none focus:border-[var(--primary-gradient-from)] transition-all duration-200"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--foreground)]/50" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Job List */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <motion.div 
                    key={job.id}
                    className={`glass-effect border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedJob === job.id ? 'border-[var(--primary-gradient-from)]' : 'hover:border-[var(--primary-gradient-from)]/50'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                  >
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-[var(--foreground)]">{job.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 text-xs font-medium rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)]/70">
                              {job.department}
                            </span>
                            <span className="px-3 py-1 text-xs font-medium rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)]/70">
                              {job.location}
                            </span>
                            <span className="px-3 py-1 text-xs font-medium rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)]/70">
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-[var(--foreground)]/70 text-sm">
                              Posted: {job.postedDate}
                            </div>
                            <div className="text-[var(--foreground)] font-medium">
                              {job.salary}
                            </div>
                          </div>
                          <div className={`transform transition-transform duration-300 ${selectedJob === job.id ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--foreground)]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Job Details */}
                    {selectedJob === job.id && (
                      <motion.div 
                        className="px-6 pb-6 border-t border-[var(--border-color)] pt-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-[var(--foreground)]/80 mb-6">
                          {job.description}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary-gradient-from)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[var(--foreground)]/70">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary-gradient-from)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[var(--foreground)]/70">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Nice to Have</h4>
                          <ul className="space-y-2">
                            {job.niceToHave.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary-gradient-to)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="text-[var(--foreground)]/70">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <motion.a 
                            href={`/careers/apply/${job.id}`}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-semibold text-center shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)]"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Apply for this position
                          </motion.a>
                          <motion.button 
                            className="px-6 py-3 rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)] font-semibold text-center hover:border-[var(--primary-gradient-from)]/50 transition-all duration-200"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigator.clipboard.writeText(window.location.href + `/apply/${job.id}`)}
                          >
                            Share position
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="text-center py-12 glass-effect border border-[var(--border-color)] rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 mx-auto rounded-full glass-effect border border-[var(--border-color)] flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--foreground)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-[var(--foreground)]/70 mb-2">No matching positions found</p>
                  <p className="text-[var(--foreground)]/50 text-sm">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </div>
          </motion.section>
          
          {/* Don't see a position section */}
          <motion.section 
            className="w-full mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-effect border border-[var(--border-color)] rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
                Don't See a Position That Fits?
              </h2>
              <p className="text-[var(--foreground)]/80 max-w-2xl mx-auto mb-8">
                We're always looking for talented individuals to join our team. If you don't see a position that matches your skills, send us your resume and tell us why you'd be a great addition to Atom Flow.
              </p>
              <Link 
                href="/contact" 
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-bold text-lg shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)]"
              >
                Get in Touch
              </Link>
            </div>
          </motion.section>
        </main>
        <Footer />
      </div>
    </PageLoadWrapper>
  );
}
