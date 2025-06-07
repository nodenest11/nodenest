"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageLoadWrapper from '../../components/PageLoadWrapper';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    message: string;
    subject: string;
    company: string;
    phone: string;
    budget: string;
  }>({
    name: '',
    email: '',
    message: '',
    subject: 'General Inquiry',
    company: '',
    phone: '',
    budget: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  interface ContactFormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (e: ContactFormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          message: '',
          subject: 'General Inquiry',
          company: '',
          phone: '',
          budget: '',
        });
        
        // Show success notification (you could use a nicer toast notification library)
        alert('Your message has been sent successfully. We will get back to you soon.');
      } else {
        // Show error notification
        alert('There was an error sending your message. Please try again later.');
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again later.');
    }
  };

  const offices = [
    {
      city: "San Francisco",
      address: "101 Market Street, Suite 500, San Francisco, CA 94105",
      email: "sf@atomflow.studio",
      phone: "+1 (415) 555-0123"
    },
    {
      city: "London",
      address: "12 Regent Street, London, UK W1B 5TF",
      email: "london@atomflow.studio",
      phone: "+44 20 1234 5678"
    },
    {
      city: "Singapore",
      address: "50 Raffles Place, #30-00, Singapore 048623",
      email: "sg@atomflow.studio",
      phone: "+65 6123 4567"
    }
  ];

  return (
    <PageLoadWrapper>
      <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center pt-28 px-4 bg-[var(--background)]">
          {/* Hero Section */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="text-xl text-[var(--foreground)] opacity-90 max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to transform your digital presence? Contact us today to discuss your project or schedule a free consultation with our team of experts.
            </motion.p>
          </section>

          {/* Contact Form and Info */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <motion.div
                className="lg:w-3/5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass-effect rounded-2xl shadow-xl border border-[var(--border-color)] p-10">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-8">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-[var(--foreground)] opacity-90 mb-2">Your Name*</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-[var(--navbar-bg)] border border-[var(--border-color)] rounded-lg px-5 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)] transition"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[var(--foreground)] opacity-90 mb-2">Your Email*</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-[var(--navbar-bg)] border border-[var(--border-color)] rounded-lg px-5 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)] transition"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-[var(--foreground)] opacity-90 mb-2">Company</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="w-full bg-[var(--navbar-bg)] border border-[var(--border-color)] rounded-lg px-5 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)] transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-[var(--foreground)] opacity-90 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (123) 456-7890"
                          className="w-full bg-[var(--navbar-bg)] border border-[var(--border-color)] rounded-lg px-5 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)] transition"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-[var(--foreground)] opacity-90 mb-2">Subject*</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-[var(--navbar-bg)] border border-[var(--border-color)] rounded-lg px-5 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)] transition"
                        required
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Branding & Identity">Branding & Identity</option>
                        <option value="Tech Consulting">Tech Consulting</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                        <option value="Job Application">Job Application</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block text-[var(--foreground)] opacity-90 mb-2">Budget Range</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-[var(--navbar-bg)] border border-[var(--border-color)] rounded-lg px-5 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)] transition"
                      >
                        <option value="">Select a budget range</option>
                        <option value="Under $5,000">Under $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                        <option value="$100,000+">$100,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-[var(--foreground)] opacity-90 mb-2">Your Message*</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className="w-full bg-[var(--navbar-bg)] border border-[var(--border-color)] rounded-lg px-5 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)] transition"
                        rows={5}
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="mt-2 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white font-bold shadow-[0_0_16px_2px_var(--primary-gradient-from)] hover:shadow-[0_0_32px_4px_var(--primary-gradient-to)] transition-all duration-200 border-2 border-transparent hover:border-[var(--primary-gradient-from)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)] animate-gradient-x"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="lg:w-2/5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-effect rounded-2xl shadow-xl border border-[var(--border-color)] p-10 h-full">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-8">
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-gradient-from)]/10 p-2 rounded-full mt-1">
                        <svg className="w-5 h-5 text-[var(--primary-gradient-from)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">Email</h3>
                        <p className="text-[var(--foreground)] opacity-80">info@atomflow.studio</p>
                        <p className="text-[var(--foreground)] opacity-80">support@atomflow.studio</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-gradient-from)]/10 p-2 rounded-full mt-1">
                        <svg className="w-5 h-5 text-[var(--primary-gradient-from)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">Phone</h3>
                        <p className="text-[var(--foreground)] opacity-80">+1 (415) 555-0123</p>
                        <p className="text-[var(--foreground)] opacity-80">+1 (800) ATOMFLOW</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-gradient-from)]/10 p-2 rounded-full mt-1">
                        <svg className="w-5 h-5 text-[var(--primary-gradient-from)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">Working Hours</h3>
                        <p className="text-[var(--foreground)] opacity-80">Monday - Friday: 9AM - 6PM</p>
                        <p className="text-[var(--foreground)] opacity-80">Saturday - Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Our Offices</h3>
                  <div className="space-y-4">
                    {offices.map((office, index) => (
                      <motion.div
                        key={index}
                        className="border-l-2 border-[var(--primary-gradient-from)] pl-4 py-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                      >
                        <h4 className="text-lg font-bold text-[var(--foreground)]">{office.city}</h4>
                        <p className="text-[var(--foreground)] opacity-80 text-sm">{office.address}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                      {[
                        { name: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                        { name: "LinkedIn", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                        { name: "Instagram", icon: "M17.5 6.5h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 12.5a3 3 0 100-6 3 3 0 000 6z" },
                        { name: "GitHub", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" }
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href="#"
                          className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 flex items-center justify-center text-[var(--primary-gradient-from)] hover:bg-gradient-to-r hover:from-[var(--primary-gradient-from)] hover:to-[var(--primary-gradient-to)] hover:text-[var(--background)] transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                          </svg>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Map Section */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <motion.div
              className="glass-effect rounded-2xl shadow-xl border border-[var(--border-color)] p-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-6">
                Visit Our Headquarters
              </h2>
              <p className="text-lg text-[var(--foreground)] opacity-90 max-w-2xl mx-auto mb-8">
                Located in the heart of San Francisco's tech district, our headquarters showcases our commitment to innovation and design excellence.
              </p>
              <div className="w-full h-80 bg-[var(--card-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)]">
                <div className="text-[var(--foreground)] opacity-70">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Interactive map would be displayed here</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* FAQ Section */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <motion.h2
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "How quickly can you start on my project?",
                  answer: "We typically can begin new projects within 2-3 weeks of finalizing agreements. For urgent projects, we may be able to accommodate faster timelines—just let us know about your specific needs in your inquiry."
                },
                {
                  question: "Do you offer ongoing support after project completion?",
                  answer: "Yes, we offer various maintenance and support packages to keep your digital products running smoothly. We can customize a support plan based on your specific needs and budget."
                },
                {
                  question: "What information should I prepare for our initial consultation?",
                  answer: "It's helpful to have a general idea of your project goals, target audience, timeline, budget range, and any design preferences or examples of work you admire. The more information you can provide, the more productive our initial discussion will be."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-xl p-6 border border-[var(--border-color)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                >
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{item.question}</h3>
                  <p className="text-[var(--foreground)] opacity-80">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageLoadWrapper>
  );
}
