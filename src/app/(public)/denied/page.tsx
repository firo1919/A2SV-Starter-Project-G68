import Link from "next/link";

function AccessDeniedPage() {
	return (
		<div className="flex items-center justify-center min-h-[calc(80vh)]">
			<div className="flex flex-col items-center gap-2">
				<h1 className="text-royal-blue font-extrabold text-6xl md:text-9xl">403</h1>
				<h2 className="text-ebony-clay font-bold text-2xl md:text-4xl">Access Denied</h2>
				<p className="text-md md:text-lg text-center">Sorry, you cannot access this page.</p>
				<Link
					href="/"
					className="bg-royal-blue cursor-pointer hover:bg-governor-bay text-white font-medium px-[17px] py-[9px] rounded-md"
				>
					Go Home
				</Link>
			</div>
		</div>
	);
}
export default AccessDeniedPage;
