"use client";

import React, { useState, use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import PageLoadWrapper from "../../../../components/PageLoadWrapper";

// Sample career data
const careerOpenings = [
  {
    id: "senior-frontend-developer",
    title: "Senior Frontend Developer",
    location: "Remote (US/Europe)",
    department: "Engineering",
  },
  {
    id: "ux-ui-designer",
    title: "UX/UI Designer",
    location: "Hybrid (New York)",
    department: "Design",
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer (Flutter)",
    location: "Remote (Worldwide)",
    department: "Engineering",
  },
  {
    id: "project-manager",
    title: "Technical Project Manager",
    location: "Hybrid (London)",
    department: "Operations",
  }
];

export default function CareerApply({ params }: { params: Promise<{ jobId: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { jobId } = unwrappedParams;
  
  // Find the job
  const job = careerOpenings.find(job => job.id === jobId);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedIn: "",
    website: "",
    coverLetter: "",
    resumeFile: null as File | null,
    agreeToTerms: false
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, resumeFile: e.target.files?.[0] || null }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.resumeFile || !formData.agreeToTerms) {
      alert("Please fill out all required fields.");
      return;
    }
    
    // Submit logic
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedIn: "",
        website: "",
        coverLetter: "",
        resumeFile: null,
        agreeToTerms: false
      });
      
      // Scroll to top
      window.scrollTo(0, 0);
    }, 1500);
  };
  
  if (!job) {
    return (
      <PageLoadWrapper>
        <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col items-center justify-center pt-32 px-4 max-w-7xl mx-auto min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Position not found</h1>
            <p className="mt-4 text-[var(--foreground)]/70">The job position you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/careers" 
              className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-semibold shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)]"
            >
              View All Positions
            </Link>
          </main>
          <Footer />
        </div>
      </PageLoadWrapper>
    );
  }
  
  return (
    <PageLoadWrapper>
      <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center pt-32 gap-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          {/* Success Message */}
          {isSubmitted ? (
            <motion.div 
              className="w-full glass-effect border border-[var(--primary-gradient-from)]/50 rounded-2xl p-8 md:p-12 text-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--foreground)]">
                Application Submitted!
              </h2>
              <p className="text-[var(--foreground)]/80 mb-8 max-w-2xl mx-auto">
                Thank you for applying to the {job.title} position at Atom Flow. We've received your application and will review it shortly. You'll receive a confirmation email with more details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/careers" 
                  className="px-6 py-3 rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)] font-semibold text-center hover:border-[var(--primary-gradient-from)]/50 transition-all duration-200"
                >
                  View More Positions
                </Link>
                <Link 
                  href="/" 
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-semibold text-center shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)]"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Page Header */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link 
                  href="/careers" 
                  className="inline-flex items-center text-[var(--foreground)]/70 hover:text-[var(--primary-gradient-from)] mb-6 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to all positions
                </Link>
                
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] animate-gradient-x mb-4">
                  Apply for {job.title}
                </h1>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <span className="px-3 py-1 text-sm font-medium rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)]/80">
                    {job.department}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)]/80">
                    {job.location}
                  </span>
                </div>
                <p className="text-lg text-[var(--foreground)]/80 max-w-3xl mx-auto">
                  Complete the form below to apply. We'll review your application and get back to you soon.
                </p>
              </motion.div>
              
              {/* Application Form */}
              <motion.form 
                onSubmit={handleSubmit}
                className="w-full glass-effect border border-[var(--border-color)] rounded-2xl p-8 md:p-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Personal Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-6 text-[var(--foreground)]">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm text-[var(--foreground)]/70 mb-2">
                        First Name <span className="text-[var(--primary-gradient-from)]">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full py-3 px-4 rounded-lg glass-effect border border-[var(--border-color)] bg-transparent text-[var(--foreground)] focus:outline-none focus:border-[var(--primary-gradient-from)] transition-all duration-200"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm text-[var(--foreground)]/70 mb-2">
                        Last Name <span className="text-[var(--primary-gradient-from)]">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full py-3 px-4 rounded-lg glass-effect border border-[var(--border-color)] bg-transparent text-[var(--foreground)] focus:outline-none focus:border-[var(--primary-gradient-from)] transition-all duration-200"
                        placeholder="Your last name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-[var(--foreground)]/70 mb-2">
                        Email <span className="text-[var(--primary-gradient-from)]">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full py-3 px-4 rounded-lg glass-effect border border-[var(--border-color)] bg-transparent text-[var(--foreground)] focus:outline-none focus:border-[var(--primary-gradient-from)] transition-all duration-200"
                        placeholder="Your email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-[var(--foreground)]/70 mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full py-3 px-4 rounded-lg glass-effect border border-[var(--border-color)] bg-transparent text-[var(--foreground)] focus:outline-none focus:border-[var(--primary-gradient-from)] transition-all duration-200"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Professional Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-6 text-[var(--foreground)]">
                    Professional Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="linkedIn" className="block text-sm text-[var(--foreground)]/70 mb-2">
                        LinkedIn Profile
                      </label>
                      <input 
                        type="url" 
                        id="linkedIn" 
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleChange}
                        className="w-full py-3 px-4 rounded-lg glass-effect border border-[var(--border-color)] bg-transparent text-[var(--foreground)] focus:outline-none focus:border-[var(--primary-gradient-from)] transition-all duration-200"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm text-[var(--foreground)]/70 mb-2">
                        Portfolio/Website
                      </label>
                      <input 
                        type="url" 
                        id="website" 
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full py-3 px-4 rounded-lg glass-effect border border-[var(--border-color)] bg-transparent text-[var(--foreground)] focus:outline-none focus:border-[var(--primary-gradient-from)] transition-all duration-200"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="coverLetter" className="block text-sm text-[var(--foreground)]/70 mb-2">
                      Cover Letter
                    </label>
                    <textarea 
                      id="coverLetter" 
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={6} 
                      className="w-full py-3 px-4 rounded-lg glass-effect border border-[var(--border-color)] bg-transparent text-[var(--foreground)] focus:outline-none focus:border-[var(--primary-gradient-from)] transition-all duration-200"
                      placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-[var(--foreground)]/70 mb-2">
                      Resume/CV <span className="text-[var(--primary-gradient-from)]">*</span>
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg glass-effect border-2 border-dashed border-[var(--border-color)] hover:border-[var(--primary-gradient-from)]/50 cursor-pointer transition-all duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--foreground)]/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          {formData.resumeFile ? (
                            <p className="text-sm text-[var(--foreground)]">
                              <span className="font-medium">{formData.resumeFile.name}</span>
                            </p>
                          ) : (
                            <>
                              <p className="text-sm text-[var(--foreground)]">
                                <span className="font-medium">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-[var(--foreground)]/50 mt-1">
                                PDF, DOC, or DOCX (Max 5MB)
                              </p>
                            </>
                          )}
                        </div>
                        <input 
                          type="file" 
                          id="resumeFile"
                          name="resumeFile"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Terms and Submit */}
                <div>
                  <div className="mb-8">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreeToTerms"
                          name="agreeToTerms"
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={handleCheckboxChange}
                          required
                          className="w-4 h-4 bg-transparent border border-[var(--border-color)] rounded focus:ring-[var(--primary-gradient-from)] focus:ring-2"
                        />
                      </div>
                      <label htmlFor="agreeToTerms" className="ml-3 text-sm text-[var(--foreground)]/70">
                        I agree to the <a href="#" className="text-[var(--primary-gradient-from)] hover:underline">privacy policy</a> and consent to having my personal data processed for recruitment purposes. <span className="text-[var(--primary-gradient-from)]">*</span>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-bold text-lg shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)] flex justify-center ${
                      isSubmitting ? 'opacity-90 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </motion.form>
            </>
          )}
        </main>
        <Footer />
      </div>
    </PageLoadWrapper>
  );
}
