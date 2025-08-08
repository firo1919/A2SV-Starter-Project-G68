"use client";
import { useRegisterUserMutation } from "@/lib/redux/api/usersApiSlice";
import { UserRegister, UserRegisterSchema } from "@/lib/zod/UserRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";

function RegisterUserForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserRegister>({ resolver: zodResolver(UserRegisterSchema) });
	const [registerUser, { isLoading }] = useRegisterUserMutation();
	const router = useRouter();
	async function onSubmit(data: UserRegister) {
		const user = {
			full_name: data.fullname,
			email: data.email,
			password: data.password,
		};

		try {
			const response = await registerUser(user);
			if (!response.data || !response.data.success) {
				throw response.error;
			}
			router.replace("/login");
		} catch (error) {
			toast("Registration failed", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
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
				<h2 className="text-ebony font-extrabold text-2xl text-center mb-2">Create a new applicant account</h2>
				<div className="w-full flex justify-center ">
					<Link className="text-royal-blue text-sm font-medium" href="/login">
						sign in to your existing account
					</Link>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
				<div className="">
					<label htmlFor="fullname">Full Name</label>
					<input
						className="w-full h-10 bg-white px-[13px] rounded-sm focus:outline-none focus:border-2 focus:border-royal-blue"
						id="fullname"
						type="text"
						placeholder="john doe"
						{...register("fullname")}
					/>
					{errors.fullname && <p className="text-red-600 text-sm">{errors.fullname.message}</p>}
				</div>
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
				<div className="">
					<label htmlFor="password">Password</label>
					<input
						className="w-full h-10 bg-white px-[13px] rounded-sm focus:outline-none focus:border-2 focus:border-royal-blue"
						id="password"
						type="password"
						placeholder="password"
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
						placeholder="password"
						{...register("confirmPassword")}
					/>
					{errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
				</div>

				<button
					type="submit"
					className="w-full cursor-pointer rounded-md bg-cornflower-blue text-white px-[17px] py-[9px] hover:bg-governor-bay"
				>
					Create Account
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
export default RegisterUserForm;
