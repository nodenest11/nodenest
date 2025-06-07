'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '@/lib/firebase/contentTypes';
import { TeamMemberService } from '@/lib/firebase/contentServices';
import Link from 'next/link';

export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await TeamMemberService.getPublished();
        setTeamMembers(members);
      } catch (err: any) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <section id="team" className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center py-24">
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
          Our Team
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">Meet Our Team</span>
        </h2>
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-gradient-from)]"></div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <section id="team" className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center py-16">
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
          Our Team
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">Meet Our Team</span>
        </h2>
        <p className="text-[var(--foreground)]/70 text-center mb-10">
          {error || 'Team information coming soon. Please check back later.'}
        </p>
        {/* Admin link if no team members */}
        <Link href="/admin/team" className="px-4 py-2 bg-[var(--primary-gradient-from)] text-white rounded-md hover:opacity-90 transition-all">
          Add Team Members in Admin Panel
        </Link>
      </section>
    );
  }

  return (
    <section id="team" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
          Our Team
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-gradient">Meet Our Experts</span>
        </h2>
        <p className="text-base md:text-lg opacity-70 max-w-2xl mx-auto">
          Our talented team of professionals is dedicated to bringing your digital vision to life
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-sm"
          >
            {member.imageUrl ? (
              <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-full h-64 object-cover object-center"
              />
            ) : (
              <div className="w-full h-64 bg-[var(--background)] flex items-center justify-center">
                <svg className="w-24 h-24 text-[var(--border-color)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-[var(--accent-color)] mb-3">{member.role}</p>
              {member.bio && <p className="text-sm opacity-70 mb-4">{member.bio}</p>}
              
              {/* Social Links */}
              {member.social && Object.keys(member.social).length > 0 && (
                <div className="flex space-x-3">
                  {member.social.twitter && (
                    <a href={`https://twitter.com/${member.social.twitter}`} target="_blank" rel="noopener noreferrer" 
                      className="text-[var(--foreground)]/70 hover:text-[var(--accent-color)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={`https://linkedin.com/in/${member.social.linkedin}`} target="_blank" rel="noopener noreferrer" 
                      className="text-[var(--foreground)]/70 hover:text-[var(--accent-color)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {member.social.github && (
                    <a href={`https://github.com/${member.social.github}`} target="_blank" rel="noopener noreferrer" 
                      className="text-[var(--foreground)]/70 hover:text-[var(--accent-color)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {member.social.dribbble && (
                    <a href={`https://dribbble.com/${member.social.dribbble}`} target="_blank" rel="noopener noreferrer" 
                      className="text-[var(--foreground)]/70 hover:text-[var(--accent-color)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-16">
        <Link 
          href="/contact" 
          className="px-6 py-3 bg-[var(--accent-color)] hover:opacity-90 text-white rounded-md transition-all inline-flex items-center gap-2"
        >
          Join Our Team
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
} 