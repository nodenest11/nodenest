"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageLoadWrapper from '../../components/PageLoadWrapper';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FAQ from '../../components/FAQ';
import { Service, COLLECTIONS, getAllDocuments, SORT_FIELDS } from '@/lib/firebase';

// Static data - process steps and client industries won't be fetched from the database
const processSteps = [
	{
		title: "Discovery",
		description: "We start by understanding your business, goals, and users through in-depth research and analysis.",
		icon: "🔍"
	},
	{
		title: "Strategy",
		description: "We develop a comprehensive roadmap and technical strategy tailored to your specific needs and objectives.",
		icon: "📝"
	},
	{
		title: "Design",
		description: "Our design team creates beautiful, intuitive interfaces that align with your brand and delight your users.",
		icon: "✏️"
	},
	{
		title: "Development",
		description: "We build your solution using clean, maintainable code and the latest technologies and best practices.",
		icon: "💻"
	},
	{
		title: "Testing",
		description: "Rigorous quality assurance ensures your product works flawlessly across all devices and use cases.",
		icon: "🧪"
	},
	{
		title: "Launch",
		description: "We handle deployment and ensure a smooth launch, providing support throughout the process.",
		icon: "🚀"
	},
	{
		title: "Growth",
		description: "Ongoing optimization, maintenance, and support to help your digital product evolve and succeed.",
		icon: "📈"
	}
];

const clientIndustries = [
	"Technology", "E-commerce", "Finance", "Healthcare", "Education", 
	"Entertainment", "Real Estate", "Travel", "Food & Beverage", "Non-Profit"
];

export default function ServicesPage() {
	const [services, setServices] = useState<Service[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch services from the database
	useEffect(() => {
		async function fetchServices() {
			try {
				setLoading(true);
				const servicesData = await getAllDocuments<Service>(
					COLLECTIONS.SERVICES,
					true, // Published only
					SORT_FIELDS.ORDER, // Order by the 'order' field
					'asc' // Ascending order
				);
				setServices(servicesData);
			} catch (error) {
				console.error("Error fetching services:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchServices();
	}, []);

	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

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
							Our Services
						</motion.h1>
						<motion.p
							className="text-xl text-[var(--foreground)] opacity-90 max-w-4xl mx-auto text-center mb-16"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							We deliver end-to-end digital solutions that transform ideas into impactful experiences. Our comprehensive services are designed to help businesses thrive in the digital world.
						</motion.p>

						{/* Services Grid */}
						{loading ? (
							<div className="flex justify-center items-center h-60">
								<div className="w-16 h-16 border-4 border-[var(--primary-gradient-from)] border-t-transparent rounded-full animate-spin"></div>
							</div>
						) : services.length === 0 ? (
							<p className="text-center text-[var(--foreground)]/70">No services available at the moment.</p>
						) : (
							<motion.div
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
								variants={{
									hidden: { opacity: 0 },
									visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
								}}
								initial="hidden"
								animate="visible"
							>
								{services.map((service, index) => (
									<motion.div
										key={service.id}
										className="glass-effect rounded-2xl shadow-xl border border-[var(--border-color)] p-8 flex flex-col gap-6"
										variants={fadeInUp}
										transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
										whileHover={{ 
											scale: 1.03, 
											boxShadow: '0 0 20px rgba(0, 255, 231, 0.2)' 
										}}
									>
										<div className="text-4xl mb-2">
											{/* Render icon based on the icon name */}
											{service.icon === 'code' && '💻'}
											{service.icon === 'design' && '🎨'}
											{service.icon === 'chart' && '📊'}
											{service.icon === 'globe' && '🌐'}
											{service.icon === 'shield' && '🛡️'}
											{service.icon === 'server' && '🖥️'}
											{service.icon === 'mobile' && '📱'}
											{service.icon === 'cloud' && '☁️'}
											{service.icon === 'default' && '⚡'}
										</div>
										<h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">{service.title}</h2>
										<p className="text-[var(--foreground)] opacity-90">{service.description}</p>
										<div>
											<h3 className="text-lg font-medium text-[var(--foreground)] mb-2">Key Features:</h3>
											<ul className="grid grid-cols-1 gap-2">
												{service.features && service.features.slice(0, 3).map((feature, idx) => (
													<li key={idx} className="flex items-center gap-2 text-[var(--foreground)] opacity-80">
														<span className="text-[var(--primary-gradient-from)]">✓</span> {feature}
													</li>
												))}
											</ul>
										</div>
										<Link 
											href={`/services/${service.slug}`} 
											className="mt-auto px-4 py-2 text-center rounded-full border border-[var(--primary-gradient-from)]/50 text-[var(--foreground)] hover:bg-gradient-to-r hover:from-[var(--primary-gradient-from)] hover:to-[var(--primary-gradient-to)] hover:text-[var(--background)] transition-all duration-300"
										>
											Learn More
										</Link>
									</motion.div>
								))}
							</motion.div>
						)}
					</section>

					{/* Process Section */}
					<section className="w-full max-w-6xl mx-auto mb-20">
						<motion.h2
							className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-10 text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6 }}
						>
							Our Process
						</motion.h2>
						<motion.p
							className="text-lg text-[var(--foreground)] opacity-90 max-w-3xl mx-auto text-center mb-12"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							We follow a structured yet flexible approach to deliver successful digital projects. Our process ensures clarity, collaboration, and exceptional results.
						</motion.p>

						<div className="relative">
							{/* Process Timeline Line */}
							<div className="absolute left-8 md:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] transform -translate-x-1/2 md:block hidden"></div>
							
							{/* Process Steps */}
							<div className="space-y-12">
								{processSteps.map((step, index) => (
									<motion.div
										key={index}
										className={`relative flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
									>
										{/* Timeline Dot */}
										<div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] transform -translate-x-1/2 z-10 hidden md:block"></div>
										
										{/* Step Content */}
										<div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-16 md:pl-0`}>
											<div className="glass-effect rounded-xl p-6 border border-[var(--border-color)]">
												<div className="flex items-center gap-3 mb-3 md:justify-start">
													<div className="text-3xl md:hidden">{step.icon}</div>
													<h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
														{index + 1}. {step.title}
													</h3>
												</div>
												<p className="text-[var(--foreground)] opacity-90">{step.description}</p>
											</div>
										</div>

										{/* Mobile Process Icon (visible only on mobile) */}
										<div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-2xl md:hidden">
											{step.icon}
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</section>

					{/* Technologies Section */}
					<section className="w-full max-w-6xl mx-auto mb-20">
						<motion.div
							className="glass-effect rounded-2xl p-10 border border-[var(--border-color)]"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-8 text-center">
								Technologies We Use
							</h2>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
								{[
									{ name: "React & Next.js", icon: "⚛️" },
									{ name: "Node.js", icon: "🟢" },
									{ name: "TypeScript", icon: "🔷" },
									{ name: "Firebase", icon: "🔥" },
									{ name: "GraphQL", icon: "⬢" },
									{ name: "TailwindCSS", icon: "🎨" },
									{ name: "Flutter", icon: "📱" },
									{ name: "Python", icon: "🐍" }
								].map((tech, index) => (
									<motion.div
										key={index}
										className="glass-effect rounded-xl p-4 text-center border border-[var(--border-color)] hover:border-[var(--primary-gradient-from)]/50 transition-all duration-300"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
										whileHover={{ scale: 1.05 }}
									>
										<div className="text-3xl mb-2">{tech.icon}</div>
										<div className="text-[var(--foreground)]">{tech.name}</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</section>

					{/* Industries Section */}
					<section className="w-full max-w-6xl mx-auto mb-20">
						<motion.h2
							className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-8 text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6 }}
						>
							Industries We Serve
						</motion.h2>

						<motion.div
							className="flex flex-wrap justify-center gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							{clientIndustries.map((industry, index) => (
								<motion.div
									key={index}
									className="px-6 py-3 rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)] hover:border-[var(--primary-gradient-from)]/50 hover:text-[var(--primary-gradient-from)] transition-all duration-300"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
									whileHover={{ scale: 1.05 }}
								>
									{industry}
								</motion.div>
							))}
						</motion.div>
					</section>

					{/* FAQ Section */}
					<section className="w-full max-w-6xl mx-auto mb-20">
						<motion.h2
							className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-10 text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6 }}
						>
							Frequently Asked Questions
						</motion.h2>

						<FAQ
							faqs={[
								{
									question: "What is your typical project timeline?",
									answer: "Project timelines vary based on scope and complexity. A typical website might take 4-8 weeks, while more complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation."
								},
								{
									question: "How do you approach pricing for projects?",
									answer: "We offer both fixed-price quotes and flexible engagement models. After understanding your requirements, we'll recommend the most suitable pricing structure for your project, with full transparency on costs."
								},
								{
									question: "Do you provide ongoing support after launch?",
									answer: "Yes, we offer various maintenance and support packages to ensure your digital product continues to perform optimally. These range from basic hosting and updates to comprehensive growth partnerships."
								},
								{
									question: "How do you ensure the quality of your deliverables?",
									answer: "We implement rigorous quality assurance processes including automated testing, cross-browser compatibility checks, performance optimization, and security audits before any launch."
								},
								{
									question: "Can you work with our existing team?",
									answer: "Absolutely! We often collaborate with in-house teams, providing specialized expertise while integrating seamlessly with your workflows and processes."
								}
							]}
						/>
					</section>

					{/* CTA Section */}
					<section className="w-full max-w-6xl mx-auto mb-20">
						<motion.div
							className="glass-effect rounded-2xl p-10 md:p-16 border border-[var(--primary-gradient-from)]/30 text-center relative overflow-hidden"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							{/* Background decorative elements */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-gradient-from)]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
							<div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--primary-gradient-to)]/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

							<div className="relative z-10">
								<h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-6">Ready to Transform Your Digital Presence?</h2>
								<p className="text-lg md:text-xl text-[var(--foreground)] opacity-90 max-w-2xl mx-auto mb-8">
									Let's discuss how Atom Flow can help you create a digital experience that stands out from the competition and drives real business results.
								</p>
								<Link
									href="/contact"
									className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)] inline-block"
								>
									Get in Touch
								</Link>
							</div>
						</motion.div>
					</section>
				</main>
				<Footer />
			</div>
		</PageLoadWrapper>
	);
}
