"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageLoadWrapper from "../../components/PageLoadWrapper";

export default function PrivacyPolicy() {
  return (
    <PageLoadWrapper>
      <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center pt-32 gap-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          {/* Page Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] animate-gradient-x mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-[var(--foreground)]/80 max-w-3xl mx-auto">
              Last updated: June 1, 2025
            </p>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="w-full glass-effect border border-[var(--border-color)] rounded-2xl p-8 md:p-12 text-[var(--foreground)]/80 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Introduction</h2>
              <p className="mb-4">
                Atom Flow ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Personal Information</h3>
                  <p>
                    We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on our website, or otherwise when you contact us. The personal information we collect may include:
                  </p>
                  <ul className="list-disc pl-8 mt-2 space-y-1">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Company information and job title</li>
                    <li>Information you provide in forms, surveys, or other interactive features</li>
                    <li>Information contained in your communications with us</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Automatically Collected Information</h3>
                  <p>
                    When you visit our website, we may automatically collect certain information about your device and usage patterns. This information may include:
                  </p>
                  <ul className="list-disc pl-8 mt-2 space-y-1">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent on the website</li>
                    <li>Referring website, search terms, and links clicked</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Cookies and Tracking Technologies</h3>
                  <p>
                    We use cookies and similar tracking technologies to collect information about your browsing activities and to analyze website traffic. These technologies help us improve our website and your experience by customizing content and remembering your preferences.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">How We Use Your Information</h2>
              <p className="mb-4">
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-8 space-y-1">
                <li>Provide, maintain, and improve our website and services</li>
                <li>Respond to your inquiries and fulfill your requests</li>
                <li>Send you updates, promotional materials, and other communications</li>
                <li>Analyze usage patterns and improve user experience</li>
                <li>Protect against unauthorized access and legal liability</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Disclosure of Your Information</h2>
              <p className="mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-8 space-y-1">
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With your consent or at your direction</li>
                <li>In connection with a business transaction such as a merger or acquisition</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Your Privacy Choices</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Opt-Out</h3>
                  <p>
                    You can opt-out of receiving marketing communications from us by following the unsubscribe instructions included in each email or by contacting us directly.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Cookies</h3>
                  <p>
                    Most web browsers are set to accept cookies by default. You can typically remove or reject cookies in your browser settings. Please note that removing or rejecting cookies could affect the availability and functionality of our website.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Access and Update</h3>
                  <p>
                    You can request to access, correct, or delete your personal information by contacting us using the information provided below.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free. In particular, emails sent to or from us may not be secure. Therefore, you should take special care in deciding what information you send to us.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Children's Privacy</h2>
              <p>
                Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="glass-effect border border-[var(--border-color)] rounded-xl p-6">
                <p className="font-medium text-[var(--foreground)]">Atom Flow</p>
                <p>Email: privacy@atomflow.studio</p>
                <p>Address: 123 Tech Lane, Innovation District, New York, NY 10001</p>
              </div>
            </section>
          </motion.div>
        </main>
        <Footer />
      </div>
    </PageLoadWrapper>
  );
}
