"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	useEffect(() => {
<<<<<<< HEAD
		router.push("/applicant/dashboard");
	}, [router]);

	return null;
=======
		// Redirect to dashboard
		router.push("/applicant/dashboard");
	}, [router]);

	return null; // This page will redirect, so no content needed
>>>>>>> origin/feat/applicant-form
}
