import { getApplicantData } from "@/utils/applicantUtils";
import ProgressClient from "@/app/components/applicant/ProgressClient";

const Page = async () => {
	const data = await getApplicantData();
	const applicationStatus = data?.applicationStatus ?? null;
	const profileData = data?.profile ?? null;

	return <ProgressClient initialApplicationStatus={applicationStatus} initialProfileData={profileData} />;
};

export default Page;
