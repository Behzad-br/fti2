// ─────────────────────────────────────────────
//  CMS Types
// ─────────────────────────────────────────────

import type { Event, GalleryItem } from '@/data/events';

export type { Event, GalleryItem };

export type CountryName = 'Australia' | 'Canada' | 'Europe' | 'USA' | 'UK';

export interface University {
  id: string;
  name: string;
  logo: string; // URL or base64
  country: CountryName;
}

export interface CMSData {
  // PTE Page
  pteHeroTitle: string;
  pteHeroDescription: string;
  pteSuccessImages: string[];

  // IELTS Page
  ieltsHeroTitle: string;
  ieltsHeroDescription: string;
  ieltsSuccessImages: string[];

  // Home Page
  homeHeroTitle: string;
  homeHeroDescription: string;
  homeHeroImage: string;
  homeSuccessImages: string[];
  homeUniversityPartners: University[];

  // Profile / About Page
  aboutHeroTitle: string;
  aboutHeroDescription: string;

  // Destinations Page
  destinationsHeroTitle: string;
  destinationsHeroDescription: string;

  // Services Page
  servicesHeroTitle: string;
  servicesHeroDescription: string;

  // Events Page
  eventsHeroTitle: string;
  eventsHeroDescription: string;

  // Contact Page
  contactHeroTitle: string;
  contactHeroDescription: string;

  // Events & Gallery
  eventsList: Event[];
  eventGalleryList: GalleryItem[];
}

export interface CMSContextType {
  cmsData: CMSData;
  updateCMSData: (newData: Partial<CMSData>) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  isSyncing: boolean;
}
