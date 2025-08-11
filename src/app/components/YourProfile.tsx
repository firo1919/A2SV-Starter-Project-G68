"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useApplicantProfile } from "@/app/components/profile/ProfileContext";

interface RawProfile {
	fullName?: string;
	full_name?: string;
	email?: string;
	role?: string;
	avatar_url?: string;
	banner_url?: string;
	avatarUrl?: string;
	bannerUrl?: string;
}

export default function YourProfile() {
	const raw = useApplicantProfile() as RawProfile | null;

	const resolved = useMemo(() => {
		if (!raw) return null;
		return {
			full_name: (raw.full_name || raw.fullName || "").trim(),
			email: (raw.email || "").trim(),
			role: (raw.role || "").trim(),
			avatar: raw.avatar_url || raw.avatarUrl || "/images/photo.png",
			banner: raw.banner_url || raw.bannerUrl || "/images/profile.png",
		};
	}, [
		raw?.full_name,
		raw?.fullName,
		raw?.email,
		raw?.role,
		raw?.avatar_url,
		raw?.avatarUrl,
		raw?.banner_url,
		raw?.bannerUrl,
	]);

	// Profile form state
	const [form, setForm] = useState({ full_name: "", email: "", role: "" });
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	// Password form state (placeholder logic)
	const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
	const [pwSaving, setPwSaving] = useState(false);
	const [pwMsg, setPwMsg] = useState<string | null>(null);
	const [pwErr, setPwErr] = useState<string | null>(null);

	useEffect(() => {
		if (resolved) {
			setForm({
				full_name: resolved.full_name,
				email: resolved.email,
				role: resolved.role,
			});
		}
	}, [resolved?.full_name, resolved?.email, resolved?.role]);

	const dirty = !!resolved && (form.full_name !== resolved.full_name || form.role !== resolved.role);

	const onChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		setSuccess(null);
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	};

	const diffPayload = () => {
		if (!resolved) return null;
		const p: Record<string, any> = {};
		if (form.full_name !== resolved.full_name) p.full_name = form.full_name;
		if (form.role !== resolved.role) p.role = form.role;
		// Always include email if backend expects it
		if (resolved.email) p.email = resolved.email;
		return Object.keys(p).length ? p : null;
	};

	const onSubmitProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!resolved) return;
		const payload = diffPayload();
		if (!payload) {
			setSuccess("No changes to save.");
			return;
		}
		setSaving(true);
		setError(null);
		setSuccess(null);
		try {
			const res = await fetch("/api/profile/me", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const json = await res.json();
			if (!res.ok || !json.success) throw new Error(json.message || "Save failed");
			setSuccess("Changes saved.");
		} catch (e: any) {
			setError(e.message || "Save error");
		} finally {
			setSaving(false);
		}
	};

	// Password change placeholder (replace with real endpoint)
	const onChangePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPwErr(null);
		setPwMsg(null);
		const { name, value } = e.target;
		setPwForm((f) => ({ ...f, [name]: value }));
	};

	const onSubmitPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setPwErr(null);
		setPwMsg(null);
		if (!pwForm.current || !pwForm.next || !pwForm.confirm) {
			setPwErr("All password fields required.");
			return;
		}
		if (pwForm.next !== pwForm.confirm) {
			setPwErr("Passwords do not match.");
			return;
		}
		setPwSaving(true);
		try {
			// Call your password API here
			await new Promise((r) => setTimeout(r, 600));
			setPwMsg("Password updated (placeholder).");
			setPwForm({ current: "", next: "", confirm: "" });
		} catch {
			setPwErr("Password change failed.");
		} finally {
			setPwSaving(false);
		}
	};

	return (
		<div className="w-[832px] mx-auto">
			{/* Banner + avatar */}
			<div className="relative w-full h-[256px] bg-profile-bg bg-cover bg-center rounded-lg my-8">
				<Image
					src={resolved?.banner || "/images/profile.png"}
					alt="Profile Background"
					fill
					className="rounded-lg object-cover"
				/>
				{/* Avatar + identity (overhang below banner) */}
				<div className="absolute -bottom-20 left-6 flex items-center gap-4">
					<Image
						src={resolved?.avatar || "/images/photo.png"}
						alt="Profile Photo"
						width={128}
						height={128}
						className="rounded-full border-4 border-white shadow-lg object-cover"
					/>
					<div className="flex flex-col mt-6">
						<p className="text-lg font-semibold">{resolved?.full_name || "—"}</p>
						<p className="text-sm">{resolved?.email || "—"}</p>
					</div>
				</div>
			</div>

			{/* Increase top margin to clear the overhanging avatar (20 = bottom offset) */}
			<div className="bg-white rounded-lg shadow-md p-6 mt-32">
				{/* Personal Information */}
				<h2 className="text-xl font-semibold mb-6">Personal Information</h2>

				<form onSubmit={onSubmitProfile} id="profile-form" className="flex flex-col gap-6">
					{error && <div className="text-sm text-red-600">{error}</div>}
					{success && <div className="text-sm text-green-600">{success}</div>}

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium text-gray-700">Full Name</label>
						<input
							name="full_name"
							type="text"
							placeholder="Enter your full name"
							value={form.full_name}
							onChange={onChangeProfile}
							disabled={saving || !resolved}
							className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium text-gray-700">Email</label>
						<input
							name="email"
							type="email"
							placeholder="Enter your email"
							value={form.email}
							disabled
							className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium text-gray-700">Role</label>
						<input
							name="role"
							type="text"
							placeholder="Enter your role"
							value={form.role}
							onChange={onChangeProfile}
							disabled={saving || !resolved}
							className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
						/>
					</div>

					<div className="w-full h-[62px] bg-[#F9FAFB] px-6 py-3 flex justify-end items-center rounded-md">
						<button
							type="submit"
							disabled={saving || !resolved}
							className="bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[6px] text-sm font-medium shadow-sm hover:bg-indigo-700 transition disabled:opacity-60"
						>
							{saving ? "Saving..." : "Save Change"}
						</button>
					</div>
				</form>

				{/* Change Password */}
				<h3 className="text-xl font-semibold mt-10 mb-6">Change Password</h3>
				<form onSubmit={onSubmitPassword} className="flex flex-col gap-6">
					{pwErr && <div className="text-sm text-red-600">{pwErr}</div>}
					{pwMsg && <div className="text-sm text-green-600">{pwMsg}</div>}

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium text-gray-700">Current Password</label>
						<input
							name="current"
							type="password"
							placeholder="Enter current password"
							value={pwForm.current}
							onChange={onChangePasswordField}
							className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium text-gray-700">New Password</label>
						<input
							name="next"
							type="password"
							placeholder="Enter new password"
							value={pwForm.next}
							onChange={onChangePasswordField}
							className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium text-gray-700">Confirm New Password</label>
						<input
							name="confirm"
							type="password"
							placeholder="Confirm new password"
							value={pwForm.confirm}
							onChange={onChangePasswordField}
							className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="w-full h-[62px] bg-[#F9FAFB] px-6 py-3 flex justify-end items-center rounded-md">
						<button
							type="submit"
							disabled={pwSaving}
							className="h-[50px] bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[6px] text-sm font-medium shadow-sm hover:bg-indigo-700 transition disabled:opacity-60"
						>
							{pwSaving ? "Updating..." : "Change Password"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
