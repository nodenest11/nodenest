import { BaseContent, WithImage, SEOData, Categorized, Dated } from './standardTypes';

// About types
export interface CompanyInfo extends BaseContent {
  name: string;
  tagline: string;
  description: string;
  mission?: string;
  vision?: string;
  foundedYear?: number;
  location?: string;
  email?: string;
  phone?: string;
  address?: string;
  logoUrl?: string;
}

export interface TeamMember extends BaseContent, WithImage {
  name: string;
  role: string;
  bio: string;
  order: number;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
  };
}

export interface CompanyValue extends BaseContent {
  title: string;
  description: string;
  icon?: string;
  order: number;
}

// Service types
export interface Service extends BaseContent, WithImage, SEOData, Categorized {
  title: string;
  description: string;
  icon: string;
  details: string;
  tools: string;
  color?: string;
  features: string[];
  process?: string[];
  order: number;
  featured: boolean;
  date?: string;
}

// Portfolio types
export interface PortfolioProject extends BaseContent, WithImage, SEOData, Categorized, Dated {
  title: string;
  description: string;
  client: string;
  challenge?: string;
  solution?: string;
  results?: string;
  testimonial?: string;
  websiteUrl?: string;
  featured: boolean;
}

// Blog types
export interface BlogPost extends BaseContent {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole?: string;
  authorImage?: string;
  category: string;
  date: string;
  readTime?: string;
  tags?: string[];
  featured: boolean;
  image?: string;
  imageUrl?: string;
  ogImage?: string;
}

export interface BlogCategory extends BaseContent {
  name: string;
  description: string;
  slug: string;
}

// Contact types
export interface Contact extends BaseContent {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

// Settings type (for global site settings)
export interface SiteSettings extends BaseContent {
  name: string;
  value: any;
  description?: string;
} 