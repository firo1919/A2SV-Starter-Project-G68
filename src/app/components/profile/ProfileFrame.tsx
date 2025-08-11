"use client";
import { ReactNode } from "react";
import ProfileHeader from "./ProfileHeader";

export default function ProfileFrame({ children }: { children: ReactNode }) {
	return (
		<div className="w-[832px] mx-auto relative">
			{" "}
			<ProfileHeader />{" "}
			<div className="mt-24">{children}</div>{" "}
		</div>
	);
}
