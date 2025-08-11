import CreateCycleForm from "@/app/components/admin/CreateCycle/CreateCycleForm";

const CreateCyclesPage = () => {
	return (
		<div>
			<div className="flex flex-col items-center">
				<div className="w-9/10 md:w-[1216px] p-4 flex flex-col items-start">
					<h1 className="font-bold text-[25px] md:text-[30px]">Create new cylce</h1>
					<p className="font-normal text-[#4B5563]">
						Use this form to create a new cycle and assign periods.
					</p>
				</div>
				<div className="w-9/10 md:w-[1216px] p-4">
					<CreateCycleForm />
				</div>
			</div>
		</div>
	);
};

export default CreateCyclesPage;
