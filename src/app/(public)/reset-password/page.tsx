import ResetPassword from "@/app/components/ResetPassword";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function ResetPassPage({ searchParams }: { searchParams: Promise<{ token: string }> }) {
	const token = (await searchParams).token;
	if (!token) {
		redirect(`/login`);
	}
	const session = await auth();
	if (session?.user) {
		redirect(`/${session.user.role}/dashboard`);
	}
	return (
		<div className="flex items-center justify-center min-h-[calc(80vh)] m-6 text-river-bed">
			<ResetPassword token={token} />
		</div>
	);
}
export default ResetPassPage;
