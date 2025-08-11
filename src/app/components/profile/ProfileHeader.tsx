"use client";
import Image from "next/image";
import { useApplicantProfile } from "./ProfileContext";

export default function ProfileHeader() {
	const p = useApplicantProfile();
	const name = p?.full_name || p?.fullName || "";
	const email = p?.email || "";
	const avatar = p?.avatar_url || "/images/photo.png";
	const banner = p?.banner_url || "/images/profile.png";

	return (
		<div className="relative w-full h-[256px] rounded-lg my-8">
			<Image src={banner} alt="Banner" fill priority className="rounded-lg object-cover" />
			{/* Avatar + info row (overlapping) */}
			<div className="absolute -bottom-22 left-6 flex items-center gap-6">
				<Image
					src={avatar}
					alt="Profile"
					width={128}
					height={128}
					className="rounded-full border-4 border-white shadow-lg object-cover"
				/>
				<div className="flex flex-col">
					<p className="text-lg font-semibold leading-snug">{name || "—"}</p>
					<p className="text-sm leading-snug text-gray-700">{email || "—"}</p>
				</div>
			</div>
		</div>
	);
}
