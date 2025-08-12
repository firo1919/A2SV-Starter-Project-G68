import AdminCyclesClient from "@/app/components/admin/Cycles/ClientAdminCycles";
import { getData } from "@/utils/adminUtils";

const Page = async () => {
	const res = await getData();
	const cycles = res?.data?.cycles ?? [];
	const total = res?.data.total_count || null;

	return (
		<div>
			<AdminCyclesClient initialCycles={cycles} total_count={total} />
		</div>
	);
};

export default Page;
