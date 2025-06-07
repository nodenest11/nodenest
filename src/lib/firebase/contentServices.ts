/**
 * Pre-configured content services for each content type
 * 
 * Provides consistent access to content across admin panel and frontend
 */

import { createContentCrud } from './contentCrud';
import { COLLECTIONS } from './firestoreUtils';
import {
  CompanyInfo,
  TeamMember,
  CompanyValue,
  Service,
  PortfolioProject,
  BlogPost,
  BlogCategory,
  Contact,
  SiteSettings
} from './contentTypes';

// Content services with standard CRUD operations
export const CompanyInfoService = createContentCrud<CompanyInfo>(COLLECTIONS.ABOUT);
export const TeamMemberService = createContentCrud<TeamMember>(COLLECTIONS.TEAM);
export const ValuesService = createContentCrud<CompanyValue>(COLLECTIONS.ABOUT);
export const ServiceService = createContentCrud<Service>(COLLECTIONS.SERVICES);
export const PortfolioService = createContentCrud<PortfolioProject>(COLLECTIONS.PORTFOLIO);
export const BlogService = createContentCrud<BlogPost>(COLLECTIONS.BLOG);
export const CategoryService = createContentCrud<BlogCategory>(COLLECTIONS.BLOG);
export const ContactService = createContentCrud<Contact>(COLLECTIONS.CONTACTS);
export const SettingsService = createContentCrud<SiteSettings>(COLLECTIONS.SETTINGS);

// Combined services object for easy access
export const ContentServices = {
  company: CompanyInfoService,
  team: TeamMemberService,
  values: ValuesService,
  services: ServiceService,
  portfolio: PortfolioService,
  blog: BlogService,
  categories: CategoryService,
  contacts: ContactService,
  settings: SettingsService
};

export default ContentServices; 