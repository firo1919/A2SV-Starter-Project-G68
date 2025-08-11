import { getData } from "@/utils/adminUtils";
import AdminCyclesClient from "@/app/components/admin/Cycles/ClientAdminCycles";

const Page = async () => {
	const res = await getData();
	const cycles = res?.data?.cycles ?? [];
	const total = res?.data.total_count;

	return (
		<div>
			<AdminCyclesClient initialCycles={cycles} total_count={total} />
		</div>
	);
};

export default Page;
