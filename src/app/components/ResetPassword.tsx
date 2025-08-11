"use client";
import { useResetPasswordMutation } from "@/lib/redux/api/usersApiSlice";
import { ResetUserPass } from "@/lib/redux/types/users";
import { ResetPass, ResetPassSchema } from "@/lib/zod/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";

interface Props {
	token: string;
}
function ResetPassword({ token }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ResetPass>({ resolver: zodResolver(ResetPassSchema) });
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const router = useRouter();
	async function onSubmit(data: ResetPass) {
		console.log(data);
		const requestData: ResetUserPass = {
			token: token,
			new_password: data.password,
		};
		try {
			const response = await resetPassword(requestData);
			if (!response.data?.success) {
				throw response.data?.message;
			}
			toast("Successfull", { draggable: false, theme: "colored", hideProgressBar: true, type: "success" });
			router.push("/login");
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
				<h2 className="text-ebony font-extrabold text-2xl text-center mb-2">Set a new password</h2>
				<div className="flex gap-2">
					<p>Please choose a strong, new password for your account.</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
				<div className="">
					<label htmlFor="password">Password</label>
					<input
						className="w-full h-10 bg-white px-[13px] rounded-sm focus:outline-none focus:border-2 focus:border-royal-blue"
						id="password"
						type="password"
						placeholder="New password"
						{...register("password")}
					/>
					{errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
				</div>
				<div className="">
					<label htmlFor="confirm">Confirm Password</label>
					<input
						className="w-full h-10 bg-white px-[13px] rounded-sm focus:outline-none focus:border-2 focus:border-royal-blue"
						id="confirm"
						type="password"
						placeholder="Confirm new password"
						{...register("confirmPassword")}
					/>
					{errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
				</div>

				<button
					type="submit"
					className="w-full cursor-pointer rounded-md bg-cornflower-blue text-white px-[17px] py-[9px] hover:bg-governor-bay"
				>
					Update password
				</button>
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
export default ResetPassword;
