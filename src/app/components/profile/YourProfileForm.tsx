"use client";
import { useApplicantProfile } from "@/app/components/profile/ProfileContext";
import { useEffect, useState, useRef } from "react";
import { z } from "zod";

interface FormState {
	full_name: string;
	email: string;
}

export default function YourProfileForm() {
	const profile = useApplicantProfile();
	const [form, setForm] = useState<FormState>({ full_name: "", email: "" });
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
	const [pwErr, setPwErr] = useState<string | null>(null);
	const [pwMsg, setPwMsg] = useState<string | null>(null);
	const [pwSaving, setPwSaving] = useState(false);
	const [initialized, setInitialized] = useState(false);

	const ProfileUpdateSchema = z.object({
		full_name: z.string().trim().min(2, "Full name must be at least 2 characters"),
		email: z.string().trim().email("Invalid email address"),
	});

	const PasswordChangeSchema = z
		.object({
			current: z.string().min(1, "Current password is required"),
			next: z.string().min(8, "New password must be at least 8 characters"),
			confirm: z.string().min(1, "Confirm password is required"),
		})
		.superRefine((vals, ctx) => {
			if (vals.next === vals.current) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "New password must be different",
					path: ["next"],
				});
			}
			if (vals.next !== vals.confirm) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Passwords do not match",
					path: ["confirm"],
				});
			}
		});

	useEffect(() => {
		if (profile && !initialized) {
			setForm({
				full_name: profile.full_name ?? "",
				email: profile.email ?? "",
			});
			orig.current = {
				full_name: profile.full_name ?? "",
				email: profile.email ?? "",
			};
			setInitialized(true);
		}
	}, [profile, initialized]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((s) => ({ ...s, [name]: value }));
	};

	const orig = useRef<{ full_name: string; email: string }>({ full_name: "", email: "" });
	useEffect(() => {
		if (profile) {
			orig.current = {
				full_name: profile.full_name || "",
				email: profile.email || "",
			};
		}
	}, [profile?.full_name, profile?.email]);

	const dirty = form.full_name.trim() !== orig.current.full_name || form.email.trim() !== orig.current.email;

	async function onSubmitProfile(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (!profile) {
			setError("Profile not loaded");
			return;
		}

		const parsed = ProfileUpdateSchema.safeParse({
			full_name: form.full_name,
			email: form.email,
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0].message);
			return;
		}

		const nothingChanged =
			parsed.data.full_name.trim() === orig.current.full_name && parsed.data.email.trim() === orig.current.email;

		if (nothingChanged) {
			setSuccess("No changes to save");
			return;
		}

		const fd = new FormData();
		if (parsed.data.full_name.trim() !== orig.current.full_name) fd.set("full_name", parsed.data.full_name.trim());
		if (parsed.data.email.trim() !== orig.current.email) fd.set("email", parsed.data.email.trim());

		if ([...fd.keys()].length === 0) {
			setSuccess("No changes to save");
			return;
		}

		setSaving(true);
		try {
			const res = await fetch("/api/profile", { method: "PUT", body: fd });
			const ct = res.headers.get("content-type") || "";
			const json = ct.includes("application/json") ? await res.json().catch(() => ({})) : {};
			if (!res.ok || json.success === false) throw new Error(json.message || `Update failed (${res.status})`);
			setSuccess("Profile updated successfully");
			orig.current = {
				full_name: parsed.data.full_name.trim(),
				email: parsed.data.email.trim(),
			};
		} catch (err: any) {
			setError(err.message || "Update failed");
		} finally {
			setSaving(false);
		}
	}

	const onPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPw((s) => ({ ...s, [name]: value }));
	};

	async function onSubmitPassword(e: React.FormEvent) {
		e.preventDefault();
		setPwErr(null);
		setPwMsg(null);

		const parsed = PasswordChangeSchema.safeParse(pw);
		if (!parsed.success) {
			setPwErr(parsed.error.issues[0].message);
			return;
		}

		setPwSaving(true);
		try {
			const res = await fetch("/api/profile/me/change-password", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					old_password: parsed.data.current,
					new_password: parsed.data.next,
				}),
			});
			const ct = res.headers.get("content-type") || "";
			const json = ct.includes("application/json") ? await res.json().catch(() => ({})) : {};
			if (!res.ok || json.success === false) {
				throw new Error(json.message || `Password update failed (${res.status})`);
			}
			setPwMsg("Password updated successfully");
			setPw({ current: "", next: "", confirm: "" });
		} catch (err: any) {
			setPwErr(err.message || "Password update failed");
		} finally {
			setPwSaving(false);
		}
	}

	useEffect(() => {
		if (success) {
			const t = setTimeout(() => setSuccess(null), 4000);
			return () => clearTimeout(t);
		}
	}, [success]);

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<form onSubmit={onSubmitProfile} className="flex flex-col gap-6">
				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium text-gray-700">Full Name</label>
					<input
						name="full_name"
						value={form.full_name ?? ""}
						onChange={onChange}
						disabled={saving}
						placeholder="Enter your full name"
						className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium text-gray-700">Email</label>
					<input
						name="email"
						value={form.email ?? ""}
						onChange={onChange}
						disabled={saving}
						placeholder="Enter your email"
						className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
					/>
				</div>

				<div className="w-full h-[62px] bg-[#F9FAFB] px-6 py-3 flex justify-end items-center rounded-md">
					<div className="flex items-center gap-4">
						{success && !dirty && !saving && (
							<span
								className="flex items-center gap-1 text-green-600 text-sm font-medium"
								aria-live="polite"
							>
								<svg
									className="w-4 h-4"
									viewBox="0 0 20 20"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M16 6L8.5 13.5L5 10" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								Saved
							</span>
						)}
						<button
							type="submit"
							disabled={saving || !dirty}
							className={`bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[6px] text-sm font-medium shadow-sm transition ${
								saving || !dirty ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700"
							}`}
						>
							{saving ? "Saving..." : dirty ? "Save Changes" : success ? "Saved" : "No Changes"}
						</button>
					</div>
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
						disabled={pwSaving}
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
						disabled={pwSaving}
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
						disabled={pwSaving}
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
