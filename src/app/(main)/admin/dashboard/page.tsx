import BlueDashboardCard from "@/app/components/admin/Dashboard/BlueDashboardCard";
import DashboardManagerCard from "@/app/components/admin/Dashboard/DashboardCard";
import DashboardCyclesCard from "@/app/components/admin/Dashboard/DashboardCyclesCard";
import DashboardRecentActivityCard from "@/app/components/admin/Dashboard/DashboardRecentActivityCard";
import DashboardAnalysisCard from "@/app/components/admin/Dashboard/DashboardViewCard";
import GreenDashboardCard from "@/app/components/admin/Dashboard/GreenDashboardCard";
import OrangeDashboardCard from "@/app/components/admin/Dashboard/OrangeDashboardCard";
import { getActiveCyclesData, getAnalysisData, getUsersData } from "@/utils/adminUtils";

const DashboardPage = async () => {
	const res = await getAnalysisData();
	const userRes = await getUsersData();
	const activeCycles = await getActiveCyclesData();
	const activeCyclesTotal = activeCycles?.data.total_count;
	const usersTotal = userRes?.data.total_count;
	const analysis = res?.data;
	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-col gap-4 md:gap-8 my-8 w-full items-center p-3 md:p-6">
				<div className="flex flex-col w-9/10 md:w-[1280px] justify-start">
					<h1 className="font-bold text-[#111827] text-[30px]">Admin Command Center</h1>
				</div>
				<div className="grid grid-cols-3 md:grid-cols-3 gap-4 w-9/10 md:w-[1280px]">
					<BlueDashboardCard count={usersTotal} />
					<GreenDashboardCard count={analysis?.total_applicants} />
					<OrangeDashboardCard count={activeCyclesTotal} />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 w-9/10 md:w-[1280px] gap-6 justify-self-center">
					<DashboardManagerCard />
					<DashboardCyclesCard />
					<DashboardRecentActivityCard title={""} content={""} />
				</div>
				<DashboardAnalysisCard />
			</div>
		</div>
	);
};

export default DashboardPage;
