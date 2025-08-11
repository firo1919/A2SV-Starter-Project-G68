import { getProfileData } from "@/utils/applicantUtils";
import ApplicantLayoutClient from "@/app/components/applicant/ApplicantLayoutClient";

export default async function ApplicantLayout({ children }: { children: React.ReactNode }) {
	// Fetch profile data on the server, same as dashboard
	const profileResponse = await getProfileData();
	const profileData = profileResponse?.success ? profileResponse.data : null;
	const userName = profileData?.full_name || "Applicant";

	return <ApplicantLayoutClient userName={userName}>{children}</ApplicantLayoutClient>;
}
