import LoginForm from "@/app/components/LoginForm";

async function LoginPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
	const error = (await searchParams).error;
	return (
		<div className="my-10 mx-3 h-full flex items-center justify-center">
			<LoginForm error={error} />
		</div>
	);
}
export default LoginPage;
