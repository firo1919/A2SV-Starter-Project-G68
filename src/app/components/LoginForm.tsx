"use client";
import { UserLogin, UserLoginSchema } from "@/lib/zod/UserLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";

interface Props {
	error: string;
}
function LoginForm({ error }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserLogin>({ resolver: zodResolver(UserLoginSchema) });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (error) {
			toast("Login failed, Invalid credentials", {
				draggable: false,
				theme: "colored",
				hideProgressBar: true,
				type: "error",
			});
			console.log("Invalid credentials", error);
		}
	}, [error]);

	async function onSubmit(data: UserLogin) {
		setIsLoading(true);
		const user = {
			email: data.email,
			password: data.password,
			redirectTo: "/",
		};

		try {
			await signIn("credentials", user);
		} catch (error) {
			toast("Login failed", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
			console.log(error);
		}
		setIsLoading(false);
		reset();
	}
	return (
		<div className="relative flex flex-col items-center gap-7 text-ebony">
			<Image
				className="w-20 md:w-32 h-auto"
				src="/images/a2sv-logo2.png"
				alt="A2SV logo image"
				width={128}
				height={32}
			/>
			<div className="">
				<h2 className="text-ebony font-extrabold text-2xl text-center mb-2">Sign in to your account</h2>
				<div className="flex gap-2">
					<Link className="text-royal-blue text-sm font-medium" href="/">
						Back to Home
					</Link>
					<div className="w-[1px] bg-river-bed"></div>
					<Link className="text-royal-blue text-sm font-medium" href="/register-user">
						Create a new applicant account
					</Link>
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
				<div className="flex justify-between">
					<div className="flex gap-2">
						<input id="checkbox" type="checkbox" name="remember" />
						<label className="font-normal text-sm" htmlFor="checkbox">
							Remember me
						</label>
					</div>
					<Link className="text-royal-blue text-sm font-normal" href="/forgot-password">
						Forgot your password?
					</Link>
				</div>
				<button
					type="submit"
					className="w-full cursor-pointer rounded-md bg-cornflower-blue text-white px-[17px] py-[9px] hover:bg-governor-bay"
				>
					Sign in
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
export default LoginForm;
