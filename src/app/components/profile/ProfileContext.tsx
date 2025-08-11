"use client";
import { createContext, useContext, useMemo } from "react";
import { useGetProfileQuery } from "@/lib/redux/api/profileApiSlice";

export interface ApplicantProfile {
  full_name?: string;
  fullName?: string;
  email?: string;
  role?: string;
  avatar_url?: string;
  avatarUrl?: string;
  banner_url?: string;
  bannerUrl?: string;
  [k: string]: any;
}

const ProfileContext = createContext<ApplicantProfile | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { data } = useGetProfileQuery();
  const raw = (data as any)?.data?.data || (data as any)?.data || null;

  const value = useMemo<ApplicantProfile | null>(() => {
    if (!raw) return null;
    return {
      ...raw,
      full_name: raw.full_name ?? raw.fullName ?? "",
      email: raw.email ?? "",
      role: raw.role ?? "",
      avatar_url: raw.avatar_url ?? raw.avatarUrl,
      banner_url: raw.banner_url ?? raw.bannerUrl,
    };
  }, [raw]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export const useApplicantProfile = () => useContext(ProfileContext);