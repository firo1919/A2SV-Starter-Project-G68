import RegisterUserForm from "@/app/components/RegisterUserForm";

async function RegistrationPage() {
	return (
		<div className="flex items-center justify-center min-h-[calc(80vh)] m-6">
			<RegisterUserForm />
		</div>
	);
}
export default RegistrationPage;
