import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
	const session = await auth();
	if (session?.user) {
		redirect(`/${session.user.role}/dashboard`);
	} else {
		redirect("/home");
	}
};
export default page;
