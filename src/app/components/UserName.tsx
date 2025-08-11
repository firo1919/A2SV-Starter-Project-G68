import { getProfileData } from "@/utils/profileUtils";

async function UserName() {
	const user = await getProfileData();
	return <p className="text-sm font-semibold text-gray-600">{user.data.full_name}</p>;
}
export default UserName;
