import ForgotPassword from "@/app/components/ForgotPassword";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function ForgotPassPage() {
	const session = await auth();
	if (session?.user) {
		redirect(`/${session.user.role}/dashboard`);
	}
	return (
		<div className="flex items-center justify-center min-h-[calc(80vh)] m-6 text-river-bed">
			<ForgotPassword />
		</div>
	);
}
export default ForgotPassPage;
