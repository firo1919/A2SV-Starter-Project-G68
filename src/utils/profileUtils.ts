import { auth } from "@/auth";

const baseUrl = process.env.API_BASE;
interface ProfileResponse {
	success: boolean;
	data: {
		id: string;
		full_name: string;
		email: string;
		role: string;
		profile_picture_url: string;
	};
	message: string;
}
export async function getProfileData() {
	const session = await auth();
	try {
		if (!session?.user.accessToken) {
			throw "User not authenticated";
		}
		const response = await fetch(`${baseUrl}/profile/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		});
		const data: ProfileResponse = await response.json();
		return data;
	} catch (error) {
		console.log("Error occured during fetching profile", error);
	}
}
