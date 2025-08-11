import ClientUsersPage from "@/app/components/admin/Users/ClientUsersPage";
import { getUsersData } from "@/utils/adminUtils";

const UsersPage = async () => {
	const res = await getUsersData();
	const users = res?.data?.users ?? [];
	const total = res?.data?.total_count || null;
	console.log(users);
	return (
		<div>
			<ClientUsersPage initialUsers={users} total_count={total} />
		</div>
	);
};

export default UsersPage;
