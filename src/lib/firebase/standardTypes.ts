import { Timestamp } from 'firebase/firestore';

/**
 * Base content interface that all content types must extend
 * Ensures consistent fields across all content types
 */
export interface BaseContent {
  id?: string;              // Document ID
  createdAt?: Timestamp;    // Creation timestamp
  updatedAt?: Timestamp;    // Last update timestamp
  published?: boolean;      // Publication status
  slug?: string;            // URL slug for web content
  order?: number;           // Display order (for sorting)
  featured?: boolean;       // Whether this is featured content
}

/**
 * Standard image fields used in multiple content types
 */
export interface WithImage {
  imageUrl: string;         // Main image URL
  imageAlt?: string;        // Alt text for accessibility
  galleryImages?: string[]; // Additional images
}

/**
 * Standard SEO metadata for all public-facing content
 */
export interface SEOData {
  metaTitle?: string;       // SEO title (falls back to regular title)
  metaDescription?: string; // SEO description
  keywords?: string[];      // SEO keywords
  ogImage?: string;         // Open Graph image URL
}

/**
 * Fields for categorized content
 */
export interface Categorized {
  category: string;         // Primary category
  tags?: string[];          // Additional tags
}

/**
 * Content with dates for scheduling/sorting
 */
export interface Dated {
  date: string;             // Publication date (YYYY-MM-DD format)
  expiryDate?: string;      // Optional expiration date
}

/**
 * Standard action utility types for CRUD operations
 */
export type ContentCreateAction<T> = (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string | null>;
export type ContentUpdateAction<T> = (id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<boolean>;
export type ContentDeleteAction = (id: string) => Promise<boolean>;
export type ContentFetchAction<T> = () => Promise<T[]>;
export type ContentFetchByIdAction<T> = (id: string) => Promise<T | null>;

/**
 * Utility type to make fields required for admin forms
 */
export type RequiredFormFields<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Standard success/error response structure for API endpoints
 */
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 