/**
 * Content CRUD Utilities
 * 
 * Provides consistent patterns for working with different content types
 * in both admin panels and frontend components.
 */

import { 
  addDocument, 
  updateDocument, 
  deleteDocument, 
  getAllDocuments,
  getDocumentById,
  getDocumentsByField,
  getSortedDocuments,
  COLLECTIONS,
  SORT_FIELDS,
  generateSlug
} from './firestoreUtils';

import { 
  BaseContent,
  ContentCreateAction,
  ContentUpdateAction,
  ContentDeleteAction,
  ContentFetchAction,
  ContentFetchByIdAction,
  APIResponse
} from './standardTypes';

/**
 * Creates a set of standard CRUD operations for a specific content type
 */
export function createContentCrud<T extends BaseContent>(collectionName: string) {
  // Create a new content item
  const create: ContentCreateAction<T> = async (data) => {
    // Generate slug if title exists and slug doesn't
    if ('title' in data && !('slug' in data) && typeof data.title === 'string') {
      (data as any).slug = generateSlug(data.title);
    }
    
    return addDocument<T>(collectionName, data);
  };
  
  // Update an existing content item
  const update: ContentUpdateAction<T> = async (id, data) => {
    // Generate slug if title is updated
    if ('title' in data && !('slug' in data) && typeof data.title === 'string') {
      (data as any).slug = generateSlug(data.title);
    }
    
    return updateDocument<T>(collectionName, id, data);
  };
  
  // Delete a content item
  const remove: ContentDeleteAction = async (id) => {
    return deleteDocument(collectionName, id);
  };
  
  // Get all content items
  const getAll = async (publishedOnly: boolean = false): Promise<T[]> => {
    return getAllDocuments<T>(collectionName, publishedOnly);
  };
  
  // Get published content items (for frontend)
  const getPublished = async (): Promise<T[]> => {
    return getAllDocuments<T>(collectionName, true);
  };
  
  // Get featured content items (for frontend)
  const getFeatured = async (): Promise<T[]> => {
    return getSortedDocuments<T>(
      collectionName, 
      true, // Only published
      [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' }
      ]
    );
  };
  
  // Get a single content item by ID
  const getById: ContentFetchByIdAction<T> = async (id) => {
    return getDocumentById<T>(collectionName, id);
  };
  
  // Get a content item by its slug (for frontend routes)
  const getBySlug = async (slug: string): Promise<T | null> => {
    const results = await getDocumentsByField<T>(collectionName, 'slug', slug, true);
    return results.length > 0 ? results[0] : null;
  };
  
  // Toggle publication status
  const togglePublished = async (id: string, currentStatus: boolean): Promise<boolean> => {
    return updateDocument<T>(collectionName, id, { published: !currentStatus } as any);
  };
  
  // Toggle featured status
  const toggleFeatured = async (id: string, currentStatus: boolean): Promise<boolean> => {
    return updateDocument<T>(collectionName, id, { featured: !currentStatus } as any);
  };
  
  return {
    create,
    update,
    delete: remove,
    getAll,
    getPublished,
    getFeatured,
    getById,
    getBySlug,
    togglePublished,
    toggleFeatured
  };
}

/**
 * Create content API response handler
 */
export function createApiResponse<T>(data?: T, error?: string): APIResponse<T> {
  if (error) {
    return {
      success: false,
      error,
      message: error
    };
  }
  
  return {
    success: true,
    data
  };
} 