"use client";
import Image from "next/image";
import { useApplicantProfile } from "./ProfileContext";
import { useState, useRef, useEffect } from "react";

export default function ProfileHeader() {
	const p = useApplicantProfile();
	const name = p?.full_name || p?.fullName || "";
	const email = p?.email || "";
	const banner = p?.banner_url || "/images/profile.png";

	const PLACEHOLDER = "/images/photo.png";
	const [preview, setPreview] = useState<string>(p?.avatar_url || PLACEHOLDER);
	const fileRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (p?.avatar_url) setPreview(p.avatar_url);
	}, [p?.avatar_url]);

	useEffect(() => {
		return () => {
			setPreview((old) => {
				if (old && old.startsWith("blob:")) URL.revokeObjectURL(old);
				return old;
			});
		};
	}, []);

	function pickFile() {
		fileRef.current?.click();
	}

	async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		setPreview((old) => {
			if (old && old.startsWith("blob:")) URL.revokeObjectURL(old);
			return url;
		});

		const fd = new FormData();
		fd.set("profile_picture", file);
		try {
			const res = await fetch("/api/profile", { method: "PUT", body: fd });
			if (!res.ok) {
				console.error("Avatar upload failed", res.status);
			}
		} catch (err) {
			console.error("Avatar upload error", err);
		}
	}

	return (
		<div className="relative w-full h-[256px] rounded-lg my-8 mb-8">
			<Image src={banner} alt="Banner" fill priority className="rounded-lg object-cover" />
			<div className="absolute -bottom-22 left-6 flex items-center gap-6">
				<button
					type="button"
					onClick={pickFile}
					className="relative group focus:outline-none"
					aria-label="Change profile picture"
					title="Change profile picture"
				>
					<div className="relative w-32 h-32 rounded-full bg-white p-1 shadow-lg">
						<div className="relative w-full h-full rounded-full overflow-hidden">
							<Image
								src={preview || PLACEHOLDER}
								alt="Profile"
								fill
								sizes="128px"
								className="object-cover select-none"
								priority
							/>
							<div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-medium transition">
								Change
							</div>
						</div>
					</div>
				</button>
				<input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
				<div className="flex flex-col">
					<p className="text-lg font-semibold leading-snug">{name || "—"}</p>
					<p className="text-sm leading-snug text-gray-700">{email || "—"}</p>
				</div>
			</div>
		</div>
	);
}
