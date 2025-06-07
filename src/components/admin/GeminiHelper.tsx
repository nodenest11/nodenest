'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GeminiHelperProps {
    onGeneratedContent: (content: any) => void;
    contentType: 'blog' | 'portfolio' | 'service' | 'contact';
    buttonText?: string;
}

export default function GeminiHelper({
    onGeneratedContent,
    contentType,
    buttonText = "AI Helper"
}: GeminiHelperProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const generateContent = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            let systemInstruction = "";
            let contentPrompt = "";

            // Set the system instruction based on content type
            switch (contentType) {
                case 'blog':
                    systemInstruction = "You are a helpful AI assistant that generates blog post content. Format your response as a JSON object with title, content, excerpt, category, tags (array), and a slug.";
                    contentPrompt = `Generate a blog post about: ${prompt}`;
                    break;
                case 'portfolio':
                    systemInstruction = "You are a helpful AI assistant that generates portfolio project descriptions. Format your response as a JSON object with title, description, client, category, challenge, solution, results, tags (array), and a slug.";
                    contentPrompt = `Generate a portfolio project about: ${prompt}`;
                    break;
                case 'service':
                    systemInstruction = "You are a helpful AI assistant that generates service descriptions. Format your response as a JSON object with title, description, benefits (array), features (array), price, and a slug.";
                    contentPrompt = `Generate a service description about: ${prompt}`;
                    break;
                case 'contact':
                    systemInstruction = "You are a helpful AI assistant that generates contact information. Format your response as a JSON object with name, email, phone, subject, and message.";
                    contentPrompt = `Generate contact information about: ${prompt}`;
                    break;
            }

            // Use the Gemini API to generate content
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: contentPrompt }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ],
                    systemInstruction: {
                        parts: [
                            { text: systemInstruction }
                        ]
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to generate content');
            }

            // Extract the text from the response
            const generatedText = data.candidates[0]?.content?.parts[0]?.text || '';

            // Try to parse as JSON
            try {
                // Find JSON in the response (it might be wrapped in markdown code blocks)
                const jsonMatch = generatedText.match(/```(?:json)?\s*({[\s\S]*?})\s*```/) ||
                    generatedText.match(/{[\s\S]*?}/);

                const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : generatedText;
                const parsedContent = JSON.parse(jsonStr);

                // Call the callback with the generated content
                onGeneratedContent(parsedContent);
                setIsOpen(false);
                setPrompt('');
            } catch (jsonError) {
                console.error('Failed to parse JSON:', jsonError);
                // If parsing fails, just return the text
                onGeneratedContent({ content: generatedText });
            }

        } catch (err) {
            console.error('Error generating content:', err);
            setError((err as Error).message || 'Failed to generate content');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow hover:shadow-lg transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {buttonText}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[var(--card-bg)] rounded-xl shadow-2xl p-6 max-w-lg w-full border border-[var(--border-color)]"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-[var(--foreground)]">
                                    AI Content Generator
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="prompt" className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                                    Describe what you want to generate
                                </label>
                                <textarea
                                    id="prompt"
                                    rows={4}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder={`Describe the ${contentType} you want to create...`}
                                    className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary-gradient-from)] focus:border-transparent transition-all"
                                />
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-500">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={generateContent}
                                    disabled={isGenerating}
                                    className="px-4 py-2 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white rounded-lg shadow hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    {isGenerating ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </>
                                    ) : "Generate Content"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 