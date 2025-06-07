"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageLoadWrapper from "../../components/PageLoadWrapper";

export default function TermsOfService() {
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
              Terms of Service
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
                Welcome to Atom Flow. These Terms of Service ("Terms") govern your use of our website and the services we offer. By accessing or using our website, you agree to be bound by these Terms.
              </p>
              <p>
                Please read these Terms carefully before using our services. If you do not agree to these Terms, please do not use our website or services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Use of Our Services</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Eligibility</h3>
                  <p>
                    You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this eligibility requirement and have the right, authority, and capacity to enter into these Terms.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Account Responsibility</h3>
                  <p>
                    If you create an account with us, you are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Acceptable Use</h3>
                  <p className="mb-2">
                    You agree not to use our services for any unlawful purpose or in any way that may impair the performance, functionality, or availability of our services. Prohibited activities include but are not limited to:
                  </p>
                  <ul className="list-disc pl-8 space-y-1">
                    <li>Engaging in any fraudulent, deceptive, or misleading activities</li>
                    <li>Uploading or transmitting viruses, malware, or other malicious code</li>
                    <li>Attempting to gain unauthorized access to our systems or other users' accounts</li>
                    <li>Collecting or harvesting data from our services without permission</li>
                    <li>Using our services to transmit unsolicited communications or advertisements</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Our Intellectual Property</h3>
                  <p>
                    Our website and all of its content, features, and functionality, including but not limited to text, graphics, logos, icons, images, audio clips, software, and the design, selection, and arrangement thereof, are owned by Atom Flow, its licensors, or other providers and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Limited License</h3>
                  <p>
                    We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our services for personal and non-commercial purposes in accordance with these Terms. This license does not include any resale or commercial use of our services or content; any collection and use of any product listings, descriptions, or prices; any derivative use of our services or content; or any use of data mining, robots, or similar data gathering and extraction tools.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Your Content</h3>
                  <p>
                    If you submit, upload, or share any content through our services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content for the purpose of providing and promoting our services.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Service Availability and Modifications</h2>
              <p className="mb-4">
                We strive to ensure that our services are available at all times. However, we do not guarantee that our services will be uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue our services, temporarily or permanently, with or without notice.
              </p>
              <p>
                We may also update these Terms from time to time. By continuing to use our services after any changes to these Terms, you agree to be bound by the revised Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Disclaimers</h2>
              <p className="mb-4">
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that our services will be uninterrupted or error-free, that defects will be corrected, or that our website or the servers that make it available are free of viruses or other harmful components.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Limitation of Liability</h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL ATOM FLOW, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, OUR SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Atom Flow, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Governing Law</h2>
              <p>
                These Terms and your use of our services will be governed by and construed in accordance with the laws of the State of New York, without giving effect to any choice or conflict of law provision or rule.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Dispute Resolution</h2>
              <p className="mb-4">
                Any legal action or proceeding arising out of or related to these Terms or our services shall be instituted exclusively in the federal courts of the United States or the courts of the State of New York, although we retain the right to bring any suit, action, or proceeding against you for breach of these Terms in your country of residence or any other relevant country.
              </p>
              <p>
                You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, such provision shall be struck from these Terms and the remaining provisions shall remain in full force and effect.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Atom Flow regarding your use of our services and supersede all prior and contemporaneous written or oral agreements, proposals, or representations.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--foreground)]">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="glass-effect border border-[var(--border-color)] rounded-xl p-6">
                <p className="font-medium text-[var(--foreground)]">Atom Flow</p>
                <p>Email: legal@atomflow.studio</p>
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
