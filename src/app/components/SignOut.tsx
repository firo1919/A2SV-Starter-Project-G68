"use client";
import { signOut } from "next-auth/react";

function SignOut() {
	return (
		<button
			onClick={() => signOut()}
			className="bg-royal-blue cursor-pointer hover:bg-governor-bay text-white font-medium px-[17px] py-[9px] rounded-md"
		>
			Sign out
		</button>
	);
}
export default SignOut;
