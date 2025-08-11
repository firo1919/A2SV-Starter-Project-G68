import EditUserClientWrapper from "@/app/components/admin/UpdateUsers/EditUserClientWrapper";
import { getUsersData } from "@/utils/adminUtils";

const UpdateUserPage = async () => {
	const res = await getUsersData();
	const users = res?.data.users;
	return (
		<div>
			<EditUserClientWrapper users={users} />
		</div>
	);
};

export default UpdateUserPage;
