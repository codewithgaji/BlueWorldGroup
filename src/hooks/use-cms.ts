/**
 * Data-fetching hooks. Each one hits the FastAPI endpoint and falls back to the
 * local placeholder dataset in `src/data/placeholder-content.ts`.
 */
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, fetchWithFallback } from "@/lib/api";
import { useCmsState } from "@/lib/cms-store";
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
  const cms = useCmsState();
  return useQuery({
    queryKey: ["cms", "hero-slides"],
    queryFn: () => fetchWithFallback<HeroSlide[]>(ENDPOINTS.heroSlides, cms.heroSlides),
    ...COMMON,
  });
}

export function useBusinessUnits() {
  const cms = useCmsState();
  return useQuery({
    queryKey: ["cms", "business-units"],
    queryFn: () => fetchWithFallback<BusinessUnit[]>(ENDPOINTS.businessUnits, cms.businessUnits),
    ...COMMON,
  });
}

export function useBusinessUnit(slug: string) {
  const query = useBusinessUnits();
  return { ...query, unit: query.data?.find((u) => u.slug === slug) };
}

export function useProducts() {
  const cms = useCmsState();
  return useQuery({
    queryKey: ["cms", "products"],
    queryFn: () => fetchWithFallback<Product[]>(ENDPOINTS.products, cms.products),
    ...COMMON,
  });
}

export function useTeamMembers() {
  const cms = useCmsState();
  return useQuery({
    queryKey: ["cms", "team"],
    queryFn: () => fetchWithFallback<TeamMember[]>(ENDPOINTS.teamMembers, cms.teamMembers),
    ...COMMON,
  });
}

export function useBlogPosts() {
  const cms = useCmsState();
  return useQuery({
    queryKey: ["cms", "blog-posts"],
    queryFn: () => fetchWithFallback<BlogPost[]>(ENDPOINTS.blogPosts, cms.blogPosts),
    ...COMMON,
  });
}

export function useJobPostings() {
  const cms = useCmsState();
  return useQuery({
    queryKey: ["cms", "jobs"],
    queryFn: () => fetchWithFallback<JobPosting[]>(ENDPOINTS.jobPostings, cms.jobPostings),
    ...COMMON,
  });
}

export function useSiteSettings() {
  const cms = useCmsState();
  return useQuery({
    queryKey: ["cms", "settings"],
    queryFn: () => fetchWithFallback<SiteSettings>(ENDPOINTS.settings, cms.settings),
    ...COMMON,
  });
}

export function useMediaLibrary() {
  const cms = useCmsState();
  return useQuery({
    queryKey: ["cms", "media"],
    queryFn: () => fetchWithFallback<MediaAsset[]>(ENDPOINTS.media, cms.mediaLibrary),
    ...COMMON,
  });
}
