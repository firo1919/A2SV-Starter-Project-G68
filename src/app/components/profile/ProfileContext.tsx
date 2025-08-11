"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
	const [raw, setRaw] = useState<any>(null);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch("/api/profile/me", { cache: "no-store" });
				const json = await res.json().catch(() => ({}));
				const data = json?.data?.data ?? json?.data ?? null;
				if (!cancelled) setRaw(data);
			} catch {
				if (!cancelled) setRaw(null);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const value = useMemo<ApplicantProfile | null>(() => {
		if (!raw) return null;
		return {
			...raw,
			full_name: raw.full_name ?? raw.fullName ?? "",
			email: raw.email ?? "",
			role: raw.role ?? "",
			avatar_url: raw.avatar_url ?? raw.avatarUrl ?? "/images/photo.png",
			banner_url: raw.banner_url ?? raw.bannerUrl ?? "/images/profile.png",
		};
	}, [raw]);

	return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export const useApplicantProfile = () => useContext(ProfileContext);
