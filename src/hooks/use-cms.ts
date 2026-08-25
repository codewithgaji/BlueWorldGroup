/**
 * Data-fetching hooks. Each one hits the FastAPI endpoint and falls back to the
 * local placeholder dataset in `src/data/placeholder-content.ts`.
 */
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, fetchWithFallback } from "@/lib/api";
import {
  BLOG_POSTS,
  BUSINESS_UNITS,
  HERO_SLIDES,
  JOB_POSTINGS,
  MEDIA_LIBRARY,
  PRODUCTS,
  SITE_SETTINGS,
  TEAM_MEMBERS,
} from "@/data/placeholder-content";
import type {
  BlogPost,
  BusinessUnit,
  HeroSlide,
  JobPosting,
  MediaAsset,
  Product,
  SiteSettings,
  TeamMember,
} from "@/lib/types";

const COMMON = { staleTime: 5 * 60_000, retry: 0 } as const;

export function useHeroSlides() {
  return useQuery({
    queryKey: ["cms", "hero-slides"],
    queryFn: () => fetchWithFallback<HeroSlide[]>(ENDPOINTS.heroSlides, HERO_SLIDES),
    ...COMMON,
  });
}

export function useBusinessUnits() {
  return useQuery({
    queryKey: ["cms", "business-units"],
    queryFn: () => fetchWithFallback<BusinessUnit[]>(ENDPOINTS.businessUnits, BUSINESS_UNITS),
    ...COMMON,
  });
}

export function useBusinessUnit(slug: string) {
  const query = useBusinessUnits();
  return { ...query, unit: query.data?.find((u) => u.slug === slug) };
}

export function useProducts() {
  return useQuery({
    queryKey: ["cms", "products"],
    queryFn: () => fetchWithFallback<Product[]>(ENDPOINTS.products, PRODUCTS),
    ...COMMON,
  });
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ["cms", "team"],
    queryFn: () => fetchWithFallback<TeamMember[]>(ENDPOINTS.teamMembers, TEAM_MEMBERS),
    ...COMMON,
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["cms", "blog-posts"],
    queryFn: () => fetchWithFallback<BlogPost[]>(ENDPOINTS.blogPosts, BLOG_POSTS),
    ...COMMON,
  });
}

export function useJobPostings() {
  return useQuery({
    queryKey: ["cms", "jobs"],
    queryFn: () => fetchWithFallback<JobPosting[]>(ENDPOINTS.jobPostings, JOB_POSTINGS),
    ...COMMON,
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["cms", "settings"],
    queryFn: () => fetchWithFallback<SiteSettings>(ENDPOINTS.settings, SITE_SETTINGS),
    ...COMMON,
  });
}

export function useMediaLibrary() {
  return useQuery({
    queryKey: ["cms", "media"],
    queryFn: () => fetchWithFallback<MediaAsset[]>(ENDPOINTS.media, MEDIA_LIBRARY),
    ...COMMON,
  });
}
