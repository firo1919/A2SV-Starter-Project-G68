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
		<div className="relative w-full h-[256px] rounded-lg my-8">
			<Image src={banner} alt="Banner" fill priority className="rounded-lg object-cover" />
			<div className="absolute -bottom-22 left-6 flex items-center gap-6">
				<button
					type="button"
					onClick={pickFile}
					className="relative group focus:outline-none rounded-full"
					aria-label="Change profile picture"
					title="Change profile picture"
				>
					<Image
						src={preview || PLACEHOLDER}
						alt="Profile"
						width={128}
						height={128}
						className="rounded-full border-4 border-white shadow-lg object-cover transition group-hover:brightness-90"
					/>
					<span className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 text-white text-xs font-medium">
						Change
					</span>
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
