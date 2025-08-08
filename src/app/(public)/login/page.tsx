import LoginForm from "@/app/components/LoginForm";

async function LoginPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
	const error = (await searchParams).error;
	return (
		<div className="flex items-center justify-center min-h-[calc(80vh)] m-6">
			<LoginForm error={error} />
		</div>
	);
}
export default LoginPage;
