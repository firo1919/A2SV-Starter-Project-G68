"use client";
import { useApplicantProfile } from "./ProfileContext";
import { useEffect, useMemo, useState } from "react";

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

export default function YourProfileForm() {
	const raw = useApplicantProfile() as RawProfile | null;

	const resolved = useMemo(() => {
		if (!raw) return null;
		return {
			full_name: (raw.full_name || raw.fullName || "").trim(),
			email: (raw.email || "").trim(),
			role: (raw.role || "").trim(),
		};
	}, [raw?.full_name, raw?.fullName, raw?.email, raw?.role]);

	const [form, setForm] = useState({ full_name: "", email: "", role: "" });
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	useEffect(() => {
		if (resolved) setForm(resolved);
	}, [resolved?.full_name, resolved?.email, resolved?.role]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	// Password form (placeholder)
	const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
	const [pwSaving, setPwSaving] = useState(false);
	const [pwErr, setPwErr] = useState<string | null>(null);
	const [pwMsg, setPwMsg] = useState<string | null>(null);

	const onPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPwErr(null);
		setPwMsg(null);
		const { name, value } = e.target;
		setPw((p) => ({ ...p, [name]: value }));
	};

	const onSubmitPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!pw.current || !pw.next || !pw.confirm) {
			setPwErr("All fields required.");
			return;
		}
		if (pw.next !== pw.confirm) {
			setPwErr("Passwords do not match.");
			return;
		}
		setPwSaving(true);
		try {
			await new Promise((r) => setTimeout(r, 600));
			setPwMsg("Password updated (placeholder).");
			setPw({ current: "", next: "", confirm: "" });
		} catch {
			setPwErr("Password change failed.");
		} finally {
			setPwSaving(false);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2 className="text-xl font-semibold mb-6">Personal Information</h2>

			<form onSubmit={onSubmitProfile} id="profile-form" className="flex flex-col gap-6">
				{error && <div className="text-sm text-red-600">{error}</div>}
				{success && <div className="text-sm text-green-600">{success}</div>}

				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium text-gray-700">Full Name</label>
					<input
						name="full_name"
						value={form.full_name}
						onChange={onChange}
						disabled={saving || !resolved}
						placeholder="Enter your full name"
						className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium text-gray-700">Email</label>
					<input
						name="email"
						value={form.email}
						disabled
						className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium text-gray-700">Role</label>
					<input
						name="role"
						value={form.role}
						onChange={onChange}
						disabled={saving || !resolved}
						placeholder="Enter your role"
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

			<h3 className="text-xl font-semibold mt-10 mb-6">Change Password</h3>
			<form onSubmit={onSubmitPassword} className="flex flex-col gap-6">
				{pwErr && <div className="text-sm text-red-600">{pwErr}</div>}
				{pwMsg && <div className="text-sm text-green-600">{pwMsg}</div>}

				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium text-gray-700">Current Password</label>
					<input
						name="current"
						type="password"
						value={pw.current}
						onChange={onPwChange}
						placeholder="Enter current password"
						className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium text-gray-700">New Password</label>
					<input
						name="next"
						type="password"
						value={pw.next}
						onChange={onPwChange}
						placeholder="Enter new password"
						className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium text-gray-700">Confirm New Password</label>
					<input
						name="confirm"
						type="password"
						value={pw.confirm}
						onChange={onPwChange}
						placeholder="Confirm new password"
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
	);
}
