import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

async function SuccessfullPassResetPage() {
	const session = await auth();
	if (session?.user) {
		redirect(`/${session.user.role}/dashboard`);
	}
	return (
		<div className="flex items-center justify-center min-h-[calc(80vh)] m-6 text-river-bed">
			<div className="relative flex flex-col items-center gap-6 text-ebony">
				<IoIosCheckmarkCircleOutline className="text-green-400 h-9 w-9" />
				<div className="">
					<h2 className="text-ebony font-extrabold text-2xl text-center mb-2">Action Successful!</h2>
					<p>Your password has been reset. You can now log in with your new password.</p>
				</div>

				<Link
					href="/login"
					className="w-full text-center cursor-pointer rounded-md bg-cornflower-blue text-white px-[17px] py-[9px] hover:bg-governor-bay"
				>
					Go to Login
				</Link>
			</div>
		</div>
	);
}
export default SuccessfullPassResetPage;
