import { getApplicantData } from "@/utils/applicantUtils";
import DashboardClient from "@/app/components/applicant/DashboardClient";

const Page = async () => {
	const data = await getApplicantData();
	const applicationStatus = data?.applicationStatus ?? null;
	const profileData = data?.profile ?? null;

	return <DashboardClient initialApplicationStatus={applicationStatus} initialProfileData={profileData} />;
};

export default Page;
