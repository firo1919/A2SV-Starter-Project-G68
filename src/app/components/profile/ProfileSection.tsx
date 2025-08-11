"use client";
import { ReactNode } from "react";
export default function ProfileSection({
	title,
	actions,
	children,
}: {
	title: string;
	actions?: ReactNode;
	children: ReactNode;
}) {
	return (
		<section className="bg-white rounded-lg shadow-md p-6">
			{" "}
			<div className="flex justify-between items-start mb-6">
				{" "}
				<h2 className="text-base font-semibold text-gray-900">{title}</h2> {actions && <div>{actions}</div>}{" "}
			</div>{" "}
			<div className="space-y-5">{children}</div>{" "}
		</section>
	);
}
