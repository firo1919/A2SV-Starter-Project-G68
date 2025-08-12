"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface ApplicantProfile {
	full_name?: string;
	email?: string;
	avatar_url?: string;
	banner_url?: string;
	[k: string]: any;
}

const ProfileContext = createContext<ApplicantProfile | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
	const [raw, setRaw] = useState<any>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch("/api/profile", { cache: "no-store" });
				const ct = res.headers.get("content-type") || "";
				const json = ct.includes("application/json") ? await res.json().catch(() => ({})) : {};
				setRaw(json?.data ?? null);
			} catch {
				setRaw(null);
			} finally {
				setLoaded(true);
			}
		})();
	}, []);

	const value = useMemo<ApplicantProfile | null>(() => {
		if (!raw) return null;
		return {
			...raw,
			full_name: raw.full_name ?? "",
			email: raw.email ?? "",
			avatar_url: raw.profile_picture_url ?? raw.avatar_url ?? raw.avatarUrl ?? "/images/photo.png",
			banner_url: raw.banner_url ?? raw.bannerUrl ?? "/images/profile.png",
		};
	}, [raw]);

	return (
		<ProfileContext.Provider value={value}>
			{!loaded && <div className="text-sm text-gray-500 px-4 py-2">Loading profile...</div>}
			{children}
		</ProfileContext.Provider>
	);
}

export const useApplicantProfile = () => useContext(ProfileContext);
