import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { events, eventGallery } from '@/data/events';
import { cmsService } from '@/services/cms.service';
import type { CMSData, CMSContextType, University } from '@/types/cms.types';

// Re-export types for consumers that import from this file
export type { CMSData, University, CMSContextType };

// ─────────────────────────────────────────────
//  Default CMS Data
// ─────────────────────────────────────────────
const defaultCMSData: CMSData = {
  pteHeroTitle: 'PTE Academic Preparation',
  pteHeroDescription:
    'Master the computer-based PTE test with our cutting-edge training facilities and AI-powered practice systems.',
  pteSuccessImages: [
    '/success-stories/story-1.png',
    '/success-stories/story-2.png',
    '/success-stories/story-3.png',
    '/success-stories/story-4.png',
    '/success-stories/story-5.png',
  ],

  ieltsHeroTitle: 'Master IELTS with FTI',
  ieltsHeroDescription: 'Join the biggest IELTS campus in Gujranwala division.',
  ieltsSuccessImages: [
    '/success-stories/story-1.png',
    '/success-stories/story-2.png',
    '/success-stories/story-3.png',
    '/success-stories/story-4.png',
    '/success-stories/story-5.png',
  ],

  homeHeroTitle: 'Your Journey to Global Success',
  homeHeroDescription: 'Expert consultancy for studying abroad.',
  homeHeroImage: '/skyline_generated.png',
  homeSuccessImages: [
    '/success-stories/story-1.png',
    '/success-stories/story-2.png',
    '/success-stories/story-3.png',
    '/success-stories/story-4.png',
    '/success-stories/story-5.png',
  ],
  homeUniversityPartners: [
    { id: '1',  name: 'Monash University',                logo: 'https://www.google.com/s2/favicons?sz=128&domain=monash.edu',       country: 'Australia' },
    { id: '2',  name: 'University of Queensland',         logo: 'https://www.google.com/s2/favicons?sz=128&domain=uq.edu.au',         country: 'Australia' },
    { id: '3',  name: 'University of Western Australia',  logo: 'https://www.google.com/s2/favicons?sz=128&domain=uwa.edu.au',        country: 'Australia' },
    { id: '4',  name: 'University of Technology Sydney',  logo: 'https://www.google.com/s2/favicons?sz=128&domain=uts.edu.au',        country: 'Australia' },
    { id: '5',  name: 'Curtin University',                logo: 'https://www.google.com/s2/favicons?sz=128&domain=curtin.edu.au',     country: 'Australia' },
    { id: '6',  name: 'Deakin University',                logo: 'https://www.google.com/s2/favicons?sz=128&domain=deakin.edu.au',     country: 'Australia' },
    { id: '7',  name: 'University of Alberta',            logo: 'https://www.google.com/s2/favicons?sz=128&domain=ualberta.ca',       country: 'Canada' },
    { id: '8',  name: 'University of Waterloo',           logo: 'https://www.google.com/s2/favicons?sz=128&domain=uwaterloo.ca',      country: 'Canada' },
    { id: '9',  name: 'University of Victoria',           logo: 'https://www.google.com/s2/favicons?sz=128&domain=uvic.ca',           country: 'Canada' },
    { id: '10', name: 'University of Manitoba',           logo: 'https://www.google.com/s2/favicons?sz=128&domain=umanitoba.ca',      country: 'Canada' },
    { id: '11', name: 'Thompson Rivers University',       logo: 'https://www.google.com/s2/favicons?sz=128&domain=tru.ca',            country: 'Canada' },
    { id: '12', name: 'University of Amsterdam',          logo: 'https://www.google.com/s2/favicons?sz=128&domain=uva.nl',            country: 'Europe' },
    { id: '13', name: 'Trinity College Dublin',           logo: 'https://www.google.com/s2/favicons?sz=128&domain=tcd.ie',            country: 'Europe' },
    { id: '14', name: 'Technical University of Munich',   logo: 'https://www.google.com/s2/favicons?sz=128&domain=tum.de',            country: 'Europe' },
    { id: '15', name: 'KU Leuven',                        logo: 'https://www.google.com/s2/favicons?sz=128&domain=kuleuven.be',       country: 'Europe' },
    { id: '16', name: 'Arizona State University',         logo: 'https://www.google.com/s2/favicons?sz=128&domain=asu.edu',           country: 'USA' },
    { id: '17', name: 'Colorado State University',        logo: 'https://www.google.com/s2/favicons?sz=128&domain=colostate.edu',     country: 'USA' },
    { id: '18', name: 'DePaul University',                logo: 'https://www.google.com/s2/favicons?sz=128&domain=depaul.edu',        country: 'USA' },
    { id: '19', name: 'Pace University',                  logo: 'https://www.google.com/s2/favicons?sz=128&domain=pace.edu',          country: 'USA' },
    { id: '20', name: 'University of Sussex',             logo: 'https://www.google.com/s2/favicons?sz=128&domain=sussex.ac.uk',      country: 'UK' },
    { id: '21', name: 'University of Nottingham',         logo: 'https://www.google.com/s2/favicons?sz=128&domain=nottingham.ac.uk',  country: 'UK' },
    { id: '22', name: 'Queen Mary University of London',  logo: 'https://www.google.com/s2/favicons?sz=128&domain=qmul.ac.uk',        country: 'UK' },
    { id: '23', name: 'University of Exeter',             logo: 'https://www.google.com/s2/favicons?sz=128&domain=exeter.ac.uk',      country: 'UK' },
    { id: '24', name: 'University of Bath',               logo: 'https://www.google.com/s2/favicons?sz=128&domain=bath.ac.uk',        country: 'UK' },
    { id: '25', name: "Queen's University Belfast",        logo: 'https://www.google.com/s2/favicons?sz=128&domain=qub.ac.uk',        country: 'UK' },
  ],

  aboutHeroTitle: 'Nurturing Careers Since 2006.',
  aboutHeroDescription:
    'FTI Consultants is a leading overseas education consultancy with a strong presence in Pakistan and the UK. With over 20 years of experience, we guide students in choosing the right program and institution for a successful academic journey.',

  destinationsHeroTitle: 'Choose Your Dream Destination',
  destinationsHeroDescription:
    'Explore top study destinations worldwide. We help you find the perfect country based on your goals, budget, and career aspirations.',

  servicesHeroTitle: 'Comprehensive Education Solutions.',
  servicesHeroDescription:
    'From initial counselling to landing in your dream country, we architect your entire global journey with elite-level precision.',

  eventsHeroTitle: 'Empowering Your Future Through Global Events',
  eventsHeroDescription:
    'Stay updated with our latest seminars, webinars, and roadshows. Connect with university experts and take the first step towards your international education.',

  contactHeroTitle: 'Contact Us',
  contactHeroDescription:
    'Get in touch with our team for any inquiries or to book a free counselling session.',

  eventsList: events,
  eventGalleryList: eventGallery,
};

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────
const CMSContext = createContext<CMSContextType | undefined>(undefined);

// ─────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────
export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CMSData>(() => {
    const saved = localStorage.getItem('fti_cms_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultCMSData,
          ...parsed,
          homeUniversityPartners: parsed.homeUniversityPartners ?? defaultCMSData.homeUniversityPartners,
          eventsList: parsed.eventsList ?? defaultCMSData.eventsList,
          eventGalleryList: parsed.eventGalleryList ?? defaultCMSData.eventGalleryList,
        };
      } catch { /* fallthrough */ }
    }
    return defaultCMSData;
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // ── Fetch from backend on mount ──────────────────────────────────────
  useEffect(() => {
    cmsService.get().then((backendData) => {
      const remotePayload = backendData['global_cms_data'] ?? backendData;
      if (remotePayload && typeof remotePayload === 'object' && Object.keys(remotePayload).length > 0) {
        const merged: CMSData = {
          ...defaultCMSData,
          ...remotePayload,
          homeUniversityPartners: remotePayload.homeUniversityPartners ?? defaultCMSData.homeUniversityPartners,
          eventsList: remotePayload.eventsList ?? defaultCMSData.eventsList,
          eventGalleryList: remotePayload.eventGalleryList ?? defaultCMSData.eventGalleryList,
        };
        setCmsData(merged);
        localStorage.setItem('fti_cms_data', JSON.stringify(merged));
      }
    }).catch(() => {
      console.warn('[CMS] Backend unavailable, using localStorage fallback.');
    });
  }, []);

  // ── Persist to localStorage ──────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('fti_cms_data', JSON.stringify(cmsData));
  }, [cmsData]);

  // ── Update — optimistic local + backend sync ─────────────────────────
  const updateCMSData = useCallback(async (newData: Partial<CMSData>) => {
    setCmsData(prev => ({ ...prev, ...newData }));
    setIsSyncing(true);
    try {
      await cmsService.update(newData);
    } catch (err) {
      console.warn('[CMS] Failed to sync to backend, saved locally only.', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // ── Upload image → base64 ────────────────────────────────────────────
  const uploadImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <CMSContext.Provider value={{ cmsData, updateCMSData, uploadImage, isSyncing }}>
      {children}
    </CMSContext.Provider>
  );
};

// ─────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────
export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
};
