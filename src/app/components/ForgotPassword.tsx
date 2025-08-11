"use client";
import { useForgotPasswordMutation } from "@/lib/redux/api/usersApiSlice";
import { ForgotUserPass } from "@/lib/redux/types/users";
import { ForgotPass, ForgotPassSchema } from "@/lib/zod/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";

function ForgotPassword() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ForgotPass>({ resolver: zodResolver(ForgotPassSchema) });
	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

	async function onSubmit(data: ForgotPass) {
		console.log(data);
		const baseUrl = window.location.origin;
		const requestData: ForgotUserPass = {
			email: data.email,
			callback_url: `${baseUrl}/reset-password`,
		};
		try {
			const response = await forgotPassword(requestData);
			if (!response.data?.success) {
				throw response.data?.message;
			}
			toast("Successfull", { draggable: false, theme: "colored", hideProgressBar: true, type: "success" });
		} catch (error) {
			toast("Failed", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
			console.log(error);
		}
		reset();
	}
	return (
		<div className="relative flex flex-col items-center gap-6 text-ebony">
			<Image
				className="w-26 md:w-32 h-auto"
				src="/images/a2sv-logo2.png"
				alt="A2SV logo image"
				width={128}
				height={32}
			/>
			<div className="">
				<h2 className="text-ebony font-extrabold text-2xl text-center mb-2">Forgot your password?</h2>
				<div className="flex gap-2">
					<p>Enter your email and we&apos;ll send you a link to get back into your account.</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
				<div className="">
					<label htmlFor="email">Email</label>
					<input
						className="w-full h-10 bg-white px-[13px] rounded-sm focus:outline-none focus:border-2 focus:border-royal-blue"
						id="email"
						type="text"
						placeholder="user@example.com"
						{...register("email")}
					/>
					{errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
				</div>

				<button
					type="submit"
					className="w-full cursor-pointer rounded-md bg-cornflower-blue text-white px-[17px] py-[9px] hover:bg-governor-bay"
				>
					Send reset link
				</button>
				<Link className="text-royal-blue text-sm font-medium w-full text-center" href="/login">
					Back to login
				</Link>
			</form>
			{isLoading && (
				<div className="absolute top-0 w-full h-full bg-athens-gray opacity-50 flex items-center justify-center">
					<ImSpinner className="text-7xl animate-spin" />
				</div>
			)}
			<ToastContainer />
		</div>
	);
}
export default ForgotPassword;
